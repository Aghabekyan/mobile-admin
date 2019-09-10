interface IResponse<T> {
    success: boolean;
    data: T;
    message: string;
    error: { displayMessage: string, internalMessage: string };
}
