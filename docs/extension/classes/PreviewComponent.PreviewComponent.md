[Miranum Forms - v0.3.2](../documentation.md) / [PreviewComponent](../modules/PreviewComponent.md) / PreviewComponent

# Class: PreviewComponent

[PreviewComponent](../modules/PreviewComponent.md).PreviewComponent

## Hierarchy

- [`Preview`](lib_Preview.Preview.md)<[`Schema`](../modules/utils_types.md#schema)\>

  ↳ **`PreviewComponent`**

## Table of contents

### Properties

- [viewType](PreviewComponent.PreviewComponent.md#viewtype)
- [webviewOptions](PreviewComponent.PreviewComponent.md#webviewoptions)
- [extensionUri](PreviewComponent.PreviewComponent.md#extensionuri)

### Constructors

- [constructor](PreviewComponent.PreviewComponent.md#constructor)

### Accessors

- [active](PreviewComponent.PreviewComponent.md#active)
- [visible](PreviewComponent.PreviewComponent.md#visible)
- [isOpen](PreviewComponent.PreviewComponent.md#isopen)
- [lastViewState](PreviewComponent.PreviewComponent.md#lastviewstate)

### Methods

- [create](PreviewComponent.PreviewComponent.md#create)
- [update](PreviewComponent.PreviewComponent.md#update)
- [close](PreviewComponent.PreviewComponent.md#close)
- [toggle](PreviewComponent.PreviewComponent.md#toggle)
- [getHtml](PreviewComponent.PreviewComponent.md#gethtml)

## Properties

### viewType

▪ `Static` `Readonly` **viewType**: ``"jsonschema-renderer"``

Unique identifier for the preview.

#### Defined in

[src/components/PreviewComponent.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/PreviewComponent.ts#L14)

___

### webviewOptions

• `Protected` `Readonly` **webviewOptions**: [`WebviewOptions`](../interfaces/lib_Preview.WebviewOptions.md)

Object that contains information for the webview.

#### Overrides

[Preview](lib_Preview.Preview.md).[webviewOptions](lib_Preview.Preview.md#webviewoptions)

#### Defined in

[src/components/PreviewComponent.ts:16](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/PreviewComponent.ts#L16)

___

### extensionUri

• `Protected` `Readonly` **extensionUri**: `Uri`

#### Inherited from

[Preview](lib_Preview.Preview.md).[extensionUri](lib_Preview.Preview.md#extensionuri)

#### Defined in

[src/components/PreviewComponent.ts:22](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/PreviewComponent.ts#L22)

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

[src/components/PreviewComponent.ts:22](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/PreviewComponent.ts#L22)

## Accessors

### active

• `get` **active**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Preview.active

#### Defined in

[src/lib/Preview.ts:16](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L16)

___

### visible

• `get` **visible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Preview.visible

#### Defined in

[src/lib/Preview.ts:24](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L24)

___

### isOpen

• `get` **isOpen**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Preview.isOpen

#### Defined in

[src/lib/Preview.ts:32](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L32)

___

### lastViewState

• `get` **lastViewState**(): [`ViewState`](../enums/lib_types.ViewState.md)

#### Returns

[`ViewState`](../enums/lib_types.ViewState.md)

#### Inherited from

Preview.lastViewState

#### Defined in

[src/lib/Preview.ts:36](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L36)

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

[src/lib/Preview.ts:43](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L43)

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

[src/lib/Preview.ts:112](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L112)

___

### close

▸ **close**(): `void`

Close the active preview window.

#### Returns

`void`

#### Inherited from

[Preview](lib_Preview.Preview.md).[close](lib_Preview.Preview.md#close)

#### Defined in

[src/lib/Preview.ts:127](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L127)

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

[src/lib/Preview.ts:140](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L140)

___

### getHtml

▸ `Protected` **getHtml**(`webview`, `extensionUri`, `content`): `string`

Returns the html content that is rendered inside the webview.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webview` | `Webview` | The webview. |
| `extensionUri` | `Uri` | The URI of the extension. |
| `content` | [`Schema`](../modules/utils_types.md#schema) | The json schema. |

#### Returns

`string`

#### Overrides

[Preview](lib_Preview.Preview.md).[getHtml](lib_Preview.Preview.md#gethtml)

#### Defined in

[src/components/PreviewComponent.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/PreviewComponent.ts#L33)
