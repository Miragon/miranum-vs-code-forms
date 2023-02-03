[Miranum Forms - v0.3.2](../documentation.md) / [TextEditorComponent](../modules/TextEditorComponent.md) / TextEditorComponent

# Class: TextEditorComponent

[TextEditorComponent](../modules/TextEditorComponent.md).TextEditorComponent

## Hierarchy

- [`TextEditorWrapper`](lib_TextEditorWrapper.TextEditorWrapper.md)

  ↳ **`TextEditorComponent`**

## Table of contents

### Methods

- [getInstance](TextEditorComponent.TextEditorComponent.md#getinstance)
- [setShowOption](TextEditorComponent.TextEditorComponent.md#setshowoption)
- [toggle](TextEditorComponent.TextEditorComponent.md#toggle)
- [create](TextEditorComponent.TextEditorComponent.md#create)
- [close](TextEditorComponent.TextEditorComponent.md#close)
- [update](TextEditorComponent.TextEditorComponent.md#update)

### Accessors

- [isOpen](TextEditorComponent.TextEditorComponent.md#isopen)
- [textEditor](TextEditorComponent.TextEditorComponent.md#texteditor)

### Properties

- [showOption](TextEditorComponent.TextEditorComponent.md#showoption)
- [instance](TextEditorComponent.TextEditorComponent.md#instance)

### Constructors

- [constructor](TextEditorComponent.TextEditorComponent.md#constructor)

## Methods

### getInstance

▸ `Static` **getInstance**(): [`TextEditorComponent`](TextEditorComponent.TextEditorComponent.md)

Get the current instance or create a new one. Ensures that there is always only one instance (Singleton).

#### Returns

[`TextEditorComponent`](TextEditorComponent.TextEditorComponent.md)

#### Defined in

[src/components/TextEditorComponent.ts:24](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/TextEditorComponent.ts#L24)

___

### setShowOption

▸ **setShowOption**(`context`): `void`

Sets the [showOption](TextEditorComponent.TextEditorComponent.md#showoption) according to the settings and register an event if the settings changes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExtensionContext` |

#### Returns

`void`

#### Defined in

[src/components/TextEditorComponent.ts:35](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/TextEditorComponent.ts#L35)

___

### toggle

▸ **toggle**(`document`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`void`

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[toggle](lib_TextEditorWrapper.TextEditorWrapper.md#toggle)

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

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[create](lib_TextEditorWrapper.TextEditorWrapper.md#create)

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

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[close](lib_TextEditorWrapper.TextEditorWrapper.md#close)

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

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[update](lib_TextEditorWrapper.TextEditorWrapper.md#update)

#### Defined in

[src/lib/TextEditorWrapper.ts:92](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L92)

## Accessors

### isOpen

• `get` **isOpen**(): `boolean`

#### Returns

`boolean`

#### Inherited from

TextEditorWrapper.isOpen

#### Defined in

[src/lib/TextEditorWrapper.ts:17](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L17)

___

### textEditor

• `Private` `get` **textEditor**(): `TextEditor`

#### Returns

`TextEditor`

#### Inherited from

TextEditorWrapper.textEditor

#### Defined in

[src/lib/TextEditorWrapper.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/TextEditorWrapper.ts#L33)

## Properties

### showOption

• `Protected` **showOption**: [`TextEditorShowOption`](../enums/lib_TextEditorWrapper.TextEditorShowOption.md) = `TextEditorShowOption.Tab`

The default option how the text editor will be displayed.

#### Overrides

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[showOption](lib_TextEditorWrapper.TextEditorWrapper.md#showoption)

#### Defined in

[src/components/TextEditorComponent.ts:15](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/TextEditorComponent.ts#L15)

___

### instance

▪ `Static` `Private` **instance**: [`TextEditorComponent`](TextEditorComponent.TextEditorComponent.md)

#### Defined in

[src/components/TextEditorComponent.ts:13](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/TextEditorComponent.ts#L13)

## Constructors

### constructor

• `Private` **new TextEditorComponent**()

#### Overrides

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[constructor](lib_TextEditorWrapper.TextEditorWrapper.md#constructor)

#### Defined in

[src/components/TextEditorComponent.ts:17](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/components/TextEditorComponent.ts#L17)
