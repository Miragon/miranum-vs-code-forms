import * as vscode from 'vscode';
import { JsonSchemaBuilderProvider } from './jsonSchemaBuilderProvider';

export function activate(context: vscode.ExtensionContext) {

	// Todo: Make sure the .vscode/settings.json file exist with the files.associations entry.
	// To use the json highlighting for .form files we update the workspace settings
	// This only works when a workspace exists with the .vscode/settings.json file and
	// the file contains the files.associations config.
	const languages = vscode.workspace.getConfiguration('files').inspect<Object>('associations');
	if (languages?.workspaceValue && !('*.form' in languages.workspaceValue)) {
		const newAssociation: {[key: string]: any} = languages.workspaceValue;
		newAssociation['*.form'] = 'json';
		vscode.workspace.getConfiguration('files').update('associations', newAssociation);
	}

	context.subscriptions.push(JsonSchemaBuilderProvider.register(context));
}