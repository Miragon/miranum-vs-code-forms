[vs-code-vuetify-jsonschema-builder - v0.1.0](../README.md) / [Exports](../modules.md) / [lib/TextEditor](../modules/lib_TextEditor.md) / TextEditor

# Class: TextEditor

[lib/TextEditor](../modules/lib_TextEditor.md).TextEditor

Class which handles the toggle command registered in the custom text editor.

## Table of contents

### Methods

- [register](lib_TextEditor.TextEditor.md#register)
- [toggle](lib_TextEditor.TextEditor.md#toggle)
- [checkForStdEditor](lib_TextEditor.TextEditor.md#checkforstdeditor)
- [getShowOptions](lib_TextEditor.TextEditor.md#getshowoptions)

### Accessors

- [document](lib_TextEditor.TextEditor.md#document)

### Constructors

- [constructor](lib_TextEditor.TextEditor.md#constructor)

### Properties

- [\_document](lib_TextEditor.TextEditor.md#_document)
- [isAlreadyOpen](lib_TextEditor.TextEditor.md#isalreadyopen)
- [config](lib_TextEditor.TextEditor.md#config)

## Methods

### register

▸ `Static` **register**(): `Disposable`

Get the user settings and subscribe to the `Change-Event` which triggers when the user change these settings.

#### Returns

`Disposable`

#### Defined in

[src-ext/lib/TextEditor.ts:15](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L15)

___

### toggle

▸ `Static` **toggle**(): `void`

Function which is called by the custom text editor to toggle the standard text editor.

#### Returns

`void`

#### Defined in

[src-ext/lib/TextEditor.ts:36](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L36)

___

### checkForStdEditor

▸ `Static` `Private` **checkForStdEditor**(): `boolean`

Checks for open standard text editors with the same data model.

#### Returns

`boolean`

#### Defined in

[src-ext/lib/TextEditor.ts:61](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L61)

___

### getShowOptions

▸ `Static` `Private` **getShowOptions**(): `TextDocumentShowOptions`

Dependent on the user settings returns the right options where the standard text editor should be displayed.

#### Returns

`TextDocumentShowOptions`

#### Defined in

[src-ext/lib/TextEditor.ts:77](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L77)

## Accessors

### document

• `Static` `set` **document**(`document`): `void`

Function which is called by the custom text editor to set the data model of the current active editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `TextDocument` | The data model of the current active custom text editor. |

#### Returns

`void`

#### Defined in

[src-ext/lib/TextEditor.ts:28](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L28)

## Constructors

### constructor

• **new TextEditor**()

## Properties

### \_document

▪ `Static` `Private` **\_document**: `TextDocument`

#### Defined in

[src-ext/lib/TextEditor.ts:8](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L8)

___

### isAlreadyOpen

▪ `Static` `Private` **isAlreadyOpen**: `boolean` = `false`

#### Defined in

[src-ext/lib/TextEditor.ts:9](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L9)

___

### config

▪ `Static` `Private` **config**: `string`

#### Defined in

[src-ext/lib/TextEditor.ts:10](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/d75cf16/src-ext/lib/TextEditor.ts#L10)
