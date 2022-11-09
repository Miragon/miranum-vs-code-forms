/**
 * This module contains the WebviewViewProvider for the `JsonSchema Renderer`.
 * It provides functions for the `JsonSchema Builder` to update and dispose the WebviewView.
 * @module JsonSchemaRendererProvider
 */

import * as vscode from 'vscode';
import {getHtmlForWebview} from "./lib/utils";

/**
 * The [WebviewView](https://code.visualstudio.com/api/extension-guides/webview) renders the content of the current active
 * custom text editor.
 */
export class JsonSchemaRendererProvider implements vscode.WebviewViewProvider {

    /** Unique identifier for the webview view provider. */
    public static readonly viewType = 'jsonschema-renderer';

    /** The webview which is displayed as a view inside a view container. */
    private view?: vscode.WebviewView;
    /** The current content which is displayed. */
    private content?: JSON;

    /**
     * Register the update-command.ƒ
     * @param context The context of the extension
     */
    constructor(private readonly context: vscode.ExtensionContext) {
        this.context.subscriptions.push(vscode.commands.registerCommand(
            JsonSchemaRendererProvider.viewType + '.update',
            () => {
                this.updateRenderer();
            }
        ));
    }

    /**
     * Called when a new WebviewView is opened.
     * @param webviewView A webview based view
     * @param context Additional information when the webview view is being resolved.
     * @param token A token to request cancellation of an asynchronous or long-running operation
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

        webviewView.webview.html = getHtmlForWebview(webviewView.webview, this.context.extensionUri, this.content!, "renderer");

        const changeViewState = webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                webviewView.webview.postMessage({
                    type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
                    text: this.content
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
        if (schema && schema !== this.content) {
            // The content of the provider have to change whether a view exists or not.
            // This is because when the user switches from a 'JsonSchema Builder' to another file without a .form extension
            // the Renderer will dispose. If the user focus than a different 'JsonSchema Builder' the Renderer is
            // still disposed, but we set the content and when the Renderer resolves the correct content is used.
            this.content = schema;
        }

        if (!this.view) {
            return;
        }

        this.view.webview.postMessage({
            type: JsonSchemaRendererProvider.viewType + '.updateFromExtension',
            text: this.content
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
        this.content = schema;
    }
}
