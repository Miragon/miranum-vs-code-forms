[Miranum Forms - v0.3.2](../documentation.md) / Functions

# Module: Functions

This module includes helper-functions wich are use by the JSON Schema Builder and Preview.

## Table of contents

### Functions

- [getMinimum](Functions.md#getminimum)
- [getDefault](Functions.md#getdefault)
- [getHtmlForWebview](Functions.md#gethtmlforwebview)
- [getNonce](Functions.md#getnonce)

## Functions

### getMinimum

▸ **getMinimum**(): [`Schema`](utils_types.md#schema)

Get minimum form.

#### Returns

[`Schema`](utils_types.md#schema)

#### Defined in

[src/utils/Functions.ts:12](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/utils/Functions.ts#L12)

___

### getDefault

▸ **getDefault**(): [`Schema`](utils_types.md#schema)

Get the default content which is displayed when the data model is empty.

#### Returns

[`Schema`](utils_types.md#schema)

#### Defined in

[src/utils/Functions.ts:28](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/utils/Functions.ts#L28)

___

### getHtmlForWebview

▸ **getHtmlForWebview**(`webview`, `extensionUri`, `initialContent`, `mode`): `string`

Get the HTML-Document which display the webview

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webview` | `Webview` | Webview belonging to the panel |
| `extensionUri` | `Uri` |  |
| `initialContent` | [`Schema`](utils_types.md#schema) |  |
| `mode` | `string` | Says which part of the Vue-App should be displayed |

#### Returns

`string`

a string which represents the html content

#### Defined in

[src/utils/Functions.ts:96](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/utils/Functions.ts#L96)

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

[src/utils/Functions.ts:155](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/utils/Functions.ts#L155)
