import * as vscode from 'vscode';
import {getNonce} from './utils';

/**
 * Provider for a simple JSON-Editor
 * This editor will open on '.form'-Files in VS-Code.
 */
export class JsonSchemaBuilderProvider implements vscode.CustomTextEditorProvider {

    private static readonly viewType = 'jsonschema-builder';
    private isValidJson = true;

    /**
     * Register the CustomTextEditorProvider
     * @param context The context of our extension
     * @returns a disposable which is stored inside context.subscriptions
     */
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new JsonSchemaBuilderProvider(context);
        return vscode.window.registerCustomEditorProvider(JsonSchemaBuilderProvider.viewType, provider);
    }

    constructor(
        private readonly context: vscode.ExtensionContext,
    ) {
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

        let isBuffer = false;
        let isUpdateFromWebview = false;
        let jsonErrorMsg: vscode.Disposable;

        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'src'),
                vscode.Uri.joinPath(this.context.extensionUri, 'dist-vue'),
            ]
        };

        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        // Send the content from the extension to the webview
        function updateWebview(msgType: string) {
            webviewPanel.webview.postMessage({
                type: msgType,
                text: document.getText(),
            });
        }

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
            if (webviewPanel.visible && isBuffer) {
                webviewPanel.webview.postMessage({
                    type: JsonSchemaBuilderProvider.viewType + '.updateFromExtension',
                    text: document.getText(),
                });
                isBuffer = false;
            }
        });

        // Receive message from the webview
        const receivedMessage = webviewPanel.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case JsonSchemaBuilderProvider.viewType + '.updateFromWebview': {
                    isUpdateFromWebview = true;
                    this.setChangesToDocument(document, e.content);
                    if (!this.isValidJson) {
                        jsonErrorMsg.dispose();
                        this.isValidJson = true;
                    }
                    break;
                }
                case JsonSchemaBuilderProvider.viewType + '.noValidJson': {
                    if (this.isValidJson) {
                        jsonErrorMsg = vscode.window.setStatusBarMessage('No valid JSON!');
                        this.isValidJson = false;
                    }
                    break;
                }
            }
        });

        // Make sure we get rid of the listeners when our editor is closed.
        webviewPanel.onDidDispose(() => {
            // Close also every standard text editor with the same document.
            if (vscode.workspace.getConfiguration('jsonSchemaBuilder').get('closeStandardEditor')) {
                for (let tabGroup of vscode.window.tabGroups.all) {
                    for (let tab of tabGroup.tabs) {
                        if (tab.input instanceof vscode.TabInputText &&
                            tab.input.uri.path === document.fileName) {

                            vscode.window.tabGroups.close(tab);
                        }
                    }
                }
            }

            changeViewState.dispose();
            receivedMessage.dispose();
            changeDocumentSubscription.dispose();
        });

        // Initial message which sends the data to the webview
        webviewPanel.webview.postMessage({
            type: 'initial.updateFromExtension',
            viewType: JsonSchemaBuilderProvider.viewType,
            text: document.getText(),
        });

        // Opens the default vscode text-editor besides our own custom text-editor
        if (vscode.workspace.getConfiguration('jsonSchemaBuilder').get('openStandardEditor')) {
            let isAlreadyOpen = false;

            loop1:
                for (let tabGroup of vscode.window.tabGroups.all) {
                    for (let tab of tabGroup.tabs) {
                        if (tab.input instanceof vscode.TabInputText &&
                            tab.input.uri.path === document.fileName) {
                            isAlreadyOpen = true;
                            break loop1;
                        }
                    }
                }

            if (!isAlreadyOpen) {
                vscode.window.showTextDocument(document, vscode.ViewColumn.Beside, true);
            }
        }
    }

    /**
     * Get the HTML-Document which display the webview
     * @param webview Webview belonging to the panel
     * @returns a string which represents the html content
     */
    private getHtmlForWebview(webview: vscode.Webview): string {
        const vueAppUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'dist-vue', 'js/app.js'
        ));

        const vueVendorUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'dist-vue', 'js/chunk-vendors.js'
        ));

        const styleAppUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'dist-vue', 'css/chunk-vendors.css'
        ));

        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'src', 'css/reset.css'
        ));

        const nonce = getNonce();

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />

                <meta http-equiv="Content-Security-Policy" content="default-src 'none';
                    style-src ${webview.cspSource};
                    font-src ${webview.cspSource};
                    img-src ${webview.cspSource};
                    script-src 'nonce-${nonce}';">

                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <link href="${styleResetUri}" rel="stylesheet" />
                <link href="${styleAppUri}" rel="stylesheet" />

                <title>Json Editor</title>
            </head>
            <body>
                <div id="app"></div>
                <script nonce="${nonce}">
                    <!-- Store the VsCodeAPI in a global variable -->
                    const vscode = acquireVsCodeApi();
                </script>
                <script type="text/javascript" src="${vueVendorUri}" nonce="${nonce}"></script>
                <script type="text/javascript" src="${vueAppUri}" nonce="${nonce}"></script>
            </body>
            </html>
        `;
    }

    /**
     * Parse a string to json
     * @param content The string which should be parsed to json
     * @returns an json object
     */
    private getContentAsJson(content: string) {
        const text = content;
        if (text.trim().length === 0) {
            return '{}';
        }

        try {
            return JSON.parse(text);
        } catch {
            this.isValidJson = false;
            throw new Error('Could not get document as json. Content is not valid json');
        }
    }

    /**
     * Saves the changes to the source file
     * @param document The source file
     * @param content The data which was sent from the webview
     * @returns
     */
    private setChangesToDocument(document: vscode.TextDocument, content: string) {
        const edit = new vscode.WorkspaceEdit();
        const text = JSON.stringify(this.getContentAsJson(content), undefined, 4);

        edit.replace(
            document.uri,
            new vscode.Range(0, 0, document.lineCount, 0),
            text
        );

        return vscode.workspace.applyEdit(edit);
    }
}