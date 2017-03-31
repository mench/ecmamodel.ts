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
var FiledDate = (function (_super) {
    __extends(FiledDate, _super);
    function FiledDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FiledDate.prototype, "min", {
        set: function (v) {
            v = types_1.default.toDate(v);
            if (v) {
                this.verifier(new validators_1.MinDateValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiledDate.prototype, "max", {
        set: function (v) {
            v = types_1.default.toNumber(v);
            if (v) {
                this.verifier(new validators_1.MaxDateValidator(v));
            }
        },
        enumerable: true,
        configurable: true
    });
    FiledDate.prototype.checkRequired = function (value) {
        return value instanceof Date;
    };
    ;
    FiledDate.prototype.cast = function (key, value, model) {
        var error = new cast_1.CastError(this.type, key, value, model);
        if (value === null || value === void 0 || value === '') {
            return null;
        }
        if (value instanceof Date) {
            if (types_1.default.isNaN(value.valueOf())) {
                throw error;
            }
            return value;
        }
        var date;
        if (typeof value === 'boolean') {
            throw error;
        }
        var a = Number(value);
        var b = String(value);
        if (value instanceof Number || typeof value === 'number'
            || a == b) {
            date = new Date(Number(value));
        }
        else if (value.valueOf) {
            date = new Date(value.valueOf());
        }
        if (!types_1.default.isNaN(date.valueOf())) {
            return date;
        }
        throw error;
    };
    return FiledDate;
}(field_1.Filed));
__decorate([
    field_1.Option
], FiledDate.prototype, "min", null);
__decorate([
    field_1.Option
], FiledDate.prototype, "max", null);
exports.FiledDate = FiledDate;
//# sourceMappingURL=date.js.map