<template>
  <v-app>
    <v-text-field rounded label="form-key" :value="form.key" @change="keyChanged"
                  :rules="nameRules" v-if="mode === 'builder'" required></v-text-field>
    <DwfFormBuilder :builder-settings="builderSettings" :value="form.schema" @input="schemaChanged"
                    v-if="mode === 'builder'"></DwfFormBuilder>
    <div style="background-color: white; padding: 10px" v-if="mode === 'renderer'">
      <DwfFormRenderer :options="{}" :value="{}" :schema="form.schema"></DwfFormRenderer>
    </div>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import {VsCode} from "src/types/VSCodeApi";
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
    //schema is type Form, since that's what DigiWF called their interface
    const form = ref<{key: string, schema: Form}>();
    const builderSettings = SettingsEN;
    const mode = ref('');

    function getDataFromExtension(event: MessageEvent): void {
      const message = event.data;
      const newForm: {key: string, schema: Form} = message.text;

      switch (message.type) {
        case 'jsonschema-renderer.updateFromExtension': {
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

    function sendDataToExtension(form: {key: string, schema: Form}): void {
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

    function updateForm(newForm: {key: string, schema: Form}): void {
      if (!newForm.schema.key || !newForm.schema.type  || !newForm.schema.allOf ) {
        console.log(mode.value, 'setMinimum');
        newForm = JSON.parse('{"key": "form1", "schema": {"key": "MyStartForm", "type": "object", "allOf": []}}');
      }

      vscode.setState({
        text: JSON.stringify(newForm),
        mode: mode.value
      });

      form.value = newForm;
    }

    function schemaChanged(update: Form): void {
      sendDataToExtension({schema: update, key: form.value!.key});
    }
    function keyChanged(update: string): void {
      sendDataToExtension({key: update, schema: form.value!.schema});
    }

    onMounted(() => {
      const state = vscode.getState();
      if (state) {
        form.value = JSON.parse(state.text);
        mode.value = state.mode;
      }
      window.addEventListener('message', getDataFromExtension);
    })

    onUnmounted(() => {
      window.removeEventListener('message', getDataFromExtension);
    })

    //nameRules: v => !!v || 'Required.',
    return {
      form: form,
      builderSettings,
      mode,
      schemaChanged,
      keyChanged
    }
  }
});
</script>
