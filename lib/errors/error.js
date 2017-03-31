"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exception = (function () {
    function Exception(message) {
        this.message = message;
        Error.apply(this, arguments);
    }
    return Exception;
}());
exports.Exception = Exception;
//# sourceMappingURL=error.js.map