[Miranum Forms - v0.3.2](../documentation.md) / [lib/Preview](../modules/lib_Preview.md) / Preview

# Class: Preview<ContentType\>

[lib/Preview](../modules/lib_Preview.md).Preview

## Type parameters

| Name |
| :------ |
| `ContentType` |

## Hierarchy

- **`Preview`**

  ↳ [`PreviewComponent`](PreviewComponent.PreviewComponent.md)

## Implements

- [`Updatable`](../interfaces/lib_types.Updatable.md)<`ContentType`\>

## Table of contents

### Constructors

- [constructor](lib_Preview.Preview.md#constructor)

### Accessors

- [active](lib_Preview.Preview.md#active)
- [visible](lib_Preview.Preview.md#visible)
- [isOpen](lib_Preview.Preview.md#isopen)
- [lastViewState](lib_Preview.Preview.md#lastviewstate)

### Methods

- [create](lib_Preview.Preview.md#create)
- [update](lib_Preview.Preview.md#update)
- [close](lib_Preview.Preview.md#close)
- [toggle](lib_Preview.Preview.md#toggle)
- [getHtml](lib_Preview.Preview.md#gethtml)
- [dispose](lib_Preview.Preview.md#dispose)

### Properties

- [extensionUri](lib_Preview.Preview.md#extensionuri)
- [webviewOptions](lib_Preview.Preview.md#webviewoptions)
- [webviewObject](lib_Preview.Preview.md#webviewobject)
- [closeCaller](lib_Preview.Preview.md#closecaller)
- [isBuffer](lib_Preview.Preview.md#isbuffer)
- [\_isOpen](lib_Preview.Preview.md#_isopen)
- [\_lastViewState](lib_Preview.Preview.md#_lastviewstate)

## Constructors

### constructor

• **new Preview**<`ContentType`\>()

#### Type parameters

| Name |
| :------ |
| `ContentType` |

## Accessors

### active

• `get` **active**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/Preview.ts:16](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L16)

___

### visible

• `get` **visible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/Preview.ts:24](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L24)

___

### isOpen

• `get` **isOpen**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/Preview.ts:32](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L32)

___

### lastViewState

• `get` **lastViewState**(): [`ViewState`](../enums/lib_types.ViewState.md)

#### Returns

[`ViewState`](../enums/lib_types.ViewState.md)

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
| `content` | `ContentType` |

#### Returns

`void`

#### Defined in

[src/lib/Preview.ts:43](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L43)

___

### update

▸ **update**(`content`): `void`

Update the active preview window.

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `ContentType` |

#### Returns

`void`

#### Implementation of

[Updatable](../interfaces/lib_types.Updatable.md).[update](../interfaces/lib_types.Updatable.md#update)

#### Defined in

[src/lib/Preview.ts:112](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L112)

___

### close

▸ **close**(): `void`

Close the active preview window.

#### Returns

`void`

#### Defined in

[src/lib/Preview.ts:127](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L127)

___

### toggle

▸ **toggle**(`viewType`, `content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewType` | `string` |
| `content` | `ContentType` |

#### Returns

`void`

#### Defined in

[src/lib/Preview.ts:140](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L140)

___

### getHtml

▸ `Protected` `Abstract` **getHtml**(`webview`, `extensionUri`, `content`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `webview` | `Webview` |
| `extensionUri` | `Uri` |
| `content` | `ContentType` |

#### Returns

`string`

#### Defined in

[src/lib/Preview.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L14)

___

### dispose

▸ `Private` **dispose**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/Preview.ts:149](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L149)

## Properties

### extensionUri

• `Protected` `Readonly` `Abstract` **extensionUri**: `Uri`

#### Defined in

[src/lib/Preview.ts:6](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L6)

___

### webviewOptions

• `Protected` `Abstract` **webviewOptions**: [`WebviewOptions`](../interfaces/lib_Preview.WebviewOptions.md)

#### Defined in

[src/lib/Preview.ts:7](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L7)

___

### webviewObject

• `Private` **webviewObject**: `WebviewObject`[] = `[]`

#### Defined in

[src/lib/Preview.ts:8](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L8)

___

### closeCaller

• `Private` **closeCaller**: `CloseCaller` = `CloseCaller.undefined`

#### Defined in

[src/lib/Preview.ts:9](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L9)

___

### isBuffer

• `Private` **isBuffer**: `boolean` = `false`

#### Defined in

[src/lib/Preview.ts:10](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L10)

___

### \_isOpen

• `Private` **\_isOpen**: `boolean` = `false`

#### Defined in

[src/lib/Preview.ts:11](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L11)

___

### \_lastViewState

• `Private` **\_lastViewState**: [`ViewState`](../enums/lib_types.ViewState.md) = `ViewState.open`

#### Defined in

[src/lib/Preview.ts:12](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/Preview.ts#L12)
