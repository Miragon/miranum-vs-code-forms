/**
 * This module contains the CustomTextEditorProvider for the `JsonSchema Builder`.
 * It handles the webview and synchronizes the webview with the data model.
 * Furthermore, it registers the {@link JsonSchemaRendererProvider} and {@link TextEditor}.
 * @module JsonSchemaBuilderProvider
 */

import * as vscode from 'vscode';
import {getContentAsSchema, getDefault, getHtmlForWebview, getNonce} from './utils';
import {TextEditor} from "./lib";
import {JsonSchemaPreview} from "./JsonSchemaPreview";

import {debounce} from "debounce";
import {Schema} from "../types";

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
    private content: Schema = JSON.parse('{}');
    /** The WebviewView ({@link JsonSchemaRendererProvider}) which renders the content of the active custom text editor. */
    private readonly renderer: JsonSchemaPreview;
    private disposables: vscode.Disposable[] = [];

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

        // Register the Webview for rendering Json Schema
        this.renderer = new JsonSchemaPreview(this.context);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        token: vscode.CancellationToken
    ): Promise<void> {

        let isUpdateFromWebview = false;
        let isBuffer = false;

        this.init(document);

        // Setup webview options
        webviewPanel.webview.options = {enableScripts: true};

        // Setup webview html content
        webviewPanel.webview.html = getHtmlForWebview(webviewPanel.webview, this.context.extensionUri, this.content, "builder");

        // Send content from the extension to the webview
        const updateWebview = (msgType: string) => {
            if (webviewPanel.visible) {
                webviewPanel.webview.postMessage({
                    type: msgType,
                    text: JSON.parse(JSON.stringify(this.content)),
                })
                    .then((success) => {
                        if (success) {
                            this.renderer.update(this.content);
                        }
                    }, (rejected) => {
                        if (!document.isClosed) {
                            console.error('JsonSchema Builder', rejected);
                        }
                    });
            }
        }

        // Receive messages from the webview
        webviewPanel.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case JsonSchemaBuilderProvider.viewType + '.updateFromWebview': {
                    isUpdateFromWebview = true;
                    this.renderer.update(e.content);
                    this.writeData(document, e.content);
                    break;
                }
            }
        }, null, this.disposables);

        /**
         * When changes are made inside the webview a message to the extension will be sent with the new data.
         * This will also change the model (= document). If the model is changed the onDidChangeTextDocument event
         * will trigger and the SAME data would be sent back to the webview.
         * To prevent this we check from where the changes came from (webview or somewhere else).
         * If the changes are made inside the webview (this.isUpdateFromWebview === true) then we will send NO data
         * to the webview. For example if the changes are made inside a separate editor then the data will be sent to
         * the webview to synchronize it with the current content of the model.
         */
        vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString() && e.contentChanges.length !== 0) {

                if (!e.document.getText()) {
                    // e.g. when user deletes all lines in text editor
                    this.content = {
                        key: 'Form_' + getNonce(6).toLowerCase(),
                        schema: JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}')
                    };
                    this.writeData(document, this.content);
                } else {
                    this.content = getContentAsSchema(e.document.getText());
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
        }, null, this.disposables);

        // Called when the view state changes (e.g. user switch the tab)
        webviewPanel.onDidChangeViewState(() => {
            switch (true) {
                /* ------- Panel is active/visible ------- */
                case webviewPanel.active: {
                    TextEditor.document = document;

                    this.content = getContentAsSchema(document.getText());
                    if (!this.renderer.isOpen && this.renderer.lastViewState) {
                        // Only execute when the preview is currently closed
                        this.renderer.content = this.content;
                        this.renderer.create();
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
                    break;
                }
                /* ------- Panel is NOT active/visible ------- */
                case (!webviewPanel.active && !this.renderer.active): {
                    this.renderer.lastViewState = this.renderer.isOpen;
                    this.renderer.close();
                }
            }
        }, null, this.disposables);

        // CleanUp after Custom Editor was closed.
        webviewPanel.onDidDispose(() => {
            JsonSchemaBuilderProvider.counter--;
            vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);

            TextEditor.close();
            this.renderer.close();

            this.dispose();
            webviewPanel.dispose();
        });

        //await vscode.commands.executeCommand('workbench.action.keepEditor'); // disable preview mode
    }

    /**
     * Apply changes to the data model.
     * @param document The data model
     * @param content The data which was sent from the webview
     * @param save Boolean to save the changes or not
     * @returns Thenable
     */
    protected writeChangesToDocument(document: vscode.TextDocument, content: Schema, save = false): Thenable<boolean> {
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
                    this.content = getContentAsSchema(text);
                    if (save) {
                        document.save();
                    }
                }
                return success;
            });
    }

    /** @hidden */
    private init(document: vscode.TextDocument): void {
        // Set the initial content to be sent to the webview
        if (!document.getText()) {
            this.content = getDefault();
            this.writeData(document, this.content, true)
        } else {
            this.content = getContentAsSchema(document.getText());
        }

        // Necessary set up for toggle command
        // only enable the command if a custom editor is open
        JsonSchemaBuilderProvider.counter++;
        vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);

        // Set content for our text editor and preview
        TextEditor.document = document;
        this.renderer.content = this.content;
        if (this.renderer.isOpen) {
            // if we open a second editor beside one with an open preview window we have to close it
            // and create a new one.
            this.renderer.close();
            this.renderer.create();
        }

        // Open/Update the JsonSchema-Renderer
        //this.renderer.update(this.content)
        /*if (this.renderer.visible) {
            this.renderer.update(this.content);
        } else {
            this.renderer.content = this.content;  // First set the content
            //vscode.commands.executeCommand('jsonschema-renderer.focus');  // Then resolve the webview view
        }*/
    }

    private dispose(): void {
        while (this.disposables.length) {
            const item = this.disposables.pop();
            if (item) {
                item.dispose();
            }
        }
    }
}