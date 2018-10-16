export class ResultHelpers {
    public static createReturnJson(statusCode: number, message: string, data: object): object {
        var json = { statusCode: statusCode, message: message, data: data }
        return(json);
    }
}