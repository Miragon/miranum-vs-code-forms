import * as vscode from "vscode";
import {getHtmlForWebview, Schema} from "../utils";
import {Preview, WebviewOptions} from "../lib"

export class PreviewComponent extends Preview<Schema> {

    public static readonly viewType = 'jsonschema-renderer';
    protected readonly webviewOptions: WebviewOptions = {
        title: 'JSON Schema Renderer',
        icon: vscode.Uri.joinPath(this.extensionUri, 'resources/logo_blau.png'),
        msgType: PreviewComponent.viewType + '.updateFromExtension',
    };
    private _lastViewState = false;

    constructor(protected readonly extensionUri: vscode.Uri) {
        super();
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