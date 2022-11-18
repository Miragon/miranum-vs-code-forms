<template>
   <v-app>
      <v-text-field
          label="Form Key"
          class="form-key"
          :value="formKey"
          @change="keyChanged"
          :rules="rules"
          v-if="mode === 'builder'"
          outlined rounded dense hide-details="auto">
      </v-text-field>
      <DwfFormBuilder
          :builder-settings="builderSettings"
          :value="schema"
          @input="schemaChanged"
          v-if="mode === 'builder'">
      </DwfFormBuilder>
      <div style="background-color: white; padding: 10px" v-if="mode === 'renderer'">
         <DwfFormRenderer :options="{}" :value="{}" :schema="schema" :key="componentKey"></DwfFormRenderer>
      </div>
   </v-app>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import {VsCode, Formular} from "./types/types";
import {DwfFormRenderer, Form} from "@muenchen/digiwf-form-renderer";
import {DwfFormBuilder} from "@muenchen/digiwf-form-builder";
import {SettingsEN} from "@muenchen/digiwf-form-builder-settings";

declare const vscode: VsCode;

export default defineComponent({
   name: 'App',
   components: {
      DwfFormRenderer,
      DwfFormBuilder
   },
   setup() {
      const formKey = ref<string>();
      const schema = ref<Form>();
      const builderSettings = SettingsEN;

      const mode = ref('');
      const componentKey = ref(0);

      function getDataFromExtension(event: MessageEvent): void {
         const message = event.data;
         const newForm: Formular = message.text;

         switch (message.type) {
            case 'jsonschema-renderer.updateFromExtension': {
               componentKey.value += 1;  // renders the component again
               updateForm(newForm);
               break;
            }
            case 'jsonschema-builder.updateFromExtension': {
               updateForm(newForm);
               break;
            }
            case 'jsonschema-builder.undo':
            case 'jsonschema-builder.redo': {
               updateForm(newForm);
               break;
            }
            default:
               break;
         }
      }

      function sendDataToExtension(form: Formular): void {
         const formAsJson: JSON = JSON.parse(JSON.stringify(form));

         vscode.setState({
            text: JSON.stringify(formAsJson),
            mode: mode.value
         });
         vscode.postMessage({
            type: 'jsonschema-builder.updateFromWebview',
            content: formAsJson
         });
      }

      function updateForm(newForm: Formular): void {
         vscode.setState({
            text: JSON.stringify(newForm),
            mode: mode.value
         });

         formKey.value = newForm.key;
         schema.value = newForm.schema;
      }

      function schemaChanged(update: Form): void {
         sendDataToExtension({key: formKey.value!, schema: update});
      }

      function keyChanged(update: string): void {
         sendDataToExtension({key: update, schema: schema.value!});
      }

      onMounted(() => {
         const state = vscode.getState();
         if (state) {
            const form: Formular = JSON.parse(state.text);
            formKey.value = form.key;
            schema.value = form.schema;
            mode.value = state.mode;
         }
         window.addEventListener('message', getDataFromExtension);
      })

      onUnmounted(() => {
         window.removeEventListener('message', getDataFromExtension);
      })

      // Vuetify
      const rules = [
         (value: string) => !!value || 'Required.'
      ];

      return {
         formKey,
         schema,
         builderSettings,
         mode,
         componentKey,
         rules,
         schemaChanged,
         keyChanged
      }
   }
});
</script>

<style>
.form-key.theme--light.v-input {
   width: 50% !important;
   flex: 0 0 auto !important;
   padding-top: 20px !important;
   padding-left: 20px !important;
}
.form-key.theme--light.v-input > .v-input__control > .v-input__slot {
   flex-direction: row !important;
   flex-wrap: nowrap !important;
}
</style>