[Miranum Forms - v0.3.2](../documentation.md) / [lib/TextEditorWrapper](../modules/lib_TextEditorWrapper.md) / TextEditorWrapper

# Class: TextEditorWrapper

[lib/TextEditorWrapper](../modules/lib_TextEditorWrapper.md).TextEditorWrapper

## Hierarchy

- **`TextEditorWrapper`**

  ↳ [`TextEditorComponent`](TextEditorComponent.TextEditorComponent.md)

## Implements

- [`Updatable`](../interfaces/lib_types.Updatable.md)<`TextDocument`\>

## Table of contents

### Accessors

- [isOpen](lib_TextEditorWrapper.TextEditorWrapper.md#isopen)
- [textEditor](lib_TextEditorWrapper.TextEditorWrapper.md#texteditor)

### Methods

- [toggle](lib_TextEditorWrapper.TextEditorWrapper.md#toggle)
- [create](lib_TextEditorWrapper.TextEditorWrapper.md#create)
- [close](lib_TextEditorWrapper.TextEditorWrapper.md#close)
- [update](lib_TextEditorWrapper.TextEditorWrapper.md#update)
- [getShowOptions](lib_TextEditorWrapper.TextEditorWrapper.md#getshowoptions)
- [getTab](lib_TextEditorWrapper.TextEditorWrapper.md#gettab)

### Constructors

- [constructor](lib_TextEditorWrapper.TextEditorWrapper.md#constructor)

### Properties

- [showOption](lib_TextEditorWrapper.TextEditorWrapper.md#showoption)
- [\_textEditor](lib_TextEditorWrapper.TextEditorWrapper.md#_texteditor)
- [\_isOpen](lib_TextEditorWrapper.TextEditorWrapper.md#_isopen)

## Accessors

### isOpen

• `get` **isOpen**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/TextEditorWrapper.ts:17](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L17)

___

### textEditor

• `Private` `get` **textEditor**(): `TextEditor`

#### Returns

`TextEditor`

#### Defined in

[src/lib/TextEditorWrapper.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L33)

## Methods

### toggle

▸ **toggle**(`document`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`void`

#### Defined in

[src/lib/TextEditorWrapper.ts:41](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L41)

___

### create

▸ **create**(`document`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/TextEditorWrapper.ts:53](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L53)

___

### close

▸ **close**(`fileName`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileName` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/TextEditorWrapper.ts:72](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L72)

___

### update

▸ **update**(`document`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[Updatable](../interfaces/lib_types.Updatable.md).[update](../interfaces/lib_types.Updatable.md#update)

#### Defined in

[src/lib/TextEditorWrapper.ts:92](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L92)

___

### getShowOptions

▸ `Private` **getShowOptions**(): `TextDocumentShowOptions`

#### Returns

`TextDocumentShowOptions`

#### Defined in

[src/lib/TextEditorWrapper.ts:107](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L107)

___

### getTab

▸ `Private` **getTab**(`fileName`): `Tab`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileName` | `string` |

#### Returns

`Tab`

#### Defined in

[src/lib/TextEditorWrapper.ts:129](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L129)

## Constructors

### constructor

• `Protected` **new TextEditorWrapper**()

#### Defined in

[src/lib/TextEditorWrapper.ts:21](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L21)

## Properties

### showOption

• `Protected` `Abstract` **showOption**: [`TextEditorShowOption`](../enums/lib_TextEditorWrapper.TextEditorShowOption.md)

#### Defined in

[src/lib/TextEditorWrapper.ts:13](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L13)

___

### \_textEditor

• `Private` **\_textEditor**: `undefined` \| `TextEditor`

#### Defined in

[src/lib/TextEditorWrapper.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L14)

___

### \_isOpen

• `Private` **\_isOpen**: `boolean` = `false`

#### Defined in

[src/lib/TextEditorWrapper.ts:15](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L15)
