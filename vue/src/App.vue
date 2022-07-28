<template>
   <v-app>
      <v-main>
         <v-tabs
             dark
             fixed-tabs
         >
            <v-tab>
               Builder
            </v-tab>
            <v-tab>
               Renderer
            </v-tab>
            <v-tab-item>
               <VFormBuilder :builder-settings="builderSettings" :value="schema" @input="schemaChanged"></VFormBuilder>
            </v-tab-item>
            <v-tab-item>
               <div style="background-color: white; padding: 10px">
                  <VJsonRenderer :options="{}" :schema="schema"></VJsonRenderer>
               </div>
            </v-tab-item>
         </v-tabs>
      </v-main>
   </v-app>
</template>

<script lang="ts">
import {defineComponent, ref, getCurrentInstance, onMounted, onUnmounted} from 'vue';
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";
import {VFormBuilder} from "@muenchen/digiwf-form-builder";
import {Form} from "@muenchen/digiwf-form-builder/dist/types/src/types/Form";
import {Settings} from "./settings/Settings";
import {VsCode} from "@/types/VSCodeApi";

declare const vscode: VsCode;

export default defineComponent({
   name: 'App',
   components: {
      VJsonRenderer,
      VFormBuilder
   },
   setup() {
      const schema = ref<Form>()
      //const currentSchema = ref<any>();
      const builderSettings = Settings;
      const viewType = ref('');

      function getDataFromExtension(event: MessageEvent): void {
         const message = event.data;
         const newSchema = message.text;
         switch (message.type) {
            case 'initial.updateFromExtension': {
               viewType.value = message.viewType;
               updateSchema(newSchema);
               //currentSchema.value = schema.value;
               break;
            }
            case viewType.value + '.updateFromExtension': {
               updateSchema(newSchema);
               break;
            }
            case viewType.value + '.undo':
            case viewType.value + '.redo': {
               updateSchema(newSchema);
               break;
            }
            default: break;
         }
      }

      function sendDataToExtension(schema: any): void {
         vscode.setState({
            viewType: viewType.value,
            text: schema
         });
         vscode.postMessage({
            type: viewType.value + '.updateFromWebview',
            content: schema
         });
      }

      function updateSchema(newSchema: any): void {
         vscode.setState({
            viewType: viewType.value,
            text: newSchema
         });

         schema.value = newSchema;
      }

      function schemaChanged(schema: any): void {
         //currentSchema.value = schema;
         sendDataToExtension(schema);

         const instance = getCurrentInstance();
         instance?.proxy?.$forceUpdate();
      }

      onMounted(() => {
         const state = vscode.getState();
         if (state) {
            viewType.value = state.viewType;
            updateSchema(state.text)
         }

         window.addEventListener('message', getDataFromExtension);
      })

      onUnmounted(() => {
         window.removeEventListener('message', getDataFromExtension);
      })

      return {
         schema,
         //currentSchema,
         builderSettings,
         schemaChanged
      }
   }
});
</script>
