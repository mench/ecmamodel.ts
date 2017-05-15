export declare class Types {
    static isObject(value: any): boolean;
    static isNull(value: any): boolean;
    static isNaN(value: any): boolean;
    static isNAN(value: any): boolean;
    static isUndefined(value: any): boolean;
    static isTypeOf(value: any, Constructor: any): boolean;
    static isArray(array: any): boolean;
    static isNumber(v: any): boolean;
    static isString(string: any): boolean;
    static isFunction(func: any): boolean;
    static is(value: any, Constructor: any): boolean;
    static isInfinite(v: any): boolean;
    static isValue(v: any): boolean;
    static isFloat(v: any): boolean;
    static isBoolean(v: any): boolean;
    static toArray(v: any): Array<any>;
    static toString(v: any): string;
    static toBoolean(v: any): any;
    static toNumber(v: any): any;
    static isInteger(v: any): boolean;
    static isDate(v: any): boolean;
    static isAbsent(v: any): boolean;
    static toDate(v: any): Date;
}
export default Types;
