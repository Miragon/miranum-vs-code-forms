import * as vscode from "vscode";
import {Content} from "./types";

export abstract class Preview<ContentType> {

    protected abstract readonly context: vscode.ExtensionContext;
    protected abstract readonly viewType: string;
    protected abstract webviewOptions: WebviewOptions;
    protected abstract content: Content<ContentType>;
    private webviewObject: WebviewObject[] = [];
    private isBuffer = false;
    private _isOpen = false;


    protected abstract getHtml(webview: vscode.Webview, extensionUri: vscode.Uri, content: ContentType): string;

    public get active(): boolean {
        const webviewPanel = this.webviewObject[0].webviewPanel;
        if (webviewPanel) {
            return webviewPanel.active;
        }
        return false;
    }

    public get visible(): boolean {
        const webviewPanel = this.webviewObject[0].webviewPanel;
        if (webviewPanel) {
            return webviewPanel.visible;
        }
        return false;
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    /**
     * Create a new webview panel.
     */
    public create(): void {
        const webviewPanel = vscode.window.createWebviewPanel(
            this.viewType,
            this.webviewOptions.title,
            {
                preserveFocus: true,
                viewColumn: vscode.ViewColumn.Beside
            }
        );
        const disposables: vscode.Disposable[] = []

        webviewPanel.iconPath = this.webviewOptions.icon;
        webviewPanel.webview.options = {enableScripts: true};
        webviewPanel.webview.html = this.getHtml(webviewPanel.webview, this.context.extensionUri, this.content.content);

        webviewPanel.onDidChangeViewState((event) => {
            switch (true) {
                case event.webviewPanel?.visible: {
                    if (this.isBuffer) {
                        this.update();
                        this.isBuffer = false;
                    }
                }
            }
        }, null, disposables);

        webviewPanel.onDidDispose(() => {
            this.dispose();
        }, null, disposables);

        this._isOpen = true;

        // Make sure there will never be more than 2 webview panels inside our array
        while (this.webviewObject.length > 1) {
            const wp = this.webviewObject.pop();
            wp?.webviewPanel.dispose();
        }

        // add the current webview panel on top of our array
        // so our active preview window is always on index 0
        this.webviewObject.unshift({
            webviewPanel,
            disposables
        })
    }

    /**
     * Update the active preview window.
     */
    public update(): boolean {
        const webviewPanel = this.webviewObject[0].webviewPanel;

        if (!webviewPanel) {
            console.log('Webview is not initialized!');
            return false;
        }
        if (!webviewPanel.visible) {
            this.isBuffer = true;
            return false;
        }

        try {
            webviewPanel.webview.postMessage({
                type: this.webviewOptions.msgType,
                text: JSON.parse(JSON.stringify(this.content.content))
            })
            return true;
        } catch (error) {
            throw new Error('Can\'t post message!' + error);
        }
    }

    /**
     * Close the active preview window.
     */
    public close(): void {
        // Trigger onDidDispose-Event
        this.webviewObject[0].webviewPanel.dispose();
    }

    protected toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.create();
        }
    }

    private dispose(): void {
        const wo = this.webviewObject.pop();
        const webviewPanel = wo?.webviewPanel;
        const disposables = wo?.disposables;

        if (webviewPanel) {
            webviewPanel.dispose();
            while (disposables && disposables.length) {
                const item = disposables.pop();
                if (item) {
                    item.dispose();
                }
            }
        }

        this._isOpen = false;
    }

    /*public async close(): Promise<boolean> {
        try {
            const tab = this.getTab();
            const result = await vscode.window.tabGroups.close(tab)
                .then((success) => {
                    this._isOpen = !success;
                    return success;
                });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject('close() -> ' + error);
        }

    }

    private getTab(): vscode.Tab {
        for (const tabGroup of vscode.window.tabGroups.all) {
            for (const tab of tabGroup.tabs) {
                if (tab.input instanceof vscode.TabInputWebview &&
                    tab.input.viewType === 'mainThreadWebview-' + this.viewType) {

                    return tab;
                }
            }
        }
        throw new Error('No tab found!')
    }*/
}

export interface WebviewOptions {
    title: string,
    icon: vscode.Uri | undefined,
    msgType: string
}

interface WebviewObject {
    webviewPanel: vscode.WebviewPanel,
    disposables: vscode.Disposable[]
}