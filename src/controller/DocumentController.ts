import * as vscode from 'vscode';
import {IContentController, Preview, TextEditorWrapper, Updatable} from "../lib";
import {getDefault, Schema} from "../utils";
import {TextDocument, Uri} from "vscode";
import {debounce} from "debounce";

export class DocumentController implements IContentController<TextDocument | Schema> {

    public writeData = debounce(this.writeChangesToDocument)
    private static instance: DocumentController;
    private observers: Updatable<TextDocument | Schema>[] = [];
    private _document: TextDocument | undefined;

    private constructor() {
        vscode.workspace.onDidChangeTextDocument((event) => {
            if (event.document.uri.toString() === this.document.uri.toString() && event.contentChanges.length !== 0) {
                this.updatePreview();
            }
        })
    }

    public static getInstance(): DocumentController {
        if (this.instance === undefined) {
            this.instance = new DocumentController();
        }
        return this.instance;
    }

    public subscribe(...observer: Updatable<TextDocument | Schema>[]): void {
        this.observers = this.observers.concat(observer);
    }

    public get content(): Schema {
        return this.getContentAsSchema(this.document.getText());
    }

    public get document(): TextDocument {
        if (this._document) {
            return this._document;
        } else {
            throw new Error('[Controller] Document is not initialized!');
        }
    }

    public set document(document: TextDocument) {
        this._document = document;
        this.observers.forEach((observer) => {
            try {
                switch (true) {
                    case observer instanceof Preview: {
                        const content = this.getContentAsSchema(this.document.getText());
                        observer.update(content);
                        break;
                    }
                    case observer instanceof TextEditorWrapper: {
                        observer.update(this.document);
                        break;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    private getContentAsSchema(text: string): Schema {
        if (text.trim().length === 0) {
            return JSON.parse('{}');
        }

        try {
            return JSON.parse(text);
        } catch {
            throw new Error('[Controller] Could not parse text!');
        }
    }

    public async setInitialDocument(document: TextDocument) {
        if (!document.getText()) {
            if (await this.writeChangesToDocument(document.uri, getDefault())) {
                document.save();
            }
        }
        this._document = document;
    }

    public updatePreview(): void {
        this.observers.forEach((observer) => {
            try {
                switch (true) {
                    case observer instanceof Preview: {
                        const content = this.getContentAsSchema(this.document.getText());
                        observer.update(content);
                        break;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    /**
     * Apply changes to the document.
     * @param uri
     * @param content The data which was sent from the webview
     * @returns Promise
     */
    public writeChangesToDocument(uri: Uri, content: Schema): Promise<boolean> {
        if (this._document && this.document.uri != uri) {
            return Promise.reject('Inconsistent document!');
        }

        const edit = new vscode.WorkspaceEdit();
        const text = JSON.stringify(content, undefined, 4);

        edit.replace(
            this.document.uri,
            new vscode.Range(0, 0, this.document.lineCount, 0),
            text
        );

        return Promise.resolve(vscode.workspace.applyEdit(edit));
    }
}