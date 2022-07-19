<template>
  <v-app>
    <v-main>
      <v-tabs
          fixed-tabs
          dark
      >
        <v-tab>
          Builder
        </v-tab>
        <v-tab>
          Renderer
        </v-tab>
        <v-tab-item>
          <VFormBuilder @input="schemaChanged" :value="schema" :builder-settings="builderSettings"></VFormBuilder>
          {{currentSchema}}
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
import Vue from 'vue';
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";
import {VFormBuilder} from "@muenchen/digiwf-form-builder";
import {Settings} from "./settings/Settings";

export default Vue.extend({
  name: 'App',

  components: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    VJsonRenderer,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    VFormBuilder
  },
  data: () => ({
    schema: {
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
    },
    currentSchema: {
    },
    builderSettings: Settings
  }),
  methods: {
    schemaChanged: function (schema: any): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.currentSchema = schema;
      //TODO update VS-Code here


      this.$forceUpdate();
    }
  }

});
</script>
