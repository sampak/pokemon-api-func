export interface IFunctionService<T> {
    processMessageAsync(message: T): {msg: string}
}
