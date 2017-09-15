"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Cached(target, key, desc) {
    var initializer = desc.get;
    desc.get = function () {
        return Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            value: initializer.call(this)
        })[key];
    };
    return desc;
}
exports.Cached = Cached;
//# sourceMappingURL=cached.js.map