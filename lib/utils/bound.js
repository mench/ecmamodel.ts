"use strict";
function Bound(target, key, desc) {
    var original = desc.value;
    return {
        enumerable: true,
        get: function () {
            return Object.defineProperty(this, key, {
                value: original.bind(this)
            })[key];
        }
    };
}
exports.Bound = Bound;
//# sourceMappingURL=bound.js.map