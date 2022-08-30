import * as vscode from 'vscode';
import {JsonSchemaBuilderProvider} from './jsonSchemaBuilderProvider';

/**
 * Function called by vscode when the user opens a .form-file and no JsonSchemaBuilderProvider is registered.
 * @param context The context of the extension
 */
export function activate(context: vscode.ExtensionContext) {
    // To handle .form-files as .json-files we add or create a new config in the user settings (global).
    const associations = vscode.workspace.getConfiguration('files').get<{ [k: string]: string }>('associations');
    if (associations) {
        if (!('*.form' in associations)) {
            const newAssociation = associations;
            newAssociation['*.form'] = 'json';
            vscode.workspace.getConfiguration('files').update('associations', newAssociation, true);
        }
    } else {
        // If the configuration is not set at all we create it.
        vscode.workspace.getConfiguration('files').update('associations', {'*.form': 'json'}, true);
    }

    // Create custom text editor
    const builder = new JsonSchemaBuilderProvider(context);
    context.subscriptions.push(vscode.window.registerCustomEditorProvider(
        JsonSchemaBuilderProvider.viewType,
        builder,
        { webviewOptions: { retainContextWhenHidden: true } }
    ));
}