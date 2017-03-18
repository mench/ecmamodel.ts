"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var cached_1 = require("../utils/cached");
var types_1 = require("../utils/types");
var validator_1 = require("../validators/validator");
var Filed = (function () {
    function Filed(options) {
        var _this = this;
        this.setters = [];
        this.verifiers = [];
        this.errors = [];
        this.customValidators = [];
        Object.defineProperties(this, {
            type: { writable: true },
            default: { writable: true },
            required: { writable: true }
        });
        if (options) {
            Object.keys(options).forEach(function (k) {
                if (_this.options.indexOf(k) > -1) {
                    _this[k] = options[k];
                }
            });
        }
    }
    Filed.uuid = function () {
        return Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    };
    Object.defineProperty(Filed.prototype, "set", {
        set: function (v) {
            if (types_1.Types.isFunction(v)) {
                this.setter(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filed.prototype, "get", {
        set: function (v) {
            if (types_1.Types.isFunction(v)) {
                this.getter = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filed.prototype, "validators", {
        set: function (v) {
            var _this = this;
            if (types_1.Types.isArray(v)) {
                v.map(function (o) {
                    if (o instanceof validator_1.Validator) {
                        _this.customValidators.push(o);
                    }
                    return o;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filed.prototype, "options", {
        get: function () {
            var CURRENT = Symbol.for(this.constructor.name), PARENT = Symbol.for(Filed.name), current = this.constructor[CURRENT] || [], parent = Filed[PARENT] || [];
            return parent.concat(current);
        },
        enumerable: true,
        configurable: true
    });
    Filed.prototype.setter = function (fn) {
        this.setters.push(fn.bind(this));
    };
    Filed.prototype.verifier = function (validator) {
        this.verifiers.push(validator);
    };
    Filed.prototype.cast = function (key, value, model) {
        return value;
    };
    Filed.prototype.apply = function (model, key, value) {
        var _this = this;
        try {
            this.errors = [];
            value = this.cast(key, value, model);
            this.setters.forEach(function (setter) {
                value = setter.call(_this, key, value, model);
            });
            this.verifiers.forEach(function (validator) {
                try {
                    validator.set({
                        field: key,
                        model: model,
                        value: value
                    }).validate();
                }
                catch (e) {
                    _this.error(e);
                }
            });
            return value;
        }
        catch (e) {
            console.error(e);
            this.errors.push(e);
        }
    };
    Filed.prototype.error = function (e) {
        this.errors.push(e);
        return e;
    };
    Filed.prototype.checkRequired = function (value) {
        return value != null;
    };
    Filed.prototype.applyDefault = function (model, key) {
        if (!types_1.Types.isUndefined(this.default)) {
            model.set(key, this.default);
        }
        return this;
    };
    Filed.prototype.uuid = function () {
        var self = this.constructor;
        return self.uuid();
    };
    return Filed;
}());
__decorate([
    Option
], Filed.prototype, "type", void 0);
__decorate([
    Option
], Filed.prototype, "default", void 0);
__decorate([
    Option
], Filed.prototype, "required", void 0);
__decorate([
    Option
], Filed.prototype, "set", null);
__decorate([
    Option
], Filed.prototype, "get", null);
__decorate([
    Option
], Filed.prototype, "validators", null);
__decorate([
    cached_1.Cached
], Filed.prototype, "options", null);
exports.Filed = Filed;
function Option(target, key) {
    var OPTION = Symbol.for(target.constructor.name);
    var props = target.constructor[OPTION];
    if (!props) {
        props = target.constructor[OPTION] = [];
    }
    props.push(key);
}
exports.Option = Option;
//# sourceMappingURL=field.js.map