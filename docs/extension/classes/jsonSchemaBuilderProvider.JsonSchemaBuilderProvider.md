[vs-code-vuetify-jsonschema-builder - v0.1.0](../README.md) / [Exports](../modules.md) / [jsonSchemaBuilderProvider](../modules/jsonSchemaBuilderProvider.md) / JsonSchemaBuilderProvider

# Class: JsonSchemaBuilderProvider

[jsonSchemaBuilderProvider](../modules/jsonSchemaBuilderProvider.md).JsonSchemaBuilderProvider

The [Custom Text Editor](https://code.visualstudio.com/api/extension-guides/custom-editors) uses a '.form'-File as its
data model and synchronize changes with the [webview](https://code.visualstudio.com/api/extension-guides/webview).
The webview is build with [Vue.js](https://vuejs.org/) and uses the [DigiWF Form Builder](https://github.com/it-at-m/digiwf-form-builder).
The provider also register a [command](https://code.visualstudio.com/api/extension-guides/command) for toggling the
standard vscode text editor and a [WebviewView](https://code.visualstudio.com/api/extension-guides/webview)
for rendering [Json Schema](https://json-schema.org/).

## Implements

- `CustomTextEditorProvider`

## Table of contents

### Properties

- [viewType](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#viewtype)
- [counter](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#counter)
- [writeData](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#writedata)
- [content](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#content)
- [renderer](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#renderer)

### Constructors

- [constructor](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#constructor)

### Methods

- [resolveCustomTextEditor](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#resolvecustomtexteditor)
- [writeChangesToDocument](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#writechangestodocument)
- [init](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#init)
- [getContent](jsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#getcontent)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-builder"``

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:17](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L17)

___

### counter

▪ `Static` `Private` **counter**: `number` = `0`

Number of currently open custom text editors with the view type `jsonschema-builder`.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:20](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L20)

___

### writeData

• `Private` `Readonly` **writeData**: (`document`: `TextDocument`, `content`: `JSON`) => `Thenable`<`boolean`\> & { `clear`: () => `void`  } & { `flush`: () => `void`  }

Function to apply changes to the data model.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:22](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L22)

___

### content

• `Private` **content**: `JSON`

The content of the current active custom text editor.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:24](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L24)

___

### renderer

• `Private` `Readonly` **renderer**: [`JsonSchemaRendererProvider`](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md)

The WebviewView (JsonSchemaRendererProvider) which renders the content of the active custom text editor.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:26](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L26)

## Constructors

### constructor

• **new JsonSchemaBuilderProvider**(`context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExtensionContext` |

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:28](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L28)

## Methods

### resolveCustomTextEditor

▸ **resolveCustomTextEditor**(`document`, `webviewPanel`, `token`): `Promise`<`void`\>

Called when the custom editor is opened.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `TextDocument` | Represents the data model (.form) |
| `webviewPanel` | `WebviewPanel` | The panel which contains the webview |
| `token` | `CancellationToken` | A cancellation token that indicates that the result is no longer needed |

#### Returns

`Promise`<`void`\>

#### Implementation of

vscode.CustomTextEditorProvider.resolveCustomTextEditor

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:54](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L54)

___

### writeChangesToDocument

▸ `Protected` **writeChangesToDocument**(`document`, `content`): `Thenable`<`boolean`\>

Apply changes to the data model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `TextDocument` | The data model |
| `content` | `JSON` | The data which was sent from the webview |

#### Returns

`Thenable`<`boolean`\>

Thenable

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:195](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L195)

___

### init

▸ `Private` **init**(`document`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`void`

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:214](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L214)

___

### getContent

▸ `Private` **getContent**(`text`): `JSON`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`JSON`

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:233](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/b7ab68e/src-ext/jsonSchemaBuilderProvider.ts#L233)
