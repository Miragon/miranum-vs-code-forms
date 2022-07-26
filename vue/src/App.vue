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
                  <VJsonRenderer :options="{}" :schema="currentSchema"></VJsonRenderer>
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
      const currentSchema = ref<typeof schema.value>();
      const builderSettings = Settings;
      const viewType = ref('');

      function getDataFromExtension(event: MessageEvent): void {
         const message = event.data;
         const text = message.text;
         switch (message.type) {
            case 'initial.updateFromExtension': {
               viewType.value = message.viewType;
               updateContent(text);
               break;
            }
            case viewType.value + '.updateFromExtension': {
               updateContent(text);
               break;
            }
            case viewType.value + '.undo':
            case viewType.value + '.redo': {
               updateContent(text);
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

      function updateContent(text: any): void {
         vscode.setState({
            viewType: viewType.value,
            text: text
         });

         schema.value = text;
      }

      function schemaChanged(schema: any): void {
         currentSchema.value = schema;
         sendDataToExtension(currentSchema.value);

         const instance = getCurrentInstance();
         instance?.proxy?.$forceUpdate();
      }

      onMounted(() => {
         const state = vscode.getState();
         if (state) {
            viewType.value = state.viewType;
            updateContent(state.text)
         }

         window.addEventListener('message', getDataFromExtension);
      })

      onUnmounted(() => {
         window.removeEventListener('message', getDataFromExtension);
      })

      return {
         schema,
         currentSchema,
         builderSettings,
         schemaChanged
      }
   }
});
</script>
