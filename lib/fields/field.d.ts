import { Validator } from '../validators/validator';
import { ValidationError } from "../errors/validation";
export declare class Filed {
    static OPTION: symbol;
    static uuid(): any;
    type: any;
    default: any;
    required: Boolean;
    set: Function;
    get: Function;
    validators: Array<Function>;
    protected setters: Array<Function>;
    protected verifiers: Array<Validator>;
    customValidators: Array<Function>;
    errors: Array<ValidationError>;
    protected getter: Function;
    constructor(options: any);
    readonly options: any;
    protected setter(fn: Function): void;
    protected verifier(validator: any): void;
    cast(key: any, value: any, model: any): any;
    apply(model: any, key: any, value: any): any;
    protected error(e: any): any;
    checkRequired(value: any): boolean;
    applyDefault(model: any, key: any): Filed;
    uuid(): any;
}
export declare function Option(target: any, key: string): void;
