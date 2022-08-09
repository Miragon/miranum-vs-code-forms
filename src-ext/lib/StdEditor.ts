import * as vscode from "vscode";

export abstract class StdEditor {

    private static _document: vscode.TextDocument;
    private static isAlreadyOpen = false;
    private static config: string;

    public static register(): vscode.Disposable {
        this.config = vscode.workspace.getConfiguration('jsonSchemaBuilder').get<string>('toggleStandardEditor', 'Group');
        return vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('jsonSchemaBuilder.toggleStandardEditor')) {
                this.config = vscode.workspace.getConfiguration('jsonSchemaBuilder').get<string>('toggleStandardEditor', 'Group');
            }
        });
    }

    public static set document(document: vscode.TextDocument) {
        this._document = document;
        this.isAlreadyOpen = this.checkForStdEditor();
    }

    public static toggle(): void {
        if (!this.isAlreadyOpen) {
            // Open the standard text editor
            vscode.window.showTextDocument(this._document, this.getShowOptions());
            this.isAlreadyOpen = true;
        } else {
            // Close the tab with the standard text editor
            for (const tabGroup of vscode.window.tabGroups.all) {
                for (const tab of tabGroup.tabs) {
                    if (tab.input instanceof vscode.TabInputText &&
                        tab.input.uri.path === this._document.fileName) {

                        vscode.window.tabGroups.close(tab).then(() => {
                            this.isAlreadyOpen = false;
                        });
                    }
                }
            }
        }
    }

    private static checkForStdEditor(): boolean {
        for (const tabGroup of vscode.window.tabGroups.all) {
            for (const tab of tabGroup.tabs) {
                if (tab.input instanceof vscode.TabInputText &&
                    tab.input.uri.path === this._document.fileName) {
                    return true;
                }
            }
        }
        return false;
    }

    private static getShowOptions(): vscode.TextDocumentShowOptions {
        switch (this.config) {
            case 'Group': {
                return {
                    preserveFocus: false,
                    preview: true,
                    viewColumn: vscode.ViewColumn.Beside
                };
            }
            case 'Tab': {
                return {
                    preserveFocus: false,
                    preview: false,
                    viewColumn: vscode.ViewColumn.Active
                };
            }
            default: {
                return {};
            }
        }
    }
}
