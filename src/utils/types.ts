import {Form} from "@muenchen/digiwf-form-renderer";
import {TextDocument} from "vscode";

export type Schema  = {
    key: string
    schema: Form
}

export interface IDocumentWrapper {
    document: TextDocument;
}

