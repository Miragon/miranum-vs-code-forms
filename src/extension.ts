import * as vscode from 'vscode';
import { JsonSchemaBuilderProvider } from './jsonSchemaBuilderProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(JsonSchemaBuilderProvider.register(context));
}