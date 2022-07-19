export function getData(event: MessageEvent): [string, boolean] {
    const message = event.data;

    switch (message.type) {
        case 'initial.updateFromExtension':
            return [message.viewType, false];
        case message.viewType + '.updateFromExtension':
            return [message.viewType, false];
        case message.viewType + '.undo':
        case message.viewType + '.redo':
            return [message.viewType, true]
        default: return ['', false]
    }
}
