import * as vscode from "vscode";
import {getHtmlForWebview} from "./utils/utils";
import {Schema} from "../types";

abstract class Preview<ContentType> {

    protected abstract readonly context: vscode.ExtensionContext;
    protected abstract readonly viewType: string;
    protected abstract readonly title: string;
    protected abstract readonly icon: vscode.Uri;
    protected abstract readonly msgType: string;
    protected webviewPanel: vscode.WebviewPanel | undefined;
    protected content: ContentType | undefined;
    protected isOpen = false;
    protected isBuffer = false;
    protected disposables: vscode.Disposable[] = [];

    protected abstract getHtml(webview: vscode.Webview, extensionUri: vscode.Uri, content: ContentType): string;


    public setContent(content: ContentType): void {
        this.content = content;
    }

    public update(schema?: ContentType): boolean {
        if (schema && schema !== this.content) {
            this.content = schema;
        }
        if (!this.webviewPanel) {
            throw new Error('Webview is not initialized!');
        }
        if (!this.webviewPanel.visible) {
            this.isBuffer = true;
            return false;
        }

        try {
            this.webviewPanel.webview.postMessage({
                type: this.msgType,
                text: JSON.parse(JSON.stringify(this.content))
            })
            return true;
        } catch (error) {
            throw new Error('Can\'t post message!' + error);
        }
    }

    public closePreview(): void {
        if (this.isOpen) {
            const tab = this.getTab();
            if (tab) {
                this.close(tab);
            }
        }
    }

    public isVisible(): boolean {
        if (this.webviewPanel) {
            return this.webviewPanel.visible;
        }
        return false;
    }

    protected toggle(): void {
        if (this.isOpen) {
            const tab = this.getTab();
            if (tab) {
                this.close(tab);
            }
        } else {
            this.create();
        }
    }

    private create(): void {
        this.webviewPanel = vscode.window.createWebviewPanel(
            this.viewType,
            this.title,
            {
                preserveFocus: true,
                viewColumn: vscode.ViewColumn.Beside
            }
        );

        this.webviewPanel.iconPath = this.icon;
        this.webviewPanel.webview.options = {enableScripts: true};
        this.webviewPanel.webview.html = this.getHtml(this.webviewPanel.webview, this.context.extensionUri, this.content!);

        this.webviewPanel.onDidChangeViewState((event) => {
            switch (true) {
                case event.webviewPanel?.visible: {
                    if (this.isBuffer) {
                        this.update(this.content);
                        this.isBuffer = false;
                    }
                }
            }
        }, null, this.disposables);

        this.webviewPanel.onDidDispose(() => {
            this.isOpen = false;
            this.dispose();
        }, null, this.disposables);

        this.isOpen = true;
    }

    protected dispose(): void {
        this.webviewPanel?.dispose();
        while (this.disposables.length) {
            const item = this.disposables.pop();
            if (item) {
                item.dispose();
            }
        }
    }

    private close(tab: vscode.Tab): Thenable<boolean> {
        return vscode.window.tabGroups.close(tab)
            .then((success) => {
                if (success) {
                    this.isOpen = false;
                }
                return success;
            });
    }

    private getTab(): vscode.Tab | undefined {
        for (const tabGroup of vscode.window.tabGroups.all) {
            for (const tab of tabGroup.tabs) {
                if (tab.input instanceof vscode.TabInputWebview &&
                    tab.input.viewType === 'mainThreadWebview-' + this.viewType) {

                    return tab;
                }
            }
        }
    }
}

export class JsonSchemaPreview extends Preview<Schema> {

    protected readonly viewType = 'jsonschema-renderer';
    protected readonly title = 'JSON Schema Renderer';
    protected readonly icon = vscode.Uri.joinPath(this.context.extensionUri, 'resources/logo_blau.png');
    protected readonly msgType = this.viewType + '.updateFromExtension';

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

    protected getHtml(webview: vscode.Webview, extensionUri: vscode.Uri, content: Schema): string {
        return getHtmlForWebview(webview, extensionUri, content, 'renderer');
    }
}