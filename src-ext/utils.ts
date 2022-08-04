import * as vscode from "vscode";

export function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function getDefault(): any {
    return {
        "key": "MyStartForm", "type": "object", "allOf": [{
            "key": "sectionKey1",
            "title": "First Section",
            "type": "object",
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "x-options": {"sectionsTitlesClasses": ["d-none"]},
            "allOf": [{
                "key": "group1",
                "title": "First Group",
                "type": "object",
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "x-options": {"childrenClass": "pl-0"},
                "properties": {
                    "stringProp1": {
                        "fieldType": "text",
                        "title": "I am a text",
                        "type": "string",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-options": {"fieldColProps": {"cols": 12, "sm": 6}},
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-props": {"outlined": true, "dense": true}
                    },
                    "numberProp1": {
                        "fieldType": "integer",
                        "type": "integer",
                        "title": "I am a number",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-options": {"fieldColProps": {"cols": 12, "sm": 6}},
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-props": {"outlined": true, "dense": true}
                    },
                    "textarea1": {
                        "fieldType": "textarea",
                        "type": "string",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-display": "textarea",
                        "title": "I am a textarea",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-props": {"outlined": true, "dense": true}
                    },
                    "booleanprop": {
                        "fieldType": "boolean",
                        "type": "boolean",
                        "title": "I am a checkbox",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-props": {"outlined": true, "dense": true}
                    },
                    "dateprop": {
                        "fieldType": "date",
                        "type": "string",
                        "format": "date",
                        "title": "I am a date",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "x-props": {"outlined": true, "dense": true}
                    }
                }
            }]
        }]
    };
}

/**
 * Parse a string to json
 * @param text The string which should be parsed to json
 * @returns an json object
 */
export function getContentAsJson(text: string): JSON {
    if (text.trim().length === 0) {
        return JSON.parse('{}');
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new Error('Could not get document as json. Content is not valid json');
    }
}

/**
 * Opens the standard vscode text editor besides an existing editor if the config is set.
 * @param document The document associated with this text editor.
 */
export function openStdEditor(document: vscode.TextDocument): void {
    if (vscode.workspace.getConfiguration('jsonSchemaBuilder').get('openStandardEditor')) {
        let isAlreadyOpen = false;

        loop1:
            for (const tabGroup of vscode.window.tabGroups.all) {
                for (const tab of tabGroup.tabs) {
                    if (tab.input instanceof vscode.TabInputText &&
                        tab.input.uri.path === document.fileName) {
                        isAlreadyOpen = true;
                        break loop1;
                    }
                }
            }

        if (!isAlreadyOpen) {
            vscode.window.showTextDocument(document, vscode.ViewColumn.Beside, true);
        }
    }
}

/**
 * Closes all editors with the same document if the config is set.
 * @param document The document associated with this text editor.
 */
export function closeStdEditor(document: vscode.TextDocument): void {
    if (vscode.workspace.getConfiguration('jsonSchemaBuilder').get('closeStandardEditor')) {
        for (const tabGroup of vscode.window.tabGroups.all) {
            for (const tab of tabGroup.tabs) {
                if (tab.input instanceof vscode.TabInputText &&
                    tab.input.uri.path === document.fileName) {

                    vscode.window.tabGroups.close(tab);
                }
            }
        }
    }
}

/**
 * Get the HTML-Document which display the webview
 * @param webview Webview belonging to the panel
 * @param context
 * @returns a string which represents the html content
 */
export function getHtmlForWebview(webview: vscode.Webview, context: vscode.ExtensionContext): string {
    const vueAppUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'dist-vue', 'js', 'app.js'
    ));

    const vueVendorUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'dist-vue', 'js', 'chunk-vendors.js'
    ));

    const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'media', 'css', 'reset.css'
    ));

    const styleAppUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'dist-vue', 'css', 'chunk-vendors.css'
    ));

    const nonce = getNonce();

    //TODO Is there a better way to allow inline styling created by vuetify?

    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />

                <meta http-equiv="Content-Security-Policy" content="default-src 'none';
                    style-src ${webview.cspSource} 'unsafe-inline';
                    font-src ${webview.cspSource};
                    img-src ${webview.cspSource};
                    script-src 'nonce-${nonce}';">

                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                <link href="${styleResetUri}" rel="stylesheet" type="text/css" />
                <link href="${styleAppUri}" rel="stylesheet" type="text/css" />

                <title>Json Schema Builder</title>
            </head>
            <body>
                <div id="app"></div>
                <script nonce="${nonce}">
                    <!-- Store the VsCodeAPI in a global variable -->
                    const vscode = acquireVsCodeApi();
                </script>
                <script type="text/javascript" src="${vueVendorUri}" nonce="${nonce}"></script>
                <script type="text/javascript" src="${vueAppUri}" nonce="${nonce}"></script>
            </body>
            </html>
        `;
}
