<template>
  <v-app>
    <DwfFormBuilder :builder-settings="builderSettings" :value="schema" @input="schemaChanged"
                    v-if="mode === 'builder'"></DwfFormBuilder>
    <div style="background-color: white; padding: 10px" v-if="mode === 'renderer'">
      <DwfFormRenderer :options="{}" :schema="schema"></DwfFormRenderer>
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
    const schema = ref<Form>();
    const builderSettings = SettingsEN;
    const mode = ref('');

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
      if (!newSchema.key || !newSchema.type || !newSchema.allOf) {
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
      }
      window.addEventListener('message', getDataFromExtension);
    })

    onUnmounted(() => {
      window.removeEventListener('message', getDataFromExtension);
    })

    return {
      schema,
      builderSettings,
      mode,
      schemaChanged
    }
  }
});
</script>
