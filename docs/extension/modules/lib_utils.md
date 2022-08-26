[vs-code-vuetify-jsonschema-builder - v0.1.0](../README.md) / [Exports](../modules.md) / lib/utils

# Module: lib/utils

## Table of contents

### Functions

- [getDefault](lib_utils.md#getdefault)
- [getContentAsJson](lib_utils.md#getcontentasjson)
- [getHtmlForWebview](lib_utils.md#gethtmlforwebview)

## Functions

### getDefault

▸ **getDefault**(): `JSON`

#### Returns

`JSON`

#### Defined in

[src-ext/lib/utils.ts:3](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/utils.ts#L3)

___

### getContentAsJson

▸ **getContentAsJson**(`text`): `JSON`

Parse a string to json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The string which should be parsed to json |

#### Returns

`JSON`

an json object

#### Defined in

[src-ext/lib/utils.ts:71](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/utils.ts#L71)

___

### getHtmlForWebview

▸ **getHtmlForWebview**(`webview`, `extensionUri`, `initialContent`, `mode`): `string`

Get the HTML-Document which display the webview

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webview` | `Webview` | Webview belonging to the panel |
| `extensionUri` | `Uri` |  |
| `initialContent` | `JSON` |  |
| `mode` | `string` | Says which part of the Vue-App should be displayed |

#### Returns

`string`

a string which represents the html content

#### Defined in

[src-ext/lib/utils.ts:91](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/utils.ts#L91)
