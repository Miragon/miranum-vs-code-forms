import * as vscode from 'vscode';
import {getHtmlForWebview} from "./lib/utils";

export class JsonSchemaRendererProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'jsonschema-renderer';

    private view?: vscode.WebviewView;
    private state?: JSON;

    constructor(private readonly context: vscode.ExtensionContext) {
        this.context.subscriptions.push(vscode.commands.registerCommand(
            'jsonschema-renderer.update',
            () => {
                this.updateRenderer();
            }
        ));
    }

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

        webviewView.webview.html = getHtmlForWebview(webviewView.webview, this.context, this.state!, "renderer");

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

    public dispose() {
        delete this.view;
    }

    public isVisible(): boolean {
        if (this.view) {
            return this.view.visible;
        }
        return false;
    }

    public setInitialContent(schema: JSON): void {
        this.state = schema;
    }

    public show(preserveFocus = false): void {
        if (this.view) {
            this.view.show(preserveFocus);
        }
    }

}
