[VS Code JsonSchema Builder - v0.2.0](../documentation.md) / Extension

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

[src-ext/extension.ts:14](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/blob/fc602c3/src-ext/extension.ts#L14)
