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
import {Settings} from "./settings/Settings";
import {VsCode} from "@/types/VSCodeApi";

declare const vscode: VsCode;

export default defineComponent({
   name: 'App',
   components: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      VJsonRenderer,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      VFormBuilder
   },
   setup() {
      const schema = ref(
      {
         "key": "MyStartForm", "type": "object", "allOf": [{
            "key": "sectionKey1",
            "title": "First Section",
            "type": "object",
            "x-options": {"sectionsTitlesClasses": ["d-none"]},
            "allOf": [{
               "key": "group1",
               "title": "First Group",
               "type": "object",
               "x-options": {"childrenClass": "pl-0"},
               "properties": {
                  "stringProp1": {
                     "fieldType": "text",
                     "title": "I am a text",
                     "type": "string",
                     "x-options": {"fieldColProps": {"cols": 12, "sm": 6}},
                     "x-props": {"outlined": true, "dense": true}
                  },
                  "numberProp1": {
                     "fieldType": "integer",
                     "type": "integer",
                     "title": "I am a number",
                     "x-options": {"fieldColProps": {"cols": 12, "sm": 6}},
                     "x-props": {"outlined": true, "dense": true}
                  },
                  "textarea1": {
                     "fieldType": "textarea",
                     "type": "string",
                     "x-display": "textarea",
                     "title": "I am a textarea",
                     "x-props": {"outlined": true, "dense": true}
                  },
                  "booleanprop": {
                     "fieldType": "boolean",
                     "type": "boolean",
                     "title": "I am a checkbox",
                     "x-props": {"outlined": true, "dense": true}
                  },
                  "dateprop": {
                     "fieldType": "date",
                     "type": "string",
                     "format": "date",
                     "title": "I am a date",
                     "x-props": {"outlined": true, "dense": true}
                  }
               }
            }]
         }]
      });
      const currentSchema = ref({});
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

      function sendDataToExtension(): void {
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

      function schemaChanged(): void {
         currentSchema.value = schema;
         sendDataToExtension();

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
