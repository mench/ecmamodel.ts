import { Exception } from './error';
import { Model } from '../model';
export interface ValidationErrorOptions {
    value?: string;
    kind?: any;
    field?: string;
    model?: Model;
}
export declare class ValidationError extends Exception {
    private value?;
    private kind?;
    private field?;
    private model?;
    constructor(message: string, options?: ValidationErrorOptions);
}
export declare class MinLengthValidationError extends ValidationError {
    constructor(options: any);
}
export declare class MaxLengthValidationError extends ValidationError {
    constructor(options: any);
}
export declare class EnumValidationError extends ValidationError {
    constructor(options: any);
}
export declare class MinNumberValidationError extends ValidationError {
    constructor(options: any);
}
export declare class MaxNumberValidationError extends ValidationError {
    constructor(options: any);
}
export declare class MinDateValidationError extends ValidationError {
    constructor(options: any);
}
export declare class MaxDateValidationError extends ValidationError {
    constructor(options: any);
}
export declare class MatchValidationError extends ValidationError {
    constructor(options: any);
}
export declare class RequiredValidationError extends ValidationError {
    constructor(field: any, value: any, model: any);
}
