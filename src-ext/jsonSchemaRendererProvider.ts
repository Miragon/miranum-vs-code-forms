import * as vscode from 'vscode';
import {getHtmlForWebview} from "./lib/utils";

/**
 * The [WebviewView](https://code.visualstudio.com/api/extension-guides/webview) renders the content of the current active
 * custom text editor.
 */
export class JsonSchemaRendererProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'jsonschema-renderer';

    private view?: vscode.WebviewView;
    private state?: JSON;

    constructor(private readonly context: vscode.ExtensionContext) {
        this.context.subscriptions.push(vscode.commands.registerCommand(
            JsonSchemaRendererProvider.viewType + '.update',
            () => {
                this.updateRenderer();
            }
        ));
    }

    /**
     * Called when the WebviewView is opened.
     * @param webviewView A webview based view
     * @param context Additional information the webview view being resolved.
     * @param token A token to request cancellation of a asynchronous or long running operation
     */
    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ): Thenable<void> | void {

        this.view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'localResources'),
                vscode.Uri.joinPath(this.context.extensionUri, 'dist'),
            ]
        };

        webviewView.webview.html = getHtmlForWebview(webviewView.webview, this.context.extensionUri, this.state!, "renderer");

        const changeViewState = webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                webviewView.webview.postMessage({
                    type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
                    text: this.state
                });
            }
        });

        webviewView.onDidDispose(() => {
            changeViewState.dispose();
            delete this.view;
        });
    }

    /**
     * Function which is called by the custom text editor to update the content of the webview view.
     * @param schema The new content for rendering
     */
    public updateRenderer(schema?: JSON): void {
        if (schema && schema !== this.state) {
            // The state of the provider have to change whether a view exists or not.
            // This is because when the user switches from a 'JsonSchema Builder' to another file without a .form extension
            // the Renderer will dispose. If the user focus than a different 'JsonSchema Builder' the Renderer is
            // still disposed, but we set the state and when the Renderer resolves the correct state is used.
            this.state = schema;
        }

        if (!this.view) {
            return;
        }

        this.view.webview.postMessage({
            type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
            text: this.state
        });
    }

    /**
     * Function which is called by the custom text editor to dispose the webview view.
     */
    public dispose() {
        delete this.view;
    }

    /**
     * Function which is called by the custom text editor to get the current view state.
     */
    public isVisible(): boolean {
        if (this.view) {
            return this.view.visible;
        }
        return false;
    }

    /**
     * Function which is called by the custom text editor to set the initial content of the data model.
     */
    public setInitialContent(schema: JSON): void {
        this.state = schema;
    }
}
