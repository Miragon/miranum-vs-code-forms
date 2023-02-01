[VS Code JsonSchema Builder - v0.3.2](../documentation.md) / [JsonSchemaBuilderProvider](../modules/JsonSchemaBuilderProvider.md) / JsonSchemaBuilderProvider

# Class: JsonSchemaBuilderProvider

[JsonSchemaBuilderProvider](../modules/JsonSchemaBuilderProvider.md).JsonSchemaBuilderProvider

The [Custom Text Editor](https://code.visualstudio.com/api/extension-guides/custom-editors) uses a '.form'-File as its
data model and synchronize changes with the [webview](https://code.visualstudio.com/api/extension-guides/webview).
The webview is build with [Vue.js](https://vuejs.org/) and uses the
[DigiWF Form Builder](https://github.com/FlowSquad/digiwf-core/tree/dev/digiwf-apps/packages/components/digiwf-form-builder).
The provider also register a [command](https://code.visualstudio.com/api/extension-guides/command) for toggling the
standard vscode text editor and a preview for rendering [Json Schema](https://json-schema.org/).

## Implements

- `CustomTextEditorProvider`

## Table of contents

### Properties

- [viewType](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#viewtype)
- [counter](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#counter)
- [controller](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#controller)
- [preview](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#preview)
- [textEditor](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#texteditor)
- [disposables](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#disposables)
- [context](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#context)

### Constructors

- [constructor](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#constructor)

### Methods

- [resolveCustomTextEditor](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#resolvecustomtexteditor)
- [dispose](JsonSchemaBuilderProvider.JsonSchemaBuilderProvider.md#dispose)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-builder"``

Unique identifier for the custom editor provider.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:24](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L24)

___

### counter

▪ `Static` `Private` **counter**: `number` = `0`

Number of currently open custom text editors with the view type `jsonschema-builder`.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:27](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L27)

___

### controller

• `Private` `Readonly` **controller**: [`DocumentController`](controller_DocumentController.DocumentController.md)

The controller (DocumentController) managing the document (.form-file).

#### Defined in

[src/JsonSchemaBuilderProvider.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L29)

___

### preview

• `Private` `Readonly` **preview**: [`PreviewComponent`](components_PreviewComponent.PreviewComponent.md)

The preview (PreviewComponent) which renders the content of the active custom text editor.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:31](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L31)

___

### textEditor

• `Private` `Readonly` **textEditor**: [`TextEditorComponent`](components_TextEditorComponent.TextEditorComponent.md)

The text editor (TextEditorComponent) for direct changes inside the document.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L33)

___

### disposables

• `Private` **disposables**: `Map`<`string`, `Disposable`[]\>

#### Defined in

[src/JsonSchemaBuilderProvider.ts:34](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L34)

___

### context

• `Private` `Readonly` **context**: `ExtensionContext`

The context of the extension

#### Defined in

[src/JsonSchemaBuilderProvider.ts:41](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L41)

## Constructors

### constructor

• **new JsonSchemaBuilderProvider**(`context`)

Register all components and controllers and set up all commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Defined in

[src/JsonSchemaBuilderProvider.ts:40](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L40)

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

[src/JsonSchemaBuilderProvider.ts:74](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L74)

___

### dispose

▸ `Private` **dispose**(`key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`void`

#### Defined in

[src/JsonSchemaBuilderProvider.ts:240](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/JsonSchemaBuilderProvider.ts#L240)
