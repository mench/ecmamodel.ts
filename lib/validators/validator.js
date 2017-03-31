"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = (function () {
    function Validator(kind, value, field, model) {
        if (kind === void 0) { kind = null; }
        if (value === void 0) { value = null; }
        if (field === void 0) { field = null; }
        if (model === void 0) { model = null; }
        this.kind = kind;
        this.value = value;
        this.model = model;
        this.field = field;
    }
    Validator.prototype.set = function (options) {
        if (options === void 0) { options = {}; }
        for (var i in options) {
            if (this.hasOwnProperty(i)) {
                this[i] = options[i];
            }
        }
        return this;
    };
    Validator.prototype.validate = function () {
        throw new Error('method not overridden');
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map