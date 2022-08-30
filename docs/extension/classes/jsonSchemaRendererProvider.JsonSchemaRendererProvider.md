[VS Code JsonSchema Builder - v0.1.0](../README.md) / [jsonSchemaRendererProvider](../modules/jsonSchemaRendererProvider.md) / JsonSchemaRendererProvider

# Class: JsonSchemaRendererProvider

[jsonSchemaRendererProvider](../modules/jsonSchemaRendererProvider.md).JsonSchemaRendererProvider

The [WebviewView](https://code.visualstudio.com/api/extension-guides/webview) renders the content of the current active
custom text editor.

## Implements

- `WebviewViewProvider`

## Table of contents

### Properties

- [viewType](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#viewtype)
- [view](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#view)
- [state](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#state)

### Constructors

- [constructor](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#constructor)

### Methods

- [resolveWebviewView](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#resolvewebviewview)
- [updateRenderer](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#updaterenderer)
- [dispose](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#dispose)
- [isVisible](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#isvisible)
- [setInitialContent](jsonSchemaRendererProvider.JsonSchemaRendererProvider.md#setinitialcontent)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-renderer"``

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:10](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L10)

___

### view

• `Private` `Optional` **view**: `WebviewView`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:12](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L12)

___

### state

• `Private` `Optional` **state**: `JSON`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:13](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L13)

## Constructors

### constructor

• **new JsonSchemaRendererProvider**(`context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExtensionContext` |

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:15](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L15)

## Methods

### resolveWebviewView

▸ **resolveWebviewView**(`webviewView`, `context`, `token`): `void` \| `Thenable`<`void`\>

Called when the WebviewView is opened.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webviewView` | `WebviewView` | A webview based view |
| `context` | `WebviewViewResolveContext`<`unknown`\> | Additional information the webview view being resolved. |
| `token` | `CancellationToken` | A token to request cancellation of a asynchronous or long running operation |

#### Returns

`void` \| `Thenable`<`void`\>

#### Implementation of

vscode.WebviewViewProvider.resolveWebviewView

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:30](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L30)

___

### updateRenderer

▸ **updateRenderer**(`schema?`): `void`

Function which is called by the custom text editor to update the content of the webview view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema?` | `JSON` | The new content for rendering |

#### Returns

`void`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:67](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L67)

___

### dispose

▸ **dispose**(): `void`

Function which is called by the custom text editor to dispose the webview view.

#### Returns

`void`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:89](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L89)

___

### isVisible

▸ **isVisible**(): `boolean`

Function which is called by the custom text editor to get the current view state.

#### Returns

`boolean`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:96](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L96)

___

### setInitialContent

▸ **setInitialContent**(`schema`): `void`

Function which is called by the custom text editor to set the initial content of the data model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `JSON` |

#### Returns

`void`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:106](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/dae9909/src-ext/jsonSchemaRendererProvider.ts#L106)
