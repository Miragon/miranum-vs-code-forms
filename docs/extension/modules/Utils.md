[VS Code JsonSchema Builder - v0.2.0](../documentation.md) / Utils

# Module: Utils

This module includes helper-functions and functions which are used by the `JsonSchema Builder` and `JsonSchema Renderer`.

## Table of contents

### Functions

- [getDefault](Utils.md#getdefault)
- [getContentAsJson](Utils.md#getcontentasjson)
- [getHtmlForWebview](Utils.md#gethtmlforwebview)

## Functions

### getDefault

▸ **getDefault**(): `JSON`

Get the default content which is displayed when the data model is empty.

#### Returns

`JSON`

#### Defined in

[src-ext/lib/utils.ts:11](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/3b2a10f/src-ext/lib/utils.ts#L11)

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

[src-ext/lib/utils.ts:79](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/3b2a10f/src-ext/lib/utils.ts#L79)

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

[src-ext/lib/utils.ts:99](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/3b2a10f/src-ext/lib/utils.ts#L99)
