"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cached_1 = require("./utils/cached");
var fields_1 = require("./fields");
var Schema = (function () {
    function Schema(parentFields) {
        this.fields = new Map(parentFields);
    }
    Schema.createField = function (options) {
        if (options === void 0) { options = {}; }
        switch (options.type) {
            case String:
                return new fields_1.FiledString(options);
            case Number:
                return new fields_1.FiledNumber(options);
            case Array:
                return new fields_1.FiledArray(options);
            case Boolean:
                return new fields_1.FiledBoolean(options);
            case Date:
                return new fields_1.FiledDate(options);
            case Object:
                return new fields_1.FiledObject(options);
            default:
                return new fields_1.FiledAny(options);
        }
    };
    Schema.prototype.set = function (key, options) {
        this.fields.set(key, options);
        return this;
    };
    Schema.prototype.field = function (key) {
        if (!this.fields.has(key)) {
            this.set(key, Schema.createField());
        }
        return this.fields.get(key);
    };
    Object.defineProperty(Schema.prototype, "props", {
        get: function () {
            var props = [];
            this.fields.forEach(function (value, key) {
                props.push(key);
            });
            return props;
        },
        enumerable: true,
        configurable: true
    });
    return Schema;
}());
__decorate([
    cached_1.Cached
], Schema.prototype, "props", null);
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map