<template>
   <v-app>
      <VFormBuilder :builder-settings="builderSettings" :value="schema" @input="schemaChanged" v-if="builder"></VFormBuilder>
      <div style="background-color: white; padding: 10px" v-if="renderer">
         <VJsonRenderer :options="{}" :schema="schema"></VJsonRenderer>
      </div>
   </v-app>
</template>

<script lang="ts">
import {defineComponent, ref, getCurrentInstance, onMounted, onUnmounted} from 'vue';
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";
import {VFormBuilder} from "@muenchen/digiwf-form-builder";
import {Form} from "@muenchen/digiwf-form-builder/dist/types/src/types/Form";
import {Settings} from "./settings/Settings";
import {VsCode} from "src/types/VSCodeApi";

declare const vscode: VsCode;

export default defineComponent({
   name: 'App',
   components: {
      VJsonRenderer,
      VFormBuilder
   },
   setup() {
      const schema = ref<Form>();
      const builderSettings = Settings;
      const builder = ref(false);
      const renderer = ref(false);

      function getDataFromExtension(event: MessageEvent): void {
         const message = event.data;
         const newSchema = message.text;

         switch (message.type) {
            case 'jsonschema-renderer.updateFromExtension': {
               renderer.value = true;
               updateSchema(newSchema);
               break;
            }
            case 'jsonschema-builder.updateFromExtension': {
               builder.value = true;
               updateSchema(newSchema);
               break;
            }
            case 'jsonschema-builder.undo':
            case 'jsonschema-builder.redo': {
               updateSchema(newSchema);
               break;
            }
            default: break;
         }
      }

      function sendDataToExtension(schema: any): void {
         vscode.setState({
            text: schema
         });
         vscode.postMessage({
            type: 'jsonschema-builder.updateFromWebview',
            content: schema
         });
      }

      function updateSchema(newSchema: any): void {
         vscode.setState({
            text: newSchema
         });

         schema.value = newSchema;
      }

      function schemaChanged(schema: any): void {
         sendDataToExtension(schema);
         const instance = getCurrentInstance();
         instance?.proxy?.$forceUpdate();
      }

      onMounted(() => {
         const state = vscode.getState();
         if (state) {
            updateSchema(state.text)
         }

         window.addEventListener('message', getDataFromExtension);
      })

      onUnmounted(() => {
         window.removeEventListener('message', getDataFromExtension);
      })

      return {
         schema,
         builderSettings,
         builder,
         renderer,
         schemaChanged
      }
   }
});
</script>
