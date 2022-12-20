[VS Code JsonSchema Builder - v0.3.2](../documentation.md) / Utils

# Module: Utils

This module includes helper-functions and functions which are used by the `JsonSchema Builder` and `JsonSchema Renderer`.

## Table of contents

### Functions

- [getDefault](Utils.md#getdefault)
- [getContentAsSchema](Utils.md#getcontentasschema)
- [getHtmlForWebview](Utils.md#gethtmlforwebview)
- [getNonce](Utils.md#getnonce)

## Functions

### getDefault

▸ **getDefault**(): `Schema`

Get the default content which is displayed when the data model is empty.

#### Returns

`Schema`

#### Defined in

[src/utils/utils.ts:12](https://github.com/FlowSquad/miranum-vs-code-forms/blob/c9e53b9/src/utils/utils.ts#L12)

___

### getContentAsSchema

▸ **getContentAsSchema**(`text`): `Schema`

Parse a string to json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The string which should be parsed to json |

#### Returns

`Schema`

an json object

#### Defined in

[src/utils/utils.ts:76](https://github.com/FlowSquad/miranum-vs-code-forms/blob/c9e53b9/src/utils/utils.ts#L76)

___

### getHtmlForWebview

▸ **getHtmlForWebview**(`webview`, `extensionUri`, `initialContent`, `mode`): `string`

Get the HTML-Document which display the webview

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webview` | `Webview` | Webview belonging to the panel |
| `extensionUri` | `Uri` |  |
| `initialContent` | `Schema` |  |
| `mode` | `string` | Says which part of the Vue-App should be displayed |

#### Returns

`string`

a string which represents the html content

#### Defined in

[src/utils/utils.ts:96](https://github.com/FlowSquad/miranum-vs-code-forms/blob/c9e53b9/src/utils/utils.ts#L96)

___

### getNonce

▸ **getNonce**(`length?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `length` | `number` | `32` |

#### Returns

`string`

#### Defined in

[src/utils/utils.ts:155](https://github.com/FlowSquad/miranum-vs-code-forms/blob/c9e53b9/src/utils/utils.ts#L155)
