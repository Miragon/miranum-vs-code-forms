<template>
   <v-app>
      <VFormBuilder :builder-settings="builderSettings" :value="schema" @input="schemaChanged"
                    v-if="mode === 'builder'"></VFormBuilder>
      <div style="background-color: white; padding: 10px" v-if="mode === 'renderer'">
         <VJsonRenderer :options="{}" :schema="schema"></VJsonRenderer>
      </div>
   </v-app>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";
import {VFormBuilder} from "@muenchen/digiwf-form-builder";
import {Form} from "@muenchen/digiwf-form-builder/dist/types/src/types/Form";
import {Settings} from "./settings/Settings";
import {VsCode} from "src/types/VSCodeApi";

declare const vscode: VsCode;
//declare const content: JSON;
//declare const mode: "builder" | "renderer";

export default defineComponent({
   name: 'App',
   components: {
      VJsonRenderer,
      VFormBuilder
   },
   setup() {
      const schema = ref<Form>();
      const builderSettings = Settings;
      const mode = ref('');
      //const builder = ref(false);
      //const renderer = ref(false);

      function getDataFromExtension(event: MessageEvent): void {
         const message = event.data;
         const newSchema: Form = message.text;

         switch (message.type) {
            case 'jsonschema-renderer.updateFromExtension': {
               updateSchema(newSchema);
               break;
            }
            case 'jsonschema-builder.updateFromExtension': {
               updateSchema(newSchema);
               break;
            }
            case 'jsonschema-builder.undo':
            case 'jsonschema-builder.redo': {
               updateSchema(newSchema);
               break;
            }
            default:
               break;
         }
      }

      function sendDataToExtension(schema: Form): void {
         const schemaAsJson: JSON = JSON.parse(JSON.stringify(schema));

         vscode.setState({
            text: JSON.stringify(schemaAsJson),
            mode: mode.value
         });
         vscode.postMessage({
            type: 'jsonschema-builder.updateFromWebview',
            content: schemaAsJson
         });
      }

      function updateSchema(newSchema: Form): void {
         if (!newSchema.key || !newSchema.type || !newSchema.allOf ) {
            console.log(mode.value, 'setMinimum');
            newSchema = JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}');
         }

         vscode.setState({
            text: JSON.stringify(newSchema),
            mode: mode.value
         });

         schema.value = newSchema;
      }

      function schemaChanged(schema: Form): void {
         sendDataToExtension(schema);
      }

      onMounted(() => {
         const state = vscode.getState();
         if (state) {
            schema.value = JSON.parse(state.text);
            mode.value = state.mode;
            //builder.value = state.mode === "builder";
            //renderer.value = state.mode === "renderer";
         }
         /*const newSchema: Form = JSON.parse(content);
         updateSchema(newSchema);*/
         window.addEventListener('message', getDataFromExtension);
      })

      onUnmounted(() => {
         window.removeEventListener('message', getDataFromExtension);
      })

      return {
         schema,
         builderSettings,
         mode,
         //builder,
         //renderer,
         schemaChanged
      }
   }
});
</script>
