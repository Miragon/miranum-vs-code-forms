[Miranum Forms - v0.3.2](../documentation.md) / [lib/types](../modules/lib_types.md) / IContentController

# Interface: IContentController<T\>

[lib/types](../modules/lib_types.md).IContentController

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`DocumentController`](../classes/DocumentController.DocumentController.md)

## Table of contents

### Properties

- [document](lib_types.IContentController.md#document)

### Methods

- [subscribe](lib_types.IContentController.md#subscribe)

## Properties

### document

• **document**: `TextDocument`

#### Defined in

[src/lib/types.ts:4](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/types.ts#L4)

## Methods

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`Updatable`](lib_types.Updatable.md)<`T`\> |

#### Returns

`void`

#### Defined in

[src/lib/types.ts:5](https://github.com/FlowSquad/miranum-vs-code-forms/blob/f821aa6/src/lib/types.ts#L5)
