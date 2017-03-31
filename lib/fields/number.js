"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = require("./field");
var types_1 = require("../utils/types");
var cast_1 = require("../errors/cast");
var validators_1 = require("../validators");
var FiledNumber = (function (_super) {
    __extends(FiledNumber, _super);
    function FiledNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FiledNumber.uuid = function () {
        return Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    };
    Object.defineProperty(FiledNumber.prototype, "min", {
        set: function (v) {
            v = types_1.Types.toNumber(v);
            if (v) {
                this.verifier(new validators_1.MinNumberValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledNumber.prototype, "max", {
        set: function (v) {
            v = types_1.Types.toNumber(v);
            if (v) {
                this.verifier(new validators_1.MaxNumberValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    FiledNumber.prototype.checkRequired = function (value) {
        return typeof value === 'number' || value instanceof Number;
    };
    FiledNumber.prototype.cast = function (key, val, model) {
        if (!types_1.Types.isNaN(val)) {
            if (val === null) {
                return val;
            }
            if (val === '') {
                return null;
            }
            if (typeof val === 'string' || typeof val === 'boolean') {
                val = Number(val);
            }
            if (val instanceof Number) {
                return val;
            }
            if (typeof val === 'number' && !types_1.Types.isNaN(val)) {
                return val;
            }
            if (val.toString && !Array.isArray(val) && val.toString() == Number(val)) {
                return new Number(val);
            }
        }
        throw new cast_1.CastError(this.type, key, val, model);
    };
    return FiledNumber;
}(field_1.Filed));
__decorate([
    field_1.Option
], FiledNumber.prototype, "min", null);
__decorate([
    field_1.Option
], FiledNumber.prototype, "max", null);
exports.FiledNumber = FiledNumber;
//# sourceMappingURL=number.js.map