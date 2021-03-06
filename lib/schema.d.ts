import { FiledBoolean } from './fields';
export declare class Schema {
    fields: Map<string, any>;
    static createField(options?: any): FiledBoolean;
    constructor(parentFields?: Map<string, any>);
    set(key: string, options: any): this;
    field(key: string): any;
    readonly props: Array<string>;
}
