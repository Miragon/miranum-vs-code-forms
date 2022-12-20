[VS Code JsonSchema Builder - v0.3.1](../documentation.md) / Extension

# Module: Extension

This module contains the activate-Function which is called when the user opens a `.form`-File.

## Table of contents

### Functions

- [activate](Extension.md#activate)

## Functions

### activate

▸ **activate**(`context`): `void`

Function called by vscode when the user opens a .form-file and no JsonSchemaBuilderProvider is registered.
It registers a [Custom Text Editor](https://code.visualstudio.com/api/extension-guides/custom-editors).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExtensionContext` | The context of the extension |

#### Returns

`void`

#### Defined in

[src/extension.ts:14](https://github.com/FlowSquad/miranum-vs-code-forms/blob/45ce17f/src/extension.ts#L14)
