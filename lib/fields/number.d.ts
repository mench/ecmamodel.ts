import { Filed } from './field';
export declare class FiledNumber extends Filed {
    static uuid(): number;
    min: Number;
    max: Number;
    checkRequired(value: any): boolean;
    cast(key: any, val: any, model: any): any;
}
