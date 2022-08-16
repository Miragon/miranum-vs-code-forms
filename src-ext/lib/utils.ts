import * as vscode from "vscode";
//import {TextDecoder, TextEncoder} from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TextDecoder = require('util').TextDecoder;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TextEncoder = require('util').TextEncoder;

export function getDefault(): JSON {
    return JSON.parse(JSON.stringify({
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
    }));
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

export function generateFontCss(readFileUri: vscode.Uri, writeFileUri: vscode.Uri, fontUriPath: string): Thenable<void> {
    const regex = /[\\|/]fonts/g;
    return vscode.workspace.fs.readFile(readFileUri).then((uint8Array) => {
        const readData = new TextDecoder().decode(uint8Array);
        const writeData = new TextEncoder().encode(readData.replace(regex, fontUriPath));
        return vscode.workspace.fs.writeFile(writeFileUri, writeData);
    }, (err: vscode.FileSystemError) => {
        console.error('Could not read File', '\n', err);
    }).then(() => {
        console.log('File was written successfully.')
    }, (err: vscode.FileSystemError) => {
        console.error('Could not write fonts.css', '\n', err);
    });
}

/**
 * Get the HTML-Document which display the webview
 * @param webview Webview belonging to the panel
 * @param context
 * @returns a string which represents the html content
 */
export function getHtmlForWebview(webview: vscode.Webview, context: vscode.ExtensionContext): string {
    const vueAppUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'dist', 'js', 'app.js'
    ));

    const vueVendorUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'dist', 'js', 'chunk-vendors.js'
    ));

    const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'localResources', 'css', 'reset.css'
    ));

    const styleAppUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'dist', 'css', 'chunk-vendors.css'
    ));

    const styleFontUri = webview.asWebviewUri(vscode.Uri.joinPath(
        context.extensionUri, 'localResources', 'css', 'fonts.css'
    ));

    const nonce = getNonce();

    //TODO
    // Is there a better way to allow inline styling created by vuetify?

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
                <link href="${styleFontUri}" rel="stylesheet" type="text/css" />
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

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}