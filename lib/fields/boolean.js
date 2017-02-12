"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_1 = require("./field");
var types_1 = require("../utils/types");
var FiledBoolean = (function (_super) {
    __extends(FiledBoolean, _super);
    function FiledBoolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FiledBoolean.prototype.checkRequired = function (value) {
        return value === true || value === false;
    };
    FiledBoolean.prototype.cast = function (key, value, model) {
        return types_1.Types.toBoolean(value);
    };
    return FiledBoolean;
}(field_1.Filed));
exports.FiledBoolean = FiledBoolean;
//# sourceMappingURL=boolean.js.map