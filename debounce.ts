
export function createDebounce<T extends ((...args: any[]) => any)>(fn: T, ms: number) {
    let timeouts = new Map();
    return (timeoutID: string | number, ...args: Parameters<T>): void => {
        if (timeouts.has(timeoutID)) {
            //reset the timeout
            const timeout = timeouts.get(timeoutID);
            clearTimeout(timeout.id);
        }
        //create a new timeout
        //and save it in timeouts
        const id = setTimeout(() => {
            timeouts.delete(timeoutID);
            fn(...args);
        }, ms);
        timeouts.set(timeoutID, { id, args });
    }
}
