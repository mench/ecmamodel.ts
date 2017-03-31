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
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = require("./field");
var types_1 = require("../utils/types");
var FiledArray = (function (_super) {
    __extends(FiledArray, _super);
    function FiledArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FiledArray.prototype.checkRequired = function (value) {
        return !!(value && value.length);
    };
    FiledArray.prototype.cast = function (key, value, model) {
        return types_1.Types.toArray(value);
    };
    return FiledArray;
}(field_1.Filed));
exports.FiledArray = FiledArray;
//# sourceMappingURL=array.js.map