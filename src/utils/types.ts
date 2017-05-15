export class Types {

    static isObject(value:any){
        return this.is(value, Object);
    }
    static isNull(value:any){
        return value == null;
    }
    static isNaN(value:any){
        return this.isNAN(value) && (value.constructor == Number || value.constructor == Date);
    }
    static isNAN(value){
        try {
            return isNaN(value)
        }catch (e){
            return true;
        }
    }
    static isUndefined(value:any){
        var undefined:any;
        return value === undefined;
    }
    static isTypeOf(value:any, Constructor:any){
        return value.constructor == Constructor;
    }
    static isArray(array:any){
        return this.is(array, Array);
    }
    static isNumber (v:any) {
        return typeof v === 'number';
    }
    static isString(string:any){
        return this.is(string, String);
    }
    static isFunction(func:any){
        return this.is(func, Function);
    }
    static is(value:any, Constructor:any){
        return (this.isNull(value) || this.isNaN(value) || this.isUndefined(value) || !this.isTypeOf(value, Constructor)) ? false : true;
    }
    static isInfinite (v:any) {
        return v === Infinity;
    }
    static isValue (v:any) {
        return (
            !this.isUndefined(v)
            && !this.isNull(v)
            && !(this.isNumber(v) && this.isNaN(v))
            && !this.isInfinite(v)
        );
    }
    static isFloat (v:any) {
        return (
            this.isNumber(v)
            && isFinite(v)
        );
    }
    static isBoolean (v:any) {
        return typeof v === 'boolean';
    }
    static toArray (v:any): Array<any> {
        if (this.isArray(v)) {
            return v;
        }
        else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        }
        else if (!this.isValue(v)) {
            return [];
        }
        else {
            return [v];
        }
    }
    static toString (v:any):string {
        if (this.isString(v)) {
            return v;
        }
        else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        }
        else {
            return this.toString(v.toString());
        }
    }
    static toBoolean (v:any) {
        if (this.isBoolean(v)) {
            return v;
        }
        else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        }
        else {
            return (
                parseFloat(v) > 0
                || this.isInfinite(v)
                || v === '1'
                || v === 'true'
                || v === 'yes'
                || v === '+'
            );
        }
    }
    static toNumber (v:any) {
        if (this.isFloat(v)) {
            return v;
        } else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        } else {
            var pv = parseFloat(v);
            if (this.isFloat(pv)) {
                return pv;
            }
            else if (this.toBoolean(v)) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    static isInteger (v:any) {
        return this.isNumber(v) ? v % 1 === 0 : false;
    }
    static isDate (v:any) {
        return (
            !this.isUndefined(v)
            && !this.isNull(v)
            && v.constructor === Date
            && this.isInteger(v.getTime())
        );
    }
    static isAbsent (v:any) {
        return (
            this.isUndefined(v)
            || this.isNull(v)
            || (this.isNumber(v) && this.isNaN(v))
            || this.isString(v) && v === ''
            || this.isArray(v) && v.length === 0
            || this.isObject(v) && Object.keys(v).length === 0
        );
    }
    static toDate (v:any): Date {
        var date = this.isDate(v) ? v : new Date(v);
        var time = date.getTime();
        var isValid = (
            !this.isAbsent(v)
            && this.isInteger(time)
        );
        return isValid ? date : null;
    }
}

export default Types;