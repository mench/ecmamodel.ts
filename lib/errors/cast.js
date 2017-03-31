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
var error_1 = require("./error");
var CastError = (function (_super) {
    __extends(CastError, _super);
    function CastError(type, key, kind, target) {
        var _this = _super.call(this, "Cast to " + type.name + " failed at field " + key + " on " + target.constructor.name + " class") || this;
        _this.field = key;
        _this.model = target;
        _this.value = kind;
        return _this;
    }
    return CastError;
}(error_1.Exception));
exports.CastError = CastError;
//# sourceMappingURL=cast.js.map