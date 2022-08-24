import * as vscode from 'vscode';
import {getHtmlForWebview} from "./lib/utils";

export class JsonSchemaRendererProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'jsonschema-renderer';

    private view?: vscode.WebviewView;
    private state?: JSON;

    constructor(private readonly context: vscode.ExtensionContext) {
        this.context.subscriptions.push(vscode.commands.registerCommand(
            'jsonschema-renderer.update',
            () => { this.updateRenderer(); }
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
        if (!this.view) {
            console.error('(JsonSchema Renderer) Webview is undefined!');
            return;
        }

        switch (true) {
            case schema === undefined: {
                // A simple update with the current state
                this.view.webview.postMessage({
                    type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
                    text: this.state
                });
                break;
            }
            case schema !== this.state: {
                // Set new state and update webview
                this.state = schema;
                this.view.webview.postMessage({
                    type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
                    text: this.state
                });
                break;
            }
        }
    }

    public setInitialContent(schema: JSON): void {
        this.state = schema;
    }

    public show(preserveFocus = false): void {
        if (this.view) {
            this.view.show(preserveFocus);
        }
    }

    public isVisible(): boolean {
        if (this.view) {
            return this.view.visible;
        }
        return false;
    }
}
