import { Validator } from './validator';
export { Validator };
export declare class MinLengthValidator extends Validator {
    validate(): boolean;
}
export declare class MaxLengthValidator extends Validator {
    validate(): boolean;
}
export declare class EnumValidator extends Validator {
    validate(): boolean;
}
export declare class MatchValidator extends Validator {
    validate(): boolean;
}
export declare class MinNumberValidator extends Validator {
    validate(): boolean;
}
export declare class MaxNumberValidator extends Validator {
    validate(): boolean;
}
export declare class MinDateValidator extends Validator {
    validate(): boolean;
}
export declare class MaxDateValidator extends Validator {
    validate(): boolean;
}
