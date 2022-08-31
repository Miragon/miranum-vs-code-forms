[VS Code JsonSchema Builder - v0.1.0](../documentation.md) / [JsonSchemaBuilderProvider](../modules/JsonSchemaBuilderProvider.md) / JsonSchemaBuilderProvider

# Class: JsonSchemaBuilderProvider

[JsonSchemaBuilderProvider](../modules/JsonSchemaBuilderProvider.md).JsonSchemaBuilderProvider

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

- [viewType](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#viewtype)
- [counter](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#counter)
- [writeData](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#writedata)
- [content](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#content)
- [renderer](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#renderer)

### Constructors

- [constructor](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#constructor)

### Methods

- [resolveCustomTextEditor](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#resolvecustomtexteditor)
- [writeChangesToDocument](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#writechangestodocument)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-builder"``

Unique identifier for the custom editor provider.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:25](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L25)

___

### counter

▪ `Static` `Private` **counter**: `number` = `0`

Number of currently open custom text editors with the view type `jsonschema-builder`.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:28](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L28)

___

### writeData

• `Private` `Readonly` **writeData**: (`document`: `TextDocument`, `content`: `JSON`) => `Thenable`<`boolean`\> & { `clear`: () => `void`  } & { `flush`: () => `void`  }

Function to apply changes to the data model.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:30](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L30)

___

### content

• `Private` **content**: `JSON`

The content of the current active custom text editor.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:32](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L32)

___

### renderer

• `Private` `Readonly` **renderer**: [`JsonSchemaRendererProvider`](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md)

The WebviewView ([JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md)) which renders the content of the active custom text editor.

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:34](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L34)

## Constructors

### constructor

• **new JsonSchemaBuilderProvider**(`context`)

Register the standard vscode text editor ([TextEditor](../modules/TextEditor.md)) and the WebviewView ([JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md)).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:40](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L40)

## Methods

### resolveCustomTextEditor

▸ **resolveCustomTextEditor**(`document`, `webviewPanel`, `token`): `Promise`<`void`\>

Called when a new custom editor is opened.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `TextDocument` | Represents the data model (.form-file) |
| `webviewPanel` | `WebviewPanel` | The panel which contains the webview |
| `token` | `CancellationToken` | A cancellation token that indicates that the result is no longer needed |

#### Returns

`Promise`<`void`\>

#### Implementation of

vscode.CustomTextEditorProvider.resolveCustomTextEditor

#### Defined in

[src-ext/jsonSchemaBuilderProvider.ts:66](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L66)

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

[src-ext/jsonSchemaBuilderProvider.ts:208](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/c906668/src-ext/jsonSchemaBuilderProvider.ts#L208)
