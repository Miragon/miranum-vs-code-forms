/**
 * This module contains the CustomTextEditorProvider for the `JsonSchema Builder`.
 * It handles the webview and synchronizes the webview with the data model and a preview.
 * @module JsonSchemaBuilderProvider
 */

import * as vscode from 'vscode';
import {DocumentController} from "./controller";
import {PreviewComponent, TextEditorComponent} from "./components";
import {getDefault, getHtmlForWebview, getNonce, Schema} from './utils';
import {debounce} from "debounce";
import {ViewState} from "./lib";

/**
 * The [Custom Text Editor](https://code.visualstudio.com/api/extension-guides/custom-editors) uses a '.form'-File as its
 * data model and synchronize changes with the [webview](https://code.visualstudio.com/api/extension-guides/webview).
 * The webview is build with [Vue.js](https://vuejs.org/) and uses the
 * [DigiWF Form Builder](https://github.com/FlowSquad/digiwf-core/tree/dev/digiwf-apps/packages/components/digiwf-form-builder).
 * The provider also register a [command](https://code.visualstudio.com/api/extension-guides/command) for toggling the
 * standard vscode text editor and a preview for rendering [Json Schema](https://json-schema.org/).
 */
export class JsonSchemaBuilderProvider implements vscode.CustomTextEditorProvider {

    /** Unique identifier for the custom editor provider. */
    public static readonly viewType = 'jsonschema-builder';

    /** Number of currently open custom text editors with the view type `jsonschema-builder`. */
    private static counter = 0;
    /** Function to apply changes to the data model. */
    private readonly writeData = debounce(this.writeChangesToDocument);
    /** The controller ({@link DocumentController}) managing the document (.form-file). */
    private readonly controller: DocumentController;
    /** The preview ({@link PreviewComponent}) which renders the content of the active custom text editor. */
    private readonly preview: PreviewComponent;
    /** The text editor ({@link TextEditorComponent}) for direct changes inside the document. */
    private readonly textEditor: TextEditorComponent;
    private disposables: vscode.Disposable[] = [];

    /**
     * Register all components and controllers and set up all commands.
     * @param context The context of the extension
     */
    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        // initialize components
        this.textEditor = TextEditorComponent.getInstance();
        this.textEditor.setShowOption(context);
        this.preview = new PreviewComponent(this.context.extensionUri);

        // initialize controller and subscribe the components to it
        this.controller = DocumentController.getInstance();
        this.controller.subscribe(this.preview, this.textEditor);

        // ----- Register commands ---->
        const toggleTextEditor = vscode.commands.registerCommand(
            JsonSchemaBuilderProvider.viewType + '.toggleTextEditor',
            () => {
                this.textEditor.toggle(this.controller.document);
            });
        const togglePreview = vscode.commands.registerCommand(
            PreviewComponent.viewType + '.togglePreview',
            () => {
                this.preview.toggle(PreviewComponent.viewType, this.controller.content);
            });

        this.context.subscriptions.push(togglePreview, toggleTextEditor);
        // <---- Register commands -----
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

        await this.init(document);

        // Disable preview mode
        await vscode.commands.executeCommand('workbench.action.keepEditor');

        // Setup webview options
        webviewPanel.webview.options = {enableScripts: true};

        // Setup webview html content
        webviewPanel.webview.html = getHtmlForWebview(
            webviewPanel.webview, this.context.extensionUri, this.controller.content, "builder"
        );

        // Send content from the extension to the webview
        const updateWebview = (msgType: string) => {
            if (webviewPanel.visible) {
                webviewPanel.webview.postMessage({
                    type: msgType,
                    text: JSON.parse(JSON.stringify(this.controller.content)),
                })
                    .then((success) => {
                        if (success) {
                            //this.renderer.update();
                        }
                    }, (rejected) => {
                        if (!document.isClosed) {
                            console.error('JsonSchema Builder', rejected);
                        }
                    });
            }
        }

        // Receive messages from the webview
        webviewPanel.webview.onDidReceiveMessage(event => {
            switch (event.type) {
                case JsonSchemaBuilderProvider.viewType + '.updateFromWebview': {
                    isUpdateFromWebview = true;
                    this.writeData(document, event.content);
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
            if (e.document.uri.toString() === document.uri.toString() && e.contentChanges.length !== 0 && !isUpdateFromWebview) {

                if (!e.document.getText()) {
                    // e.g. when user deletes all lines in text editor
                    const minimumSchema = {
                        schema: JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}'),
                        key: 'Form_' + getNonce(6).toLowerCase()
                    };
                    this.writeData(document, minimumSchema);
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
                        updateWebview(JsonSchemaBuilderProvider.viewType + '.updateFromExtension');
                        break;
                    }
                }
            }
            isUpdateFromWebview = false;    // reset
        }, null, this.disposables);

        // Called when the view state changes (e.g. user switch the tab)
        webviewPanel.onDidChangeViewState(() => {
            switch (true) {
                /* ------- Panel is active/visible ------- */
                case webviewPanel.active: {
                    this.controller.document = document;
                    if (!this.preview.isOpen && this.preview.lastViewState === ViewState.open) {
                        this.preview.create(PreviewComponent.viewType, this.controller.content);
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
                case !webviewPanel.active: {
                    if (!this.preview.active) {
                        this.preview.close();
                    }
                }
            }
        }, null, this.disposables);

        // CleanUp after Custom Editor was closed.
        webviewPanel.onDidDispose(() => {
            JsonSchemaBuilderProvider.counter--;
            vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);

            this.textEditor.close(document.fileName);
            this.preview.close();

            this.dispose();
            webviewPanel.dispose();
        });
    }

    /**
     * Apply changes to the data model.
     * @param document The data model
     * @param content The data which was sent from the webview
     * @returns Thenable
     */
    private async writeChangesToDocument(document: vscode.TextDocument, content: Schema): Promise<boolean> {
        const edit = new vscode.WorkspaceEdit();
        const text = JSON.stringify(content, undefined, 4);

        edit.replace(
            document.uri,
            new vscode.Range(0, 0, document.lineCount, 0),
            text
        );

        return Promise.resolve(
            vscode.workspace.applyEdit(edit)
                .then((success) => {
                    if (success) {
                        this.controller.updatePreview();
                    }
                    return success;
                })
        );
    }

    /** @hidden */
    private async init(document: vscode.TextDocument): Promise<boolean> {
        // Necessary set up for toggle command
        // only enable the command if a custom editor is open
        JsonSchemaBuilderProvider.counter++;
        vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);

        // set the document
        try {
            if (!document.getText()) {
                if (await this.writeData(document, getDefault())) {
                    document.save()
                }
            }

            this.controller.document = document;

            // if we open a second editor beside one with an open preview window we have to close it and create a new one.
            if (this.preview.isOpen) {
                this.preview.close();
            }
            this.preview.create(PreviewComponent.viewType, this.controller.content);

        } catch (error) {
            return Promise.reject(error);
        }

        return Promise.resolve(true);
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