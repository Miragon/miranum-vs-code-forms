[Miranum Forms - v0.3.2](../documentation.md) / [DocumentController](../modules/DocumentController.md) / DocumentController

# Class: DocumentController

[DocumentController](../modules/DocumentController.md).DocumentController

## Implements

- [`IContentController`](../interfaces/lib_types.IContentController.md)<`TextDocument` \| [`Schema`](../modules/utils_types.md#schema)\>

## Table of contents

### Methods

- [getInstance](DocumentController.DocumentController.md#getinstance)
- [subscribe](DocumentController.DocumentController.md#subscribe)
- [setInitialDocument](DocumentController.DocumentController.md#setinitialdocument)
- [updatePreview](DocumentController.DocumentController.md#updatepreview)
- [writeChangesToDocument](DocumentController.DocumentController.md#writechangestodocument)
- [getContentAsSchema](DocumentController.DocumentController.md#getcontentasschema)

### Accessors

- [content](DocumentController.DocumentController.md#content)
- [document](DocumentController.DocumentController.md#document)

### Properties

- [instance](DocumentController.DocumentController.md#instance)
- [observers](DocumentController.DocumentController.md#observers)

### Constructors

- [constructor](DocumentController.DocumentController.md#constructor)

## Methods

### getInstance

▸ `Static` **getInstance**(): [`DocumentController`](DocumentController.DocumentController.md)

Get the current instance or create a new one. Ensures that there is always only one instance (Singleton).

#### Returns

[`DocumentController`](DocumentController.DocumentController.md)

#### Defined in

[src/controller/DocumentController.ts:34](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L34)

___

### subscribe

▸ **subscribe**(...`observer`): `void`

Subscribe to get notified when changes are made to the document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...observer` | [`Updatable`](../interfaces/lib_types.Updatable.md)<`TextDocument` \| [`Schema`](../modules/utils_types.md#schema)\>[] | One or more observers which subscribe for notification. |

#### Returns

`void`

#### Implementation of

[IContentController](../interfaces/lib_types.IContentController.md).[subscribe](../interfaces/lib_types.IContentController.md#subscribe)

#### Defined in

[src/controller/DocumentController.ts:45](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L45)

___

### setInitialDocument

▸ **setInitialDocument**(`document`): `Promise`<`void`\>

Set the initial document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `TextDocument` | The initial document. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/controller/DocumentController.ts:113](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L113)

___

### updatePreview

▸ **updatePreview**(): `void`

Only updates the preview and ignores other observers.

#### Returns

`void`

#### Defined in

[src/controller/DocumentController.ts:125](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L125)

___

### writeChangesToDocument

▸ **writeChangesToDocument**(`uri`, `content`): `Promise`<`boolean`\>

Apply changes to the document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `Uri` | The URI of the document that should be updated. |
| `content` | [`Schema`](../modules/utils_types.md#schema) | The data which was sent from the webview. |

#### Returns

`Promise`<`boolean`\>

Promise

#### Defined in

[src/controller/DocumentController.ts:147](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L147)

___

### getContentAsSchema

▸ `Private` **getContentAsSchema**(`text`): [`Schema`](../modules/utils_types.md#schema)

Parses a given string to json.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`Schema`](../modules/utils_types.md#schema)

#### Defined in

[src/controller/DocumentController.ts:97](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L97)

## Accessors

### content

• `get` **content**(): [`Schema`](../modules/utils_types.md#schema)

Get the content of the active document.

#### Returns

[`Schema`](../modules/utils_types.md#schema)

#### Defined in

[src/controller/DocumentController.ts:52](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L52)

___

### document

• `get` **document**(): `TextDocument`

Get the active document.

#### Returns

`TextDocument`

#### Implementation of

[IContentController](../interfaces/lib_types.IContentController.md).[document](../interfaces/lib_types.IContentController.md#document)

#### Defined in

[src/controller/DocumentController.ts:59](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L59)

• `set` **document**(`document`): `void`

Set a new document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `TextDocument` | The new document. |

#### Returns

`void`

#### Implementation of

[IContentController](../interfaces/lib_types.IContentController.md).[document](../interfaces/lib_types.IContentController.md#document)

#### Defined in

[src/controller/DocumentController.ts:71](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L71)

## Properties

### instance

▪ `Static` `Private` **instance**: [`DocumentController`](DocumentController.DocumentController.md)

#### Defined in

[src/controller/DocumentController.ts:17](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L17)

___

### observers

• `Private` **observers**: [`Updatable`](../interfaces/lib_types.Updatable.md)<`TextDocument` \| [`Schema`](../modules/utils_types.md#schema)\>[] = `[]`

Array of all subscribed components.

#### Defined in

[src/controller/DocumentController.ts:19](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L19)

## Constructors

### constructor

• `Private` **new DocumentController**()

#### Defined in

[src/controller/DocumentController.ts:23](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/controller/DocumentController.ts#L23)
