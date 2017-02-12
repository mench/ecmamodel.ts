import {Exception} from './error';
import {Model} from  '../model';

export interface ValidationErrorOptions {
    value?:string,
    kind?:any,
    field?:string,
    model?:Model
}

export class ValidationError extends Exception {
    private value?:string;
    private kind?:any;
    private field?:string;
    private model?:Model;

    constructor(message:string,options:ValidationErrorOptions = {}) {
        super(message || `${options.field} is invalid`);
        for (let i in options){
            this[i] = options[i];
        }
    }
}
export class MinLengthValidationError extends ValidationError{
    constructor(options){
        super(
            `${options.value} is shorter than the minimum allowed length ${options.kind}.`,
            options
        );
    }
}
export class MaxLengthValidationError extends ValidationError{
    constructor(options){
        super(
            `${options.value} is longer than the maximum allowed length (${options.kind}).`,
            options
        );
    }
}
export class EnumValidationError extends ValidationError {
    constructor(options){
        super(
            `${options.value} is not a valid enum value for field ${options.field}.`,
            options
        );
    }
}
export class MinNumberValidationError extends ValidationError {
    constructor(options){
        super(
            `${options.value} is less than minimum allowed value (${options.kind}).`,
            options
        );
    }
}
export class MaxNumberValidationError extends ValidationError {
    constructor(options){
        super(
            `${options.value} is more than maximum allowed value (${options.kind}).`,
            options
        );
    }
}
export class MinDateValidationError extends ValidationError {
    constructor(options){
        super(
            `${options.value} is before minimum allowed value (${options.kind}).`,
            options
        );
    }
}
export class MaxDateValidationError extends ValidationError {
    constructor(options){
        super(
            `${options.value} is after maximum allowed value (${options.kind}).`,
            options
        );
    }
}
export class MatchValidationError extends ValidationError {
    constructor(options){
        super(
            `${options.field} is invalid`,
            options
        );
    }
}
export class RequiredValidationError extends ValidationError{
    constructor(field,value,model){
        super(
            `${field} is required`,
            {
                field:field,
                value:value,
                model:model
            }
        );
    }
}