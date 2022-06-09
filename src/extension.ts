import * as vscode from 'vscode';
import { JsonSchemaBuilderProvider } from './jsonSchemaBuilderProvider';

export function activate(context: vscode.ExtensionContext) {

	// To handle .form files as .json files we add or create a new config.
	const languages = vscode.workspace.getConfiguration('files').inspect<Object>('associations');
	if (languages?.workspaceValue) {
		if (!('*.form' in languages.workspaceValue)) {
			const newAssociation: {[key: string]: any} = languages.workspaceValue;
			newAssociation['*.form'] = 'json';
			vscode.workspace.getConfiguration('files').update('associations', newAssociation);
		}
	} else {
		// If the configuration is not set at all we create it.
		vscode.workspace.getConfiguration('files').update('associations', {"*.form": "json"});
	}

	context.subscriptions.push(JsonSchemaBuilderProvider.register(context));
}