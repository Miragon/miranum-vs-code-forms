[VS Code JsonSchema Builder - v0.3.1](../documentation.md) / [JsonSchemaBuilderProvider](../modules/JsonSchemaBuilderProvider.md) / JsonSchemaBuilderProvider

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
- [context](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#context)

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

[src/jsonSchemaBuilderProvider.ts:26](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L26)

___

### counter

▪ `Static` `Private` **counter**: `number` = `0`

Number of currently open custom text editors with the view type `jsonschema-builder`.

#### Defined in

[src/jsonSchemaBuilderProvider.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L29)

___

### writeData

• `Private` `Readonly` **writeData**: (`document`: `TextDocument`, `content`: `Schema`, `save`: `boolean`) => `Thenable`<`boolean`\> & { `clear`: () => `void`  } & { `flush`: () => `void`  }

Function to apply changes to the data model.

#### Defined in

[src/jsonSchemaBuilderProvider.ts:31](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L31)

___

### content

• `Private` **content**: `Schema`

The content of the current active custom text editor.

#### Defined in

[src/jsonSchemaBuilderProvider.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L33)

___

### renderer

• `Private` `Readonly` **renderer**: [`JsonSchemaRendererProvider`](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md)

The WebviewView ([JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md)) which renders the content of the active custom text editor.

#### Defined in

[src/jsonSchemaBuilderProvider.ts:35](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L35)

___

### context

• `Private` `Readonly` **context**: `ExtensionContext`

The context of the extension

#### Defined in

[src/jsonSchemaBuilderProvider.ts:42](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L42)

## Constructors

### constructor

• **new JsonSchemaBuilderProvider**(`context`)

Register the standard vscode text editor ([TextEditor](../modules/TextEditor.md)) and the WebviewView ([JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md)).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Defined in

[src/jsonSchemaBuilderProvider.ts:41](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L41)

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

[src/jsonSchemaBuilderProvider.ts:67](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L67)

___

### writeChangesToDocument

▸ `Protected` **writeChangesToDocument**(`document`, `content`, `save?`): `Thenable`<`boolean`\>

Apply changes to the data model.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `document` | `TextDocument` | `undefined` | The data model |
| `content` | `Schema` | `undefined` | The data which was sent from the webview |
| `save` | `boolean` | `false` | Boolean to save the changes or not |

#### Returns

`Thenable`<`boolean`\>

Thenable

#### Defined in

[src/jsonSchemaBuilderProvider.ts:215](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaBuilderProvider.ts#L215)
