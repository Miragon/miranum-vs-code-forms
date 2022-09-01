[VS Code JsonSchema Builder - v0.2.0](../documentation.md) / [JsonSchemaRendererProvider](../modules/JsonSchemaRendererProvider.md) / JsonSchemaRendererProvider

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

[src-ext/jsonSchemaRendererProvider.ts:17](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L17)

___

### view

• `Private` `Optional` **view**: `WebviewView`

The webview which is displayed as a view inside a view container.

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:20](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L20)

___

### content

• `Private` `Optional` **content**: `JSON`

The current content which is displayed.

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:22](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L22)

## Constructors

### constructor

• **new JsonSchemaRendererProvider**(`context`)

Register the update-command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:28](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L28)

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

[src-ext/jsonSchemaRendererProvider.ts:43](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L43)

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

[src-ext/jsonSchemaRendererProvider.ts:80](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L80)

___

### dispose

▸ **dispose**(): `void`

Function which is called by the custom text editor to dispose the webview view.

#### Returns

`void`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:102](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L102)

___

### isVisible

▸ **isVisible**(): `boolean`

Function which is called by the custom text editor to get the current view state.

#### Returns

`boolean`

#### Defined in

[src-ext/jsonSchemaRendererProvider.ts:109](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L109)

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

[src-ext/jsonSchemaRendererProvider.ts:119](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/de13d56/src-ext/jsonSchemaRendererProvider.ts#L119)
