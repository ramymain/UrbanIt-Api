import { ValidationError } from "class-validator";
import { StringHelpers } from './String.helpers'

export class ResultHelpers {
    public static createReturnJson(statusCode: number, message: string, data: object): object {
        var json = { statusCode: statusCode, message: message, data: data }
        return(json);
    }

    public static createErrorsValidate(errors: ValidationError[]){
        var errorsJson = JSON.parse("{}");
        errors.forEach(function(element){
            Object.keys(element.constraints).forEach(function(key){
                if (StringHelpers.isNullOrWhitespace(errorsJson[element.property])){
                    errorsJson[element.property] = element.constraints[key];
                }
            })
        })
        return errorsJson;
    }
}