export type VsCode = {
    postMessage(message: any): void;
    getState(): any;
    setState(state: any): void;
};