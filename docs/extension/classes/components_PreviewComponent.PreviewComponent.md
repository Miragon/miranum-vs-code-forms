[VS Code JsonSchema Builder - v0.3.2](../documentation.md) / [components/PreviewComponent](../modules/components_PreviewComponent.md) / PreviewComponent

# Class: PreviewComponent

[components/PreviewComponent](../modules/components_PreviewComponent.md).PreviewComponent

## Hierarchy

- [`Preview`](lib_Preview.Preview.md)<[`Schema`](../modules/utils_types.md#schema)\>

  ↳ **`PreviewComponent`**

## Table of contents

### Properties

- [viewType](components_PreviewComponent.PreviewComponent.md#viewtype)
- [webviewOptions](components_PreviewComponent.PreviewComponent.md#webviewoptions)
- [extensionUri](components_PreviewComponent.PreviewComponent.md#extensionuri)

### Constructors

- [constructor](components_PreviewComponent.PreviewComponent.md#constructor)

### Accessors

- [active](components_PreviewComponent.PreviewComponent.md#active)
- [visible](components_PreviewComponent.PreviewComponent.md#visible)
- [isOpen](components_PreviewComponent.PreviewComponent.md#isopen)
- [lastViewState](components_PreviewComponent.PreviewComponent.md#lastviewstate)

### Methods

- [create](components_PreviewComponent.PreviewComponent.md#create)
- [update](components_PreviewComponent.PreviewComponent.md#update)
- [close](components_PreviewComponent.PreviewComponent.md#close)
- [toggle](components_PreviewComponent.PreviewComponent.md#toggle)
- [getHtml](components_PreviewComponent.PreviewComponent.md#gethtml)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-renderer"``

#### Defined in

[src/components/PreviewComponent.ts:7](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/PreviewComponent.ts#L7)

___

### webviewOptions

• `Protected` `Readonly` **webviewOptions**: [`WebviewOptions`](../interfaces/lib_Preview.WebviewOptions.md)

#### Overrides

[Preview](lib_Preview.Preview.md).[webviewOptions](lib_Preview.Preview.md#webviewoptions)

#### Defined in

[src/components/PreviewComponent.ts:8](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/PreviewComponent.ts#L8)

___

### extensionUri

• `Protected` `Readonly` **extensionUri**: `Uri`

#### Inherited from

[Preview](lib_Preview.Preview.md).[extensionUri](lib_Preview.Preview.md#extensionuri)

#### Defined in

[src/components/PreviewComponent.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/PreviewComponent.ts#L14)

## Constructors

### constructor

• **new PreviewComponent**(`extensionUri`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `extensionUri` | `Uri` |

#### Overrides

[Preview](lib_Preview.Preview.md).[constructor](lib_Preview.Preview.md#constructor)

#### Defined in

[src/components/PreviewComponent.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/PreviewComponent.ts#L14)

## Accessors

### active

• `get` **active**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Preview.active

#### Defined in

[src/lib/Preview.ts:16](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L16)

___

### visible

• `get` **visible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Preview.visible

#### Defined in

[src/lib/Preview.ts:24](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L24)

___

### isOpen

• `get` **isOpen**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Preview.isOpen

#### Defined in

[src/lib/Preview.ts:32](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L32)

___

### lastViewState

• `get` **lastViewState**(): [`ViewState`](../enums/lib_types.ViewState.md)

#### Returns

[`ViewState`](../enums/lib_types.ViewState.md)

#### Inherited from

Preview.lastViewState

#### Defined in

[src/lib/Preview.ts:36](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L36)

## Methods

### create

▸ **create**(`viewType`, `content`): `void`

Create a new webview panel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewType` | `string` |
| `content` | [`Schema`](../modules/utils_types.md#schema) |

#### Returns

`void`

#### Inherited from

[Preview](lib_Preview.Preview.md).[create](lib_Preview.Preview.md#create)

#### Defined in

[src/lib/Preview.ts:43](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L43)

___

### update

▸ **update**(`content`): `void`

Update the active preview window.

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [`Schema`](../modules/utils_types.md#schema) |

#### Returns

`void`

#### Inherited from

[Preview](lib_Preview.Preview.md).[update](lib_Preview.Preview.md#update)

#### Defined in

[src/lib/Preview.ts:112](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L112)

___

### close

▸ **close**(): `void`

Close the active preview window.

#### Returns

`void`

#### Inherited from

[Preview](lib_Preview.Preview.md).[close](lib_Preview.Preview.md#close)

#### Defined in

[src/lib/Preview.ts:127](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L127)

___

### toggle

▸ **toggle**(`viewType`, `content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewType` | `string` |
| `content` | [`Schema`](../modules/utils_types.md#schema) |

#### Returns

`void`

#### Inherited from

[Preview](lib_Preview.Preview.md).[toggle](lib_Preview.Preview.md#toggle)

#### Defined in

[src/lib/Preview.ts:140](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/Preview.ts#L140)

___

### getHtml

▸ `Protected` **getHtml**(`webview`, `extensionUri`, `content`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `webview` | `Webview` |
| `extensionUri` | `Uri` |
| `content` | [`Schema`](../modules/utils_types.md#schema) |

#### Returns

`string`

#### Overrides

[Preview](lib_Preview.Preview.md).[getHtml](lib_Preview.Preview.md#gethtml)

#### Defined in

[src/components/PreviewComponent.ts:18](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/PreviewComponent.ts#L18)
