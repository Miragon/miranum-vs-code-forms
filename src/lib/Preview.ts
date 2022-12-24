import * as vscode from "vscode";

export abstract class Preview<ContentType> {

    protected abstract readonly extensionUri: vscode.Uri;
    //protected abstract readonly viewType: string;
    protected abstract webviewOptions: WebviewOptions;
    //protected abstract content: Content<ContentType>;
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
    public create(viewType: string, content: ContentType): void {
        const webviewPanel = vscode.window.createWebviewPanel(
            viewType,
            this.webviewOptions.title,
            {
                preserveFocus: true,
                viewColumn: vscode.ViewColumn.Beside
            }
        );
        const disposables: vscode.Disposable[] = []

        webviewPanel.iconPath = this.webviewOptions.icon;
        webviewPanel.webview.options = {enableScripts: true};
        webviewPanel.webview.html = this.getHtml(webviewPanel.webview, this.extensionUri, content);

        webviewPanel.onDidChangeViewState((event) => {
            switch (true) {
                case event.webviewPanel?.visible: {
                    if (this.isBuffer) {
                        this.update(content);
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
    public update(content: ContentType): void {
        try {
            this.webviewObject[0].webviewPanel.webview.postMessage({
                type: this.webviewOptions.msgType,
                text: JSON.parse(JSON.stringify(content))
            });
        } catch (error) {
            this.isBuffer = true;
            throw new Error('[Preview] Can\'t post message!\n' + error);
        }
    }

    /**
     * Close the active preview window.
     */
    public close(): void {
        // Trigger onDidDispose-Event
        this.webviewObject[0].webviewPanel.dispose();
    }

    public toggle(viewType: string, content: ContentType): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.create(viewType, content);
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