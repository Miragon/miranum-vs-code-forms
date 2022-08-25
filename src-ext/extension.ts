import * as vscode from 'vscode';
import {JsonSchemaBuilderProvider} from './jsonSchemaBuilderProvider';

export function activate(context: vscode.ExtensionContext) {
    // To handle .form files as .json files we add or create a new config in the user settings (global).
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

    // Create webviews
    const builder = new JsonSchemaBuilderProvider(context);
    context.subscriptions.push(vscode.window.registerCustomEditorProvider(
        JsonSchemaBuilderProvider.viewType,
        builder,
        { webviewOptions: { retainContextWhenHidden: true } }
    ));
}

/*function getNumOfCustomEditors(viewType: string): number {
    let counter = 0;
    for (const tabGroup of vscode.window.tabGroups.all) {
        for (const tab of tabGroup.tabs) {
            if (tab.input instanceof vscode.TabInputCustom &&
                tab.input.viewType === viewType) {

                counter++;
            }
        }
    }
    return counter;
}*/
