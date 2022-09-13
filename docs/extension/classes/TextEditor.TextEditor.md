[VS Code JsonSchema Builder - v0.2.0](../documentation.md) / [TextEditor](../modules/TextEditor.md) / TextEditor

# Class: TextEditor

[TextEditor](../modules/TextEditor.md).TextEditor

Class which handles the standard vscode text editor.

## Table of contents

### Methods

- [register](TextEditor.TextEditor.md#register)
- [toggle](TextEditor.TextEditor.md#toggle)
- [close](TextEditor.TextEditor.md#close)
- [getTab](TextEditor.TextEditor.md#gettab)
- [closeTextEditor](TextEditor.TextEditor.md#closetexteditor)
- [openTextEditor](TextEditor.TextEditor.md#opentexteditor)
- [getShowOptions](TextEditor.TextEditor.md#getshowoptions)

### Accessors

- [document](TextEditor.TextEditor.md#document)

### Constructors

- [constructor](TextEditor.TextEditor.md#constructor)

### Properties

- [\_document](TextEditor.TextEditor.md#_document)
- [isOpen](TextEditor.TextEditor.md#isopen)
- [config](TextEditor.TextEditor.md#config)

## Methods

### register

▸ `Static` **register**(`context`): `void`

Register ConfigChange-Event and CloseTab-Event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExtensionContext` |

#### Returns

`void`

#### Defined in

[src-ext/lib/TextEditor.ts:24](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L24)

___

### toggle

▸ `Static` **toggle**(): `void`

Function which is called by the custom text editor to toggle the standard text editor.

#### Returns

`void`

#### Defined in

[src-ext/lib/TextEditor.ts:75](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L75)

___

### close

▸ `Static` **close**(): `void`

Close text editor when the corresponding builder is closed.

#### Returns

`void`

#### Defined in

[src-ext/lib/TextEditor.ts:89](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L89)

___

### getTab

▸ `Static` `Private` **getTab**(): `undefined` \| `Tab`

Get the tab with the correct text editor.

#### Returns

`undefined` \| `Tab`

#### Defined in

[src-ext/lib/TextEditor.ts:102](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L102)

___

### closeTextEditor

▸ `Static` `Private` **closeTextEditor**(`tab`): `Thenable`<`boolean`\>

Close the current text editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tab` | `Tab` | The tab in which the text editor is displayed |

#### Returns

`Thenable`<`boolean`\>

#### Defined in

[src-ext/lib/TextEditor.ts:119](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L119)

___

### openTextEditor

▸ `Static` `Private` **openTextEditor**(`document`): `Thenable`<`TextEditor`\>

Open a new text editor with the current document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `TextDocument` |

#### Returns

`Thenable`<`TextEditor`\>

#### Defined in

[src-ext/lib/TextEditor.ts:133](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L133)

___

### getShowOptions

▸ `Static` `Private` **getShowOptions**(): `TextDocumentShowOptions`

Dependent on the user settings returns the right options where the standard text editor should be displayed.

#### Returns

`TextDocumentShowOptions`

#### Defined in

[src-ext/lib/TextEditor.ts:145](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L145)

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

[src-ext/lib/TextEditor.ts:51](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L51)

## Constructors

### constructor

• **new TextEditor**()

## Properties

### \_document

▪ `Static` `Private` **\_document**: `TextDocument`

The document associated with this text editor.

#### Defined in

[src-ext/lib/TextEditor.ts:15](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L15)

___

### isOpen

▪ `Static` `Private` **isOpen**: `boolean` = `false`

Boolean if set to `true` means that a text editor is already open.

#### Defined in

[src-ext/lib/TextEditor.ts:17](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L17)

___

### config

▪ `Static` `Private` **config**: `string`

The current configuration.

#### Defined in

[src-ext/lib/TextEditor.ts:19](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/2277f08/src-ext/lib/TextEditor.ts#L19)
