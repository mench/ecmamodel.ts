"use strict";
var Objects = (function () {
    function Objects() {
    }
    Objects.merge = function (source) {
        var patches = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            patches[_i - 1] = arguments[_i];
        }
        return this.patch.apply(this, [{}, source].concat(patches));
    };
    Objects.patch = function (source) {
        var patches = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            patches[_i - 1] = arguments[_i];
        }
        for (var _a = 0, patches_1 = patches; _a < patches_1.length; _a++) {
            var patch = patches_1[_a];
            if (typeof patch == 'object') {
                for (var k in patch) {
                    source[k] = patch[k];
                }
            }
        }
        return source;
    };
    return Objects;
}());
exports.Objects = Objects;
//# sourceMappingURL=objects.js.map