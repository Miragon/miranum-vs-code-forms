import * as vscode from "vscode";

/**
 * Class which handles the toggle command registered in the custom text editor.
 */
export abstract class TextEditor {

    private static _document: vscode.TextDocument;
    private static isAlreadyOpen = false;
    private static config: string;

    /**
     * Get the user settings and subscribe to the `Change-Event` which triggers when the user change these settings.
     */
    public static register(): vscode.Disposable {
        this.config = vscode.workspace.getConfiguration('jsonSchemaBuilder').get<string>('toggleStandardEditor', 'Group');
        return vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('jsonSchemaBuilder.toggleStandardEditor')) {
                this.config = vscode.workspace.getConfiguration('jsonSchemaBuilder').get<string>('toggleStandardEditor', 'Group');
            }
        });
    }

    /**
     * Function which is called by the custom text editor to set the data model of the current active editor.
     * @param document The data model of the current active custom text editor.
     */
    public static set document(document: vscode.TextDocument) {
        this._document = document;
        this.isAlreadyOpen = this.checkForStdEditor();
    }

    /**
     * Function which is called by the custom text editor to toggle the standard text editor.
     */
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

    /**
     * Checks for open standard text editors with the same data model.
     * @private
     */
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

    /**
     * Dependent on the user settings returns the right options where the standard text editor should be displayed.
     * @private
     */
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
