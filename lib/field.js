"use strict";
var model_1 = require("./model");
var schema_1 = require("./schema");
var types_1 = require("./utils/types");
exports.SCHEMA = Symbol('SCHEMA');
exports.INDEX = Symbol('index');
function Field(target, key) {
    var options = Array.prototype.splice.call(arguments, 0);
    function annotate(options, target, key) {
        var isModelClass = (typeof model_1.Model == 'undefined' && types_1.Types.isFunction(target.constructor));
        if (isModelClass || target instanceof model_1.Model) {
            var schema = target.constructor[exports.SCHEMA];
            if (!schema) {
                var ParentClass = target.constructor.prototype.__proto__.constructor;
                var parentSchema = ParentClass[exports.SCHEMA] || new schema_1.Schema();
                schema = target.constructor[exports.SCHEMA] = new schema_1.Schema(parentSchema.fields);
            }
            schema.set.apply(schema, [key].concat(options));
            return {
                enumerable: true,
                configurable: true,
                get: function () {
                    return this.get(key);
                },
                set: function (v) {
                    return this.set(key, v);
                }
            };
        }
    }
    if (!types_1.Types.isObject(target)) {
        return annotate([], target, key);
    }
    return function (t, k, d) {
        return annotate(options, t, k);
    };
}
exports.Field = Field;
function Id(target, key) {
    if (types_1.Types.isFunction(target.constructor)) {
        target.constructor[exports.INDEX] = key;
    }
}
exports.Id = Id;
//# sourceMappingURL=field.js.map