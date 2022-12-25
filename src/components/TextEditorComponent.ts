import {TextEditorShowOption, TextEditorWrapper} from "../lib";
import * as vscode from "vscode";
import {ConfigurationChangeEvent, ExtensionContext} from "vscode";

export class TextEditorComponent extends TextEditorWrapper {

    private static instance: TextEditorComponent;
    protected showOption: TextEditorShowOption = TextEditorShowOption.Tab;

    private constructor() {
        super();
    }

    public static getInstance(): TextEditorComponent {
        if (!this.instance) {
            this.instance = new TextEditorComponent();
        }
        return this.instance;
    }

    public setShowOption(context: ExtensionContext) {
        const config = vscode.workspace.getConfiguration('jsonSchemaBuilder').get<string>('toggleTextEditor', 'Group');
        switch (true) {
            case config === 'Group': {
                this.showOption = TextEditorShowOption.Group;
                break;
            }
            case config === 'Tab': {
                this.showOption = TextEditorShowOption.Tab;
                break;
            }
        }

        // Event when user change the config
        const changeConfig = vscode.workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration('jsonSchemaBuilder.toggleTextEditor')) {
                const config = vscode.workspace.getConfiguration('jsonSchemaBuilder').get<string>('toggleTextEditor', 'Group');
                switch (true) {
                    case config === 'Group': {
                        this.showOption = TextEditorShowOption.Group;
                        break;
                    }
                    case config === 'Tab': {
                        this.showOption = TextEditorShowOption.Tab;
                        break;
                    }
                }
            }
        });

        context.subscriptions.push(changeConfig);
    }
}