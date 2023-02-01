[VS Code JsonSchema Builder - v0.3.2](../documentation.md) / [components/TextEditorComponent](../modules/components_TextEditorComponent.md) / TextEditorComponent

# Class: TextEditorComponent

[components/TextEditorComponent](../modules/components_TextEditorComponent.md).TextEditorComponent

## Hierarchy

- [`TextEditorWrapper`](lib_TextEditorWrapper.TextEditorWrapper.md)

  ↳ **`TextEditorComponent`**

## Table of contents

### Methods

- [getInstance](components_TextEditorComponent.TextEditorComponent.md#getinstance)
- [setShowOption](components_TextEditorComponent.TextEditorComponent.md#setshowoption)
- [toggle](components_TextEditorComponent.TextEditorComponent.md#toggle)
- [create](components_TextEditorComponent.TextEditorComponent.md#create)
- [close](components_TextEditorComponent.TextEditorComponent.md#close)
- [update](components_TextEditorComponent.TextEditorComponent.md#update)

### Properties

- [showOption](components_TextEditorComponent.TextEditorComponent.md#showoption)
- [instance](components_TextEditorComponent.TextEditorComponent.md#instance)

### Constructors

- [constructor](components_TextEditorComponent.TextEditorComponent.md#constructor)

### Accessors

- [textEditor](components_TextEditorComponent.TextEditorComponent.md#texteditor)

## Methods

### getInstance

▸ `Static` **getInstance**(): [`TextEditorComponent`](components_TextEditorComponent.TextEditorComponent.md)

#### Returns

[`TextEditorComponent`](components_TextEditorComponent.TextEditorComponent.md)

#### Defined in

[src/components/TextEditorComponent.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/TextEditorComponent.ts#L14)

___

### setShowOption

▸ **setShowOption**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExtensionContext` |

#### Returns

`void`

#### Defined in

[src/components/TextEditorComponent.ts:21](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/TextEditorComponent.ts#L21)

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

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[create](lib_TextEditorWrapper.TextEditorWrapper.md#create)

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

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[close](lib_TextEditorWrapper.TextEditorWrapper.md#close)

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

#### Inherited from

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[update](lib_TextEditorWrapper.TextEditorWrapper.md#update)

#### Defined in

[src/lib/TextEditorWrapper.ts:88](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L88)

## Properties

### showOption

• `Protected` **showOption**: [`TextEditorShowOption`](../enums/lib_TextEditorWrapper.TextEditorShowOption.md) = `TextEditorShowOption.Tab`

#### Overrides

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[showOption](lib_TextEditorWrapper.TextEditorWrapper.md#showoption)

#### Defined in

[src/components/TextEditorComponent.ts:8](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/TextEditorComponent.ts#L8)

___

### instance

▪ `Static` `Private` **instance**: [`TextEditorComponent`](components_TextEditorComponent.TextEditorComponent.md)

#### Defined in

[src/components/TextEditorComponent.ts:7](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/TextEditorComponent.ts#L7)

## Constructors

### constructor

• `Private` **new TextEditorComponent**()

#### Overrides

[TextEditorWrapper](lib_TextEditorWrapper.TextEditorWrapper.md).[constructor](lib_TextEditorWrapper.TextEditorWrapper.md#constructor)

#### Defined in

[src/components/TextEditorComponent.ts:10](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/components/TextEditorComponent.ts#L10)

## Accessors

### textEditor

• `Private` `get` **textEditor**(): `TextEditor`

#### Returns

`TextEditor`

#### Inherited from

TextEditorWrapper.textEditor

#### Defined in

[src/lib/TextEditorWrapper.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/lib/TextEditorWrapper.ts#L29)
