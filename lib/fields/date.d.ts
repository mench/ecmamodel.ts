import { Filed } from './field';
export declare class FiledDate extends Filed {
    min: Date;
    max: Date;
    checkRequired(value: any): boolean;
    cast(key: any, value: any, model: any): any;
}
