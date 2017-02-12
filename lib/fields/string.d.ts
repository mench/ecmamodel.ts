import { Filed } from './field';
export declare class FiledString extends Filed {
    minLength: Number;
    maxLength: Number;
    lowercase: Boolean;
    uppercase: Boolean;
    trim: Boolean;
    enum: Array<string>;
    match: RegExp;
    set: Function;
    checkRequired(value: any): boolean;
    cast(key: any, value: any, model: any): any;
}
