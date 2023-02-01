[VS Code JsonSchema Builder - v0.3.2](../documentation.md) / [controller/DocumentController](../modules/controller_DocumentController.md) / DocumentController

# Class: DocumentController

[controller/DocumentController](../modules/controller_DocumentController.md).DocumentController

## Implements

- [`IContentController`](../interfaces/lib_types.IContentController.md)<`TextDocument` \| [`Schema`](../modules/utils_types.md#schema)\>

## Table of contents

### Methods

- [getInstance](controller_DocumentController.DocumentController.md#getinstance)
- [subscribe](controller_DocumentController.DocumentController.md#subscribe)
- [setInitialDocument](controller_DocumentController.DocumentController.md#setinitialdocument)
- [updatePreview](controller_DocumentController.DocumentController.md#updatepreview)
- [writeChangesToDocument](controller_DocumentController.DocumentController.md#writechangestodocument)
- [getContentAsSchema](controller_DocumentController.DocumentController.md#getcontentasschema)

### Properties

- [writeData](controller_DocumentController.DocumentController.md#writedata)
- [instance](controller_DocumentController.DocumentController.md#instance)
- [observers](controller_DocumentController.DocumentController.md#observers)
- [\_document](controller_DocumentController.DocumentController.md#_document)

### Accessors

- [content](controller_DocumentController.DocumentController.md#content)
- [document](controller_DocumentController.DocumentController.md#document)

### Constructors

- [constructor](controller_DocumentController.DocumentController.md#constructor)

## Methods

### getInstance

▸ `Static` **getInstance**(): [`DocumentController`](controller_DocumentController.DocumentController.md)

#### Returns

[`DocumentController`](controller_DocumentController.DocumentController.md)

#### Defined in

[src/controller/DocumentController.ts:22](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L22)

___

### subscribe

▸ **subscribe**(...`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...observer` | [`Updatable`](../interfaces/lib_types.Updatable.md)<`TextDocument` \| [`Schema`](../modules/utils_types.md#schema)\>[] |

#### Returns

`void`

#### Implementation of

[IContentController](../interfaces/lib_types.IContentController.md).[subscribe](../interfaces/lib_types.IContentController.md#subscribe)

#### Defined in

[src/controller/DocumentController.ts:29](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L29)

___

### setInitialDocument

▸ **setInitialDocument**(`document`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/controller/DocumentController.ts:78](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L78)

___

### updatePreview

▸ **updatePreview**(): `void`

#### Returns

`void`

#### Defined in

[src/controller/DocumentController.ts:87](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L87)

___

### writeChangesToDocument

▸ **writeChangesToDocument**(`uri`, `content`): `Promise`<`boolean`\>

Apply changes to the document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `Uri` |  |
| `content` | [`Schema`](../modules/utils_types.md#schema) | The data which was sent from the webview |

#### Returns

`Promise`<`boolean`\>

Promise

#### Defined in

[src/controller/DocumentController.ts:109](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L109)

___

### getContentAsSchema

▸ `Private` **getContentAsSchema**(`text`): [`Schema`](../modules/utils_types.md#schema)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`Schema`](../modules/utils_types.md#schema)

#### Defined in

[src/controller/DocumentController.ts:66](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L66)

## Properties

### writeData

• **writeData**: (`uri`: `Uri`, `content`: [`Schema`](../modules/utils_types.md#schema)) => `Promise`<`boolean`\> & { `clear`: () => `void`  } & { `flush`: () => `void`  }

#### Defined in

[src/controller/DocumentController.ts:9](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L9)

___

### instance

▪ `Static` `Private` **instance**: [`DocumentController`](controller_DocumentController.DocumentController.md)

#### Defined in

[src/controller/DocumentController.ts:10](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L10)

___

### observers

• `Private` **observers**: [`Updatable`](../interfaces/lib_types.Updatable.md)<`TextDocument` \| [`Schema`](../modules/utils_types.md#schema)\>[] = `[]`

#### Defined in

[src/controller/DocumentController.ts:11](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L11)

___

### \_document

• `Private` **\_document**: `undefined` \| `TextDocument`

#### Defined in

[src/controller/DocumentController.ts:12](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L12)

## Accessors

### content

• `get` **content**(): [`Schema`](../modules/utils_types.md#schema)

#### Returns

[`Schema`](../modules/utils_types.md#schema)

#### Defined in

[src/controller/DocumentController.ts:33](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L33)

___

### document

• `get` **document**(): `TextDocument`

#### Returns

`TextDocument`

#### Implementation of

[IContentController](../interfaces/lib_types.IContentController.md).[document](../interfaces/lib_types.IContentController.md#document)

#### Defined in

[src/controller/DocumentController.ts:37](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L37)

• `set` **document**(`document`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`void`

#### Implementation of

[IContentController](../interfaces/lib_types.IContentController.md).[document](../interfaces/lib_types.IContentController.md#document)

#### Defined in

[src/controller/DocumentController.ts:45](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L45)

## Constructors

### constructor

• `Private` **new DocumentController**()

#### Defined in

[src/controller/DocumentController.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/861dc0a/src/controller/DocumentController.ts#L14)
