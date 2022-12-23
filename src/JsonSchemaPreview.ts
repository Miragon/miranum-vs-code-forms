import * as vscode from "vscode";
import {getHtmlForWebview} from "./utils";
import {Schema} from "../types";
import {Preview, WebviewOptions} from "./lib"

export class JsonSchemaPreview extends Preview<Schema> {

    protected readonly viewType = 'jsonschema-renderer';
    protected readonly webviewOptions: WebviewOptions = {
        title: 'JSON Schema Renderer',
        icon: vscode.Uri.joinPath(this.context.extensionUri, 'resources/logo_blau.png'),
        msgType: this.viewType + '.updateFromExtension',
    };
    protected _content: Schema | undefined;
    private _lastViewState = false;

    constructor(
        protected readonly context: vscode.ExtensionContext,
    ) {
        super();
        context.subscriptions.push(vscode.commands.registerCommand(
            this.viewType + '.togglePreview',
            () => {
                super.toggle();
            }))
    }

    public get content(): Schema | undefined {
        return this._content;
    }

    public set content(content: Schema | undefined) {
        this._content = content;
    }

    public get lastViewState(): boolean {
        return this._lastViewState;
    }

    public set lastViewState(viewState: boolean) {
        this._lastViewState = viewState;
    }

    protected getHtml(webview: vscode.Webview, extensionUri: vscode.Uri, content: Schema): string {
        return getHtmlForWebview(webview, extensionUri, content, 'renderer');
    }
}