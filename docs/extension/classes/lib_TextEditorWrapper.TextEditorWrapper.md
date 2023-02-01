[VS Code JsonSchema Builder - v0.3.2](../documentation.md) / [lib/TextEditorWrapper](../modules/lib_TextEditorWrapper.md) / TextEditorWrapper

# Class: TextEditorWrapper

[lib/TextEditorWrapper](../modules/lib_TextEditorWrapper.md).TextEditorWrapper

## Hierarchy

- **`TextEditorWrapper`**

  ↳ [`TextEditorComponent`](components_TextEditorComponent.TextEditorComponent.md)

## Implements

- [`Updatable`](../interfaces/lib_types.Updatable.md)<`TextDocument`\>

## Table of contents

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
- [isOpen](lib_TextEditorWrapper.TextEditorWrapper.md#isopen)

### Accessors

- [textEditor](lib_TextEditorWrapper.TextEditorWrapper.md#texteditor)

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

[src/lib/TextEditorWrapper.ts:37](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L37)

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

[src/lib/TextEditorWrapper.ts:49](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L49)

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

[src/lib/TextEditorWrapper.ts:68](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L68)

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

[src/lib/TextEditorWrapper.ts:88](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L88)

___

### getShowOptions

▸ `Private` **getShowOptions**(): `TextDocumentShowOptions`

#### Returns

`TextDocumentShowOptions`

#### Defined in

[src/lib/TextEditorWrapper.ts:103](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L103)

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

[src/lib/TextEditorWrapper.ts:125](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L125)

## Constructors

### constructor

• `Protected` **new TextEditorWrapper**()

#### Defined in

[src/lib/TextEditorWrapper.ts:17](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L17)

## Properties

### showOption

• `Protected` `Abstract` **showOption**: [`TextEditorShowOption`](../enums/lib_TextEditorWrapper.TextEditorShowOption.md)

#### Defined in

[src/lib/TextEditorWrapper.ts:13](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L13)

___

### \_textEditor

• `Private` **\_textEditor**: `undefined` \| `TextEditor`

#### Defined in

[src/lib/TextEditorWrapper.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L14)

___

### isOpen

• `Private` **isOpen**: `boolean` = `false`

#### Defined in

[src/lib/TextEditorWrapper.ts:15](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L15)

## Accessors

### textEditor

• `Private` `get` **textEditor**(): `TextEditor`

#### Returns

`TextEditor`

#### Defined in

[src/lib/TextEditorWrapper.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L29)
