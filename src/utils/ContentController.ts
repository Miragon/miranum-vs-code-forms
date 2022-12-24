import {IContentController, Updatable} from "../lib";
import {Schema} from "./types";
import {getDefault} from "./Functions";

export class ContentController implements IContentController<Schema> {

    private static instance: ContentController;
    private observers: Updatable<Schema>[] = [];
    private _content: Schema;

    private constructor() {
        this._content = getDefault();
    }

    public static getInstance(): ContentController {
        if (this.instance === undefined) {
            this.instance = new ContentController();
        }
        return this.instance;
    }

    public subscribe(...observer: Updatable<Schema>[]): void {
        this.observers = this.observers.concat(observer);
    }

    public get content(): Schema {
        return this._content;
    }

    public set content(schema: Schema) {
        this._content = schema;
        this.observers.forEach((observer) => {
            try {
                observer.update(this._content);
            } catch (error) {
                console.error(error);
            }
        });
    }
}
