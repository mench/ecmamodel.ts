"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types = (function () {
    function Types() {
    }
    Types.isObject = function (value) {
        return this.is(value, Object);
    };
    Types.isNull = function (value) {
        return value == null;
    };
    Types.isNaN = function (value) {
        return isNaN(value) && (value.constructor == Number || value.constructor == Date);
    };
    Types.isUndefined = function (value) {
        var undefined;
        return value === undefined;
    };
    Types.isTypeOf = function (value, Constructor) {
        return value.constructor == Constructor;
    };
    Types.isArray = function (array) {
        return this.is(array, Array);
    };
    Types.isNumber = function (v) {
        return typeof v === 'number';
    };
    Types.isString = function (string) {
        return this.is(string, String);
    };
    Types.isFunction = function (func) {
        return this.is(func, Function);
    };
    Types.is = function (value, Constructor) {
        return (this.isNull(value) || this.isNaN(value) || this.isUndefined(value) || !this.isTypeOf(value, Constructor)) ? false : true;
    };
    Types.isInfinite = function (v) {
        return v === Infinity;
    };
    Types.isValue = function (v) {
        return (!this.isUndefined(v)
            && !this.isNull(v)
            && !(this.isNumber(v) && this.isNaN(v))
            && !this.isInfinite(v));
    };
    Types.isFloat = function (v) {
        return (this.isNumber(v)
            && isFinite(v));
    };
    Types.isBoolean = function (v) {
        return typeof v === 'boolean';
    };
    Types.toArray = function (v) {
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
    };
    Types.toString = function (v) {
        if (this.isString(v)) {
            return v;
        }
        else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        }
        else {
            return this.toString(v.toString());
        }
    };
    Types.toBoolean = function (v) {
        if (this.isBoolean(v)) {
            return v;
        }
        else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        }
        else {
            return (parseFloat(v) > 0
                || this.isInfinite(v)
                || v === '1'
                || v === 'true'
                || v === 'yes'
                || v === '+');
        }
    };
    Types.toNumber = function (v) {
        if (this.isFloat(v)) {
            return v;
        }
        else if (this.isUndefined(v) || this.isNull(v)) {
            return null;
        }
        else {
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
    };
    Types.isInteger = function (v) {
        return this.isNumber(v) ? v % 1 === 0 : false;
    };
    Types.isDate = function (v) {
        return (!this.isUndefined(v)
            && !this.isNull(v)
            && v.constructor === Date
            && this.isInteger(v.getTime()));
    };
    Types.isAbsent = function (v) {
        return (this.isUndefined(v)
            || this.isNull(v)
            || (this.isNumber(v) && this.isNaN(v))
            || this.isString(v) && v === ''
            || this.isArray(v) && v.length === 0
            || this.isObject(v) && Object.keys(v).length === 0);
    };
    Types.toDate = function (v) {
        var date = this.isDate(v) ? v : new Date(v);
        var time = date.getTime();
        var isValid = (!this.isAbsent(v)
            && this.isInteger(time));
        return isValid ? date : null;
    };
    return Types;
}());
exports.Types = Types;
exports.default = Types;
//# sourceMappingURL=types.js.map