import * as vscode from 'vscode';
import {closeStdEditor, getContentAsJson, getDefault, openStdEditor, getHtmlForWebview} from './utils';
import { debounce } from "debounce";
import {JsonSchemaRendererProvider} from "./jsonSchemaRendererProvider";

/**
 * Provider for a simple JSON-Editor
 * This editor will open on '.form'-Files in VS-Code.
 */
export class JsonSchemaBuilderProvider implements vscode.CustomTextEditorProvider {

    public static readonly viewType = 'jsonschema-builder';

    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly renderer: JsonSchemaRendererProvider
    ) { }

    /**
     * Called when the custom editor is opened.
     * @param document Represents the source file (.form)
     * @param webviewPanel The panel which contains the webview
     * @param token A cancellation token that indicates that the result is no longer needed
     */
    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken
    ): Promise<void> {

        const writeData = debounce(this.writeChangesToDocument);
        let isUpdateFromWebview = false;

        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'media'),
                vscode.Uri.joinPath(this.context.extensionUri, 'dist'),
            ]
        };

        webviewPanel.webview.html = getHtmlForWebview(webviewPanel.webview, this.context);

        // Send content from the extension to the webview
        const updateWebview = (msgType: string) => {
            let text = getContentAsJson(document.getText());
            if (Object.keys(text).length === 0) {
                text = getDefault();
            }
            this.renderer.updateRenderer(text);
            webviewPanel.webview.postMessage({
                type: msgType,
                text: text,
            });
        };

        // Receive messages from the webview
        const receivedMessage = webviewPanel.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case JsonSchemaBuilderProvider.viewType + '.updateFromWebview': {
                    isUpdateFromWebview = true;
                    this.renderer.updateRenderer(e.content);
                    writeData(document, e.content);
                    break;
                }
            }
        });

        // Initial message which sends the data to the webview
        let text = getContentAsJson(document.getText());
        if (Object.keys(text).length === 0) {
            text = getDefault();
        }
        webviewPanel.webview.postMessage({
            type: JsonSchemaBuilderProvider.viewType + '.updateFromExtension',
            text: text
        });
        vscode.commands.executeCommand('jsonschema-renderer.focus').then(() => {
            this.renderer.updateRenderer(text);
        });

        // Opens the default vscode text-editor besides our own custom text-editor
        openStdEditor(document);

        /**
         * When changes are made inside the webview a message to the extension will be sent with the new data.
         * This will also change the model (= document). If the model is changed the onDidChangeTextDocument event
         * will trigger and the SAME data would be sent back to the webview.
         * To prevent this we check from where the changes came from (webview or somewhere else).
         * If the changes are made inside the webview (this.isUpdateFromWebview === true) then we will send NO data
         * to the webview. For example if the changes are made inside a separate editor then the data will be sent to
         * the webview to synchronize it with the current content of the model.
         */
        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString() && e.contentChanges.length !== 0) {
                // Update the webviews content.
                switch (e.reason) {
                    case 1: {   // Undo
                        updateWebview(JsonSchemaBuilderProvider.viewType + '.undo');
                        break;
                    }
                    case 2: {   // Redo
                        updateWebview(JsonSchemaBuilderProvider.viewType + '.redo');
                        break;
                    }
                    case undefined: {
                        // If the initial update came from the webview then we don't need to update the webview.
                        if (!isUpdateFromWebview) {
                            if (document.getText() === '') {
                                writeData(document, JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}'));
                            }
                            updateWebview(JsonSchemaBuilderProvider.viewType + '.updateFromExtension');
                        }
                        isUpdateFromWebview = false;
                        break;
                    }
                }
            }
        });

        const changeViewState = webviewPanel.onDidChangeViewState(() => {
            // If changes has been made while the webview was not visible no messages could have been sent to the
            // webview. So we have to update the webview if it gets its focus back.
            if (webviewPanel.visible) {
                updateWebview(JsonSchemaBuilderProvider.viewType + '.updateFromExtension');
            }
        });

        // CleanUp after Custom Editor was closed.
        webviewPanel.onDidDispose(() => {
            closeStdEditor(document);
            changeViewState.dispose();
            receivedMessage.dispose();
            changeDocumentSubscription.dispose();
            vscode.commands.executeCommand('workbench.action.closeAuxiliaryBar');
        });
    }

    /**
     * Saves the changes to the source file
     * @param document The source file
     * @param content The data which was sent from the webview
     * @returns
     */
    protected writeChangesToDocument(document: vscode.TextDocument, content: JSON): Thenable<boolean> {
        const edit = new vscode.WorkspaceEdit();
        const text = JSON.stringify(content, undefined, 4);

        edit.replace(
            document.uri,
            new vscode.Range(0, 0, document.lineCount, 0),
            text
        );

        return vscode.workspace.applyEdit(edit);
    }
}