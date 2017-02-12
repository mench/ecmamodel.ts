import { Model } from '../model';
export declare class Validator {
    value: any;
    model: Model;
    field: string;
    kind: any;
    constructor(kind?: any, value?: any, field?: any, model?: any);
    set(options?: {}): this;
    validate(): any;
}
