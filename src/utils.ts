import * as vscode from "vscode";

export function getNonce(): string {
    let text: string = '';
    const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
            for (let tabGroup of vscode.window.tabGroups.all) {
                for (let tab of tabGroup.tabs) {
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
        for (let tabGroup of vscode.window.tabGroups.all) {
            for (let tab of tabGroup.tabs) {
                if (tab.input instanceof vscode.TabInputText &&
                    tab.input.uri.path === document.fileName) {

                    vscode.window.tabGroups.close(tab);
                }
            }
        }
    }
}