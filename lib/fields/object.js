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
var FiledObject = (function (_super) {
    __extends(FiledObject, _super);
    function FiledObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FiledObject.prototype.cast = function (key, value, model) {
        try {
            if (types_1.Types.isObject(value)) {
                return value;
            }
            value = JSON.parse(value);
            return value;
        }
        catch (e) {
            return value;
        }
    };
    return FiledObject;
}(field_1.Filed));
exports.FiledObject = FiledObject;
//# sourceMappingURL=object.js.map