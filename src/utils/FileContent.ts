import {Content} from "../lib";
import {Schema} from "./types";
import {getDefault} from "./Functions";

export class FileContent implements Content<Schema> {

    private static instance: FileContent;
    private _content: Schema;

    private constructor() {
        this._content = getDefault();
    }

    public static getInstance(): FileContent {
        if (this.instance === undefined) {
            this.instance = new FileContent();
        }
        return this.instance;
    }

    public get content(): Schema {
        return this._content;
    }

    public set content(schema: Schema) {
        this._content = schema;
    }
}
