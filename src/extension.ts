import * as vscode from 'vscode';
import { JsonSchemaBuilderProvider } from './jsonSchemaBuilderProvider';
import { JsonSchemaRendererProvider } from "./jsonSchemaRendererProvider";

export function activate(context: vscode.ExtensionContext) {
	// To handle .form files as .json files we add or create a new config in the user settings (global).
	const associations = vscode.workspace.getConfiguration('files').inspect<Object>('associations');
	if (associations?.globalValue) {
		if (!('*.form' in associations.globalValue)) {
			const newAssociation: {[key: string]: any} = associations.globalValue;
			newAssociation['*.form'] = 'json';
			vscode.workspace.getConfiguration('files').update('associations', newAssociation, true);
		}
	} else {
		// If the configuration is not set at all we create it.
		// eslint-disable-next-line @typescript-eslint/naming-convention
		vscode.workspace.getConfiguration('files').update('associations', {'*.form': 'json'}, true);
	}

	// Create webviews
	const renderer = new JsonSchemaRendererProvider(context);
	const builder = new JsonSchemaBuilderProvider(context, renderer);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(JsonSchemaRendererProvider.viewType, renderer));
	context.subscriptions.push(vscode.window.registerCustomEditorProvider(JsonSchemaBuilderProvider.viewType, builder));

	// Register commands
	const command = 'jsonschema-renderer.update';
	const commandHandler = () => {
		renderer.updateRenderer();
	};
	context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}