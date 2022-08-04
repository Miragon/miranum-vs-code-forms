import * as vscode from 'vscode';
import {getHtmlForWebview} from "./utils";

export class JsonSchemaRendererProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'jsonschema-renderer';

    private webviewView: vscode.WebviewView | undefined;
    private state: JSON | undefined;

    constructor(
        private readonly context: vscode.ExtensionContext,
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ): Thenable<void> | void
    {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'media'),
                vscode.Uri.joinPath(this.context.extensionUri, 'dist-vue'),
            ]
        };

        webviewView.webview.html = getHtmlForWebview(webviewView.webview, this.context);

        webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                webviewView.webview.postMessage({
                    type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
                    text: this.state
                });
            }
        });

        webviewView.webview.postMessage({
            type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
            text: this.state
        });

        this.webviewView = webviewView;
    }

    public updateRenderer(schema?: JSON): void {
        if (schema) {
            this.state = schema;
        }
        this.webviewView?.webview.postMessage({
            type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
            text: this.state
        });
    }
}