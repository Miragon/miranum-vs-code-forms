[Miranum Forms - v0.3.2](../documentation.md) / [JsonSchemaBuilderProvider](../modules/JsonSchemaBuilderProvider.md) / JsonSchemaBuilderProvider

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

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-builder"``

Unique identifier for the custom editor provider.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:24](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L24)

___

### counter

▪ `Static` `Private` **counter**: `number` = `0`

Number of currently open custom text editors with the view type `jsonschema-builder`.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:27](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L27)

___

### controller

• `Private` `Readonly` **controller**: [`DocumentController`](DocumentController.DocumentController.md)

The controller ([DocumentController](../modules/DocumentController.md)) manages the document (.form-file).

#### Defined in

[src/JsonSchemaBuilderProvider.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L29)

___

### preview

• `Private` `Readonly` **preview**: [`PreviewComponent`](PreviewComponent.PreviewComponent.md)

The preview ([PreviewComponent](../modules/PreviewComponent.md)) renders the content of the active custom text editor.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:31](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L31)

___

### textEditor

• `Private` `Readonly` **textEditor**: [`TextEditorComponent`](TextEditorComponent.TextEditorComponent.md)

The text editor ([TextEditorComponent](../modules/TextEditorComponent.md)) for direct changes inside the document.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L33)

___

### disposables

• `Private` **disposables**: `Map`<`string`, `Disposable`[]\>

An array with all disposables per webview panel.

#### Defined in

[src/JsonSchemaBuilderProvider.ts:35](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L35)

___

### context

• `Private` `Readonly` **context**: `ExtensionContext`

The context of the extension

#### Defined in

[src/JsonSchemaBuilderProvider.ts:44](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L44)

## Constructors

### constructor

• **new JsonSchemaBuilderProvider**(`context`)

Register all components and controllers and set up all commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Defined in

[src/JsonSchemaBuilderProvider.ts:43](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L43)

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

[src/JsonSchemaBuilderProvider.ts:80](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/JsonSchemaBuilderProvider.ts#L80)
