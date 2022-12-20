[VS Code JsonSchema Builder - v0.3.1](../documentation.md) / [JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md) / JsonSchemaRendererProvider

# Class: JsonSchemaRendererProvider

[JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md).JsonSchemaRendererProvider

The [WebviewView](https://code.visualstudio.com/api/extension-guides/webview) renders the content of the current active
custom text editor.

## Implements

- `WebviewViewProvider`

## Table of contents

### Properties

- [viewType](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#viewtype)
- [view](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#view)
- [content](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#content)
- [context](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#context)

### Constructors

- [constructor](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#constructor)

### Methods

- [resolveWebviewView](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#resolvewebviewview)
- [updateRenderer](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#updaterenderer)
- [dispose](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#dispose)
- [isVisible](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#isvisible)
- [setInitialContent](JsonSchemaRendererProvider.JsonSchemaRendererProvider.md#setinitialcontent)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-renderer"``

Unique identifier for the webview view provider.

#### Defined in

[src/jsonSchemaRendererProvider.ts:18](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L18)

___

### view

• `Private` `Optional` **view**: `WebviewView`

The webview which is displayed as a view inside a view container.

#### Defined in

[src/jsonSchemaRendererProvider.ts:21](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L21)

___

### content

• `Private` `Optional` **content**: `Schema`

The current content which is displayed.

#### Defined in

[src/jsonSchemaRendererProvider.ts:23](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L23)

___

### context

• `Private` `Readonly` **context**: `ExtensionContext`

The context of the extension

#### Defined in

[src/jsonSchemaRendererProvider.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L29)

## Constructors

### constructor

• **new JsonSchemaRendererProvider**(`context`)

Register the update-command.ƒ

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Defined in

[src/jsonSchemaRendererProvider.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L29)

## Methods

### resolveWebviewView

▸ **resolveWebviewView**(`webviewView`, `context`, `token`): `void` \| `Thenable`<`void`\>

Called when a new WebviewView is opened.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webviewView` | `WebviewView` | A webview based view |
| `context` | `WebviewViewResolveContext`<`unknown`\> | Additional information when the webview view is being resolved. |
| `token` | `CancellationToken` | A token to request cancellation of an asynchronous or long-running operation |

#### Returns

`void` \| `Thenable`<`void`\>

#### Implementation of

vscode.WebviewViewProvider.resolveWebviewView

#### Defined in

[src/jsonSchemaRendererProvider.ts:44](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L44)

___

### updateRenderer

▸ **updateRenderer**(`schema?`): `void`

Function which is called by the custom text editor to update the content of the webview view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema?` | `Schema` | The new content for rendering |

#### Returns

`void`

#### Defined in

[src/jsonSchemaRendererProvider.ts:77](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L77)

___

### dispose

▸ **dispose**(): `void`

Function which is called by the custom text editor to dispose the webview view.

#### Returns

`void`

#### Defined in

[src/jsonSchemaRendererProvider.ts:99](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L99)

___

### isVisible

▸ **isVisible**(): `boolean`

Function which is called by the custom text editor to get the current view state.

#### Returns

`boolean`

#### Defined in

[src/jsonSchemaRendererProvider.ts:106](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L106)

___

### setInitialContent

▸ **setInitialContent**(`schema`): `void`

Function which is called by the custom text editor to set the initial content of the data model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `Schema` |

#### Returns

`void`

#### Defined in

[src/jsonSchemaRendererProvider.ts:116](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/jsonSchemaRendererProvider.ts#L116)
