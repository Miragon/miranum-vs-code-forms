import * as vscode from 'vscode';
import {getContentAsJson, getDefault, getHtmlForWebview} from './lib/utils';
import {TextEditor} from "./lib/TextEditor";
import {debounce} from "debounce";
import {JsonSchemaRendererProvider} from "./jsonSchemaRendererProvider";

/**
 * Provider for a simple JSON-Editor
 * This editor will open on '.form'-Files in VS-Code.
 */
export class JsonSchemaBuilderProvider implements vscode.CustomTextEditorProvider {

    public static readonly viewType = 'jsonschema-builder';

    private static counter: number;
    private readonly renderer: JsonSchemaRendererProvider;

    private writeData = debounce(this.writeChangesToDocument);

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        this.context.subscriptions.push(TextEditor.register());
        this.context.subscriptions.push(vscode.commands.registerCommand(
            JsonSchemaBuilderProvider.viewType + '.toggleStdEditor',
            () => {
                TextEditor.toggle()
            }
        ));

        this.renderer = new JsonSchemaRendererProvider(this.context);
        this.context.subscriptions.push(vscode.window.registerWebviewViewProvider(
            JsonSchemaRendererProvider.viewType,
            this.renderer
        ));
    }

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

        //const writeData = debounce(this.writeChangesToDocument);
        const text = this.setUp(document);
        let isUpdateFromWebview = false;
        let isBuffer = false;

        // Setup webview options
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'localResources'),
                vscode.Uri.joinPath(this.context.extensionUri, 'dist')
            ]
        };

        // Setup webview html content
        webviewPanel.webview.html = getHtmlForWebview(webviewPanel.webview, this.context, text, "builder");

        // Send content from the extension to the webview
        const updateWebview = (msgType: string) => {
            if (webviewPanel.visible) {
                const content = this.getContent(document);
                webviewPanel.webview.postMessage({
                    type: msgType,
                    text: content,
                })
                    .then((success) => {
                        if (success) {
                            this.renderer.updateRenderer(content);
                        }
                    }, (rejected) => {
                        if (!document.isClosed) {
                            console.log(rejected);
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
                            if (document.getText() === '') {
                                this.writeData(document, JSON.parse('{"key": "MyStartForm", "type": "object", "allOf": []}'));
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
            switch (true) {
                case webviewPanel.visible: {
                    // If changes has been made while the webview was not visible no messages could have been sent to the
                    // webview. So we have to update the webview if it gets its focus back.
                    if (isBuffer) {
                        updateWebview(JsonSchemaBuilderProvider.viewType + '.updateFromExtension');
                        isBuffer = false;
                    } else {
                        this.renderer.updateRenderer(getContentAsJson(document.getText()));  // only needed because of retainContextWhenHidden
                    }
                    /* falls through */
                }
                case webviewPanel.active: {
                    TextEditor.document = document;
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

    private setUp(document: vscode.TextDocument): JSON {
        // Set the initial content to be sent to the webview
        const content = this.getContent(document);

        // Necessary set up for toggle command
        // only enable the command if a custom editor is open
        JsonSchemaBuilderProvider.counter = this.getNumOfCustomEditors();
        vscode.commands.executeCommand('setContext', 'jsonschema-builder.openCustomEditors', JsonSchemaBuilderProvider.counter);
        TextEditor.document = document; // set the document of the active editor

        // Open/Update the JsonSchema-Renderer
        if (this.renderer.isVisible()) {
            this.renderer.updateRenderer(content);
        } else {
            this.renderer.setInitialContent(content);  // First set the content
            vscode.commands.executeCommand('jsonschema-renderer.focus');  // Then resolve the webview view
        }

        return content;
    }

    private getContent(document: vscode.TextDocument): JSON {
        const text = document.getText();
        let content: JSON;
        if (text.length === 0) {
            content = getDefault();
            this.writeData(document, content);  // Todo: How to save file?
        } else {
            content = getContentAsJson(text);
        }
        return content;
    }

    private getNumOfCustomEditors(): number {
        let counter = 0;
        for (const tabGroup of vscode.window.tabGroups.all) {
            for (const tab of tabGroup.tabs) {
                if (tab.input instanceof vscode.TabInputCustom &&
                    tab.input.viewType === 'jsonschema-builder') {

                    counter++;
                }
            }
        }
        return counter;
    }
}
