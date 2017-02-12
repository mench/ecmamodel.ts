"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_1 = require("./field");
var model_1 = require("../model");
var collection_1 = require("../collection");
var types_1 = require("../utils/types");
var FiledAny = (function (_super) {
    __extends(FiledAny, _super);
    function FiledAny() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FiledAny.prototype.cast = function (key, value, model) {
        if (types_1.Types.isObject(value) && this.type && this.type.prototype instanceof model_1.Model) {
            return new this.type(value);
        }
        if (types_1.Types.isArray(value) && this.type && this.type.prototype instanceof collection_1.Collection) {
            var collection = new this.type();
            return collection.reset(value);
        }
        return _super.prototype.cast.call(this, key, value, model);
    };
    return FiledAny;
}(field_1.Filed));
exports.FiledAny = FiledAny;
//# sourceMappingURL=any.js.map