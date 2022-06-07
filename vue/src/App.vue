<template>
   <div id="app">
      <text-editor ref="textEditor" :viewType="viewType"></text-editor>
   </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, provide, ref} from "@vue/composition-api";
import {VsCode} from "@/types/VSCodeApi";
import TextEditor from "@/components/TextEditor.vue";

declare const vscode: VsCode;

export default defineComponent({
   name: 'App',
   components: {TextEditor},
   setup() {
      const textEditor = ref<InstanceType<typeof TextEditor>>()
      const viewType = ref('');

      /**
       * Receive and process the content of the message.
       * @param event Message which was sent from the extension.
       */
      function getData(event: MessageEvent): void {
         const message = event.data;
         const text = message.text;

         switch (message.type) {
            case 'initial.updateFromExtension': {
               viewType.value = message.viewType;
               textEditor.value?.updateContent(text);
               break;
            }
            case viewType.value + '.updateFromExtension': {
               textEditor.value?.updateContent(text);
               break;
            }
            case viewType.value + '.undo':
            case viewType.value + '.redo': {
               textEditor.value?.updateContent(text, true);
               break;
            }
            default: break;
         }
      }

      onMounted(() => {
         // Restore the state after the extension get the focus back
         const state = vscode.getState();
         if (state) {
            viewType.value = state.viewType;
            textEditor.value?.updateContent(state.text);
         }

         // Add event listener for receiving messages from the extension
         window.addEventListener('message', getData);
      })

      onUnmounted(() => {
         window.removeEventListener('message', getData);
      })

      // Publish the VSCodeAPI to all components
      provide('vscode', vscode);

      return {
         textEditor,
         viewType
      }
   }
});
</script>

<style>
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: papayawhip;
   margin-top: 20px;
}
</style>
