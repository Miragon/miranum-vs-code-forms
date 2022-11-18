/**
 * This module contains the CustomTextEditorProvider for the `JsonSchema Builder`.
 * It handles the webview and synchronizes the webview with the data model.
 * Furthermore, it registers the {@link JsonSchemaRendererProvider} and {@link TextEditor}.
 * @module JsonSchemaBuilderProvider
 */

import * as vscode from 'vscode';
import {getContentAsJson, getDefault, getHtmlForWebview, getNonce} from './utils/utils';
import {TextEditor} from "./utils/TextEditor";
import {debounce} from "debounce";
import {JsonSchemaRendererProvider} from "./jsonSchemaRendererProvider";

/**
 * The [Custom Text Editor](https://code.visualstudio.com/api/extension-guides/custom-editors) uses a '.form'-File as its
 * data model and synchronize changes with the [webview](https://code.visualstudio.com/api/extension-guides/webview).
 * The webview is build with [Vue.js](https://vuejs.org/) and uses the [DigiWF Form Builder](https://github.com/it-at-m/digiwf-form-builder).
 * The provider also register a [command](https://code.visualstudio.com/api/extension-guides/command) for toggling the
 * standard vscode text editor and a [WebviewView](https://code.visualstudio.com/api/extension-guides/webview)
 * for rendering [Json Schema](https://json-schema.org/).
 */
export class JsonSchemaBuilderProvider implements vscode.CustomTextEditorProvider {

    /** Unique identifier for the custom editor provider. */
    public static readonly viewType = 'jsonschema-builder';

    /** Number of currently open custom text editors with the view type `jsonschema-builder`. */
    private static counter = 0;
    /** Function to apply changes to the data model. */
    private readonly writeData = debounce(this.writeChangesToDocument);
    /** The content of the current active custom text editor. */
    private content: JSON = JSON.parse('{}');
    /** The WebviewView ({@link JsonSchemaRendererProvider}) which renders the content of the active custom text editor. */
    private readonly renderer: JsonSchemaRendererProvider;

    /**
     * Register the standard vscode text editor ({@link TextEditor}) and the WebviewView ({@link JsonSchemaRendererProvider}).
     * @param context The context of the extension
     */
    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        // Register the command for toggling the standard vscode text editor.
        TextEditor.register(this.context);
        this.context.subscriptions.push(vscode.commands.registerCommand(
            JsonSchemaBuilderProvider.viewType + '.toggleTextEditor',
            () => {
                TextEditor.toggle()
            }
        ));

        // Register the WebviewView for rendering Json Schema
        this.renderer = new JsonSchemaRendererProvider(this.context);
        this.context.subscriptions.push(vscode.window.registerWebviewViewProvider(
            JsonSchemaRendererProvider.viewType,
            this.renderer
        ));
    }

    /**
     * Called when a new custom editor is opened.
     * @param document Represents the data model (.form-file)
     * @param webviewPanel The panel which contains the webview
     * @param token A cancellation token that indicates that the result is no longer needed
     */
    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken
    ): Promise<void> {

        let isUpdateFromWebview = false;
        let isBuffer = false;

        this.init(document);

        // Setup webview options
        webviewPanel.webview.options = {
            enableScripts: true,
        };

        // Setup webview html content
        webviewPanel.webview.html = getHtmlForWebview(webviewPanel.webview, this.context.extensionUri, this.content, "builder");

        // Send content from the extension to the webview
        const updateWebview = (msgType: string) => {
            if (webviewPanel.visible) {
                webviewPanel.webview.postMessage({
                    type: msgType,
                    text: this.content,
                })
                    .then((success) => {
                        if (success) {
                            this.renderer.updateRenderer(this.content);
                        }
                    }, (rejected) => {
                        if (!document.isClosed) {
                            console.error('JsonSchema Builder', rejected);
                        }
                    });
            }
        }

        // Receive messages from the webview
        const receivedMessage = webviewPanel.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case JsonSchemaBuilderProvider.viewType + '.updateFromWebview': {
                    isUpdateFromWebview = true;
                    this.renderer.updateRenderer(e.content);
                    this.writeData(document, e.content);
                    break;
                }
            }
        });

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

                if (!e.document.getText()) {
                    // e.g. when user deletes all lines in text editor
                    const key = 'Form_' + getNonce(6).toLowerCase();
                    const schema = JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}');
                    this.content = getContentAsJson(JSON.stringify({key, schema}));
                } else {
                    this.content = getContentAsJson(e.document.getText());
                }

                // If the webview is in the background then no messages can be sent to it.
                // So we have to remember that we need to update its content the next time the webview regain its focus.
                if (!webviewPanel.visible) {
                    isBuffer = true;
                    return;
                }

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
                            updateWebview(JsonSchemaBuilderProvider.viewType + '.updateFromExtension');
                        }
                        isUpdateFromWebview = false;
                        break;
                    }
                }
            }
        });

        // Called when the view state changes (e.g. user switch the tab)
        const changeViewState = webviewPanel.onDidChangeViewState(() => {
            switch (true) {
                case webviewPanel.active: {
                    TextEditor.document = document;

                    if (!document.getText()) {
                        const key = 'Form_' + getNonce(6).toLowerCase();
                        const schema = JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}');
                        this.content = getContentAsJson(JSON.stringify({key, schema}));
                    } else {
                        this.content = getContentAsJson(document.getText());
                    }
                    if (webviewPanel.options.retainContextWhenHidden) {
                        this.renderer.updateRenderer(this.content);
                    }
                    /* falls through */
                }
                case webviewPanel.visible: {
                    // If changes has been made while the webview was not visible no messages could have been sent to the
                    // webview. So we have to update the webview if it gets its focus back.
                    if (isBuffer) {
                        updateWebview(JsonSchemaBuilderProvider.viewType + '.updateFromExtension');
                        isBuffer = false;
                    }
                }
            }
        });

        // CleanUp after Custom Editor was closed.
        webviewPanel.onDidDispose(() => {
            JsonSchemaBuilderProvider.counter--;
            vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);

            changeViewState.dispose();
            receivedMessage.dispose();
            changeDocumentSubscription.dispose();

            TextEditor.close();
            if (JsonSchemaBuilderProvider.counter <= 0) {
                this.renderer.dispose();
            }
        });
    }

    /**
     * Apply changes to the data model.
     * @param document The data model
     * @param content The data which was sent from the webview
     * @returns Thenable
     */
    protected writeChangesToDocument(document: vscode.TextDocument, content: JSON): Thenable<boolean> {
        const edit = new vscode.WorkspaceEdit();
        const text = JSON.stringify(content, undefined, 4);

        edit.replace(
            document.uri,
            new vscode.Range(0, 0, document.lineCount, 0),
            text
        );

        return vscode.workspace.applyEdit(edit)
            .then((success) => {
                if (success) {
                    this.content = getContentAsJson(text);
                }
                return success;
            });
    }

    /** @hidden */
    private init(document: vscode.TextDocument): void {
        // Set the initial content to be sent to the webview
        if (!document.getText()) {
            this.content = getDefault();
            this.writeData(document, this.content);
        } else {
            this.content = getContentAsJson(document.getText());
        }

        // Necessary set up for toggle command
        // only enable the command if a custom editor is open
        JsonSchemaBuilderProvider.counter++;
        vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);
        TextEditor.document = document; // set the document of the active editor

        // Open/Update the JsonSchema-Renderer
        if (this.renderer.isVisible()) {
            this.renderer.updateRenderer(this.content);
        } else {
            this.renderer.setInitialContent(this.content);  // First set the content
            vscode.commands.executeCommand('jsonschema-renderer.focus');  // Then resolve the webview view
        }
    }
}