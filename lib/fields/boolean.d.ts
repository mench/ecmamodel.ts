import { Filed } from './field';
export declare class FiledBoolean extends Filed {
    checkRequired(value: any): boolean;
    cast(key: any, value: any, model: any): any;
}
