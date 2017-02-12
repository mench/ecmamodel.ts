"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var field_1 = require("./field");
var types_1 = require("../utils/types");
var cast_1 = require("../errors/cast");
var validators_1 = require("../validators");
var FiledString = (function (_super) {
    __extends(FiledString, _super);
    function FiledString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FiledString.prototype, "minLength", {
        set: function (v) {
            if (types_1.Types.isNumber(v)) {
                this.verifier(new validators_1.MinLengthValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "maxLength", {
        set: function (v) {
            if (types_1.Types.isNumber(v)) {
                this.verifier(new validators_1.MaxLengthValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "lowercase", {
        set: function (v) {
            if (types_1.Types.toBoolean(v)) {
                this.setter(function (key, value, target) {
                    return value.toLowerCase();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "uppercase", {
        set: function (v) {
            if (types_1.Types.toBoolean(v)) {
                this.setter(function (key, value, target) {
                    return value.toUpperCase();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "trim", {
        set: function (v) {
            if (types_1.Types.toBoolean(v)) {
                this.setter(function (key, value, target) {
                    return value.trim();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "enum", {
        set: function (v) {
            if (types_1.Types.isArray(v) && v.length != 0) {
                this.verifier(new validators_1.EnumValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "match", {
        set: function (v) {
            if (v && v.test) {
                this.verifier(new validators_1.MatchValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledString.prototype, "set", {
        set: function (v) {
            var _this = this;
            var setter = function (key, value, target) {
                var res = v.call(_this, key, value, target);
                if (types_1.Types.isValue(res)) {
                    return res;
                }
                return value;
            };
            this.setter(setter.bind(this));
        },
        enumerable: true,
        configurable: true
    });
    FiledString.prototype.checkRequired = function (value) {
        return (value instanceof String || typeof value === 'string') && value.length;
    };
    FiledString.prototype.cast = function (key, value, model) {
        if (types_1.Types.isString(value)) {
            return value;
        }
        if (value && value.toString && value.toString !== Object.prototype.toString) {
            return value.toString();
        }
        throw new cast_1.CastError(this.type, key, value, model);
    };
    return FiledString;
}(field_1.Filed));
__decorate([
    field_1.Option
], FiledString.prototype, "minLength", null);
__decorate([
    field_1.Option
], FiledString.prototype, "maxLength", null);
__decorate([
    field_1.Option
], FiledString.prototype, "lowercase", null);
__decorate([
    field_1.Option
], FiledString.prototype, "uppercase", null);
__decorate([
    field_1.Option
], FiledString.prototype, "trim", null);
__decorate([
    field_1.Option
], FiledString.prototype, "enum", null);
__decorate([
    field_1.Option
], FiledString.prototype, "match", null);
exports.FiledString = FiledString;
//# sourceMappingURL=string.js.map