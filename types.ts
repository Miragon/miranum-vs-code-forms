import {Form} from "@muenchen/digiwf-form-renderer";

export type Schema  = {
    key: string
    schema: Form
}

export type VsCode = {
    postMessage(message: VscMessage): void;
    getState(): VscState;
    setState(state: VscState): void;
};

type VscMessage = {
    type: string;
    content: JSON;
}

type VscState = {
    text: string;
    mode: string;
}