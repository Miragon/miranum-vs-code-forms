import {IContentController, Preview, TextEditorWrapper, Updatable} from "../lib";
import {Schema} from "../utils";
import {TextDocument} from "vscode";

export class DocumentController implements IContentController<TextDocument | Schema> {

    private static instance: DocumentController;
    private observers: Updatable<TextDocument | Schema>[] = [];
    private _document: TextDocument | undefined;

    private constructor() {
        // empty constructor
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
}
