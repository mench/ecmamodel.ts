"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var emitter_1 = require("./utils/emitter");
var types_1 = require("./utils/types");
var field_1 = require("./field");
var schema_1 = require("./schema");
var http_1 = require("./sync/http");
var cached_1 = require("./utils/cached");
var bound_1 = require("./utils/bound");
var field_2 = require("./field");
var validation_1 = require("./errors/validation");
var collection_1 = require("./collection");
var Model = (function (_super) {
    __extends(Model, _super);
    function Model(data) {
        var _this = _super.call(this) || this;
        _this.register();
        if (data) {
            _this.set(data, false);
        }
        return _this;
    }
    Object.defineProperty(Model, "index", {
        get: function () {
            return this[field_2.INDEX];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "schema", {
        get: function () {
            return this[field_1.SCHEMA];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "isNew", {
        get: function () {
            return !this[this.index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "index", {
        get: function () {
            return this.constructor[field_2.INDEX];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "uuid", {
        get: function () {
            return this.schema
                .field(this.index)
                .uuid();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "url", {
        get: function () {
            throw new Error('method not overridden');
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.get = function (key) {
        if (this[Model.PRIVATE]) {
            var value = this[Model.PRIVATE][key];
            var field = this.schema.field(key);
            if (types_1.Types.isFunction(field.getter)) {
                return field.getter.call(this, value);
            }
            return value;
        }
        return null;
    };
    Model.prototype.set = function (key, value, silent) {
        if (typeof key == 'object') {
            if (value == void 0) {
                value = true;
            }
            for (var k in key) {
                this.set(k, key[k]);
            }
            this.commit(value);
        }
        else {
            var field = this.schema.field(key);
            value = field.apply(this, key, value);
            if (field.errors.length) {
                return this;
            }
            var p = this[Model.PRIVATE];
            if (!p) {
                p = this[Model.PRIVATE] = Object.create(null);
            }
            if (p[key] !== value) {
                var c = this[Model.CHANGES];
                if (!c) {
                    c = this[Model.CHANGES] = Object.create(null);
                }
                if (arguments.length > 1) {
                    c[key] = p[key];
                    p[key] = value;
                }
                else {
                    c[key] = p[key];
                    delete p[key];
                }
                this.commit(!silent);
            }
        }
        return this;
    };
    Model.prototype.getId = function () {
        return this[this.index];
    };
    Model.prototype.commit = function (fire) {
        var revert = this[Model.CHANGES] || {};
        delete this[Model.CHANGES];
        if (fire) {
            var changes = {};
            for (var k in revert) {
                changes[k] = this[Model.PRIVATE][k];
                if (this.index == k) {
                    this.emit('index', this, changes[k], revert[k]);
                    delete changes[k];
                    delete revert[k];
                }
                else {
                    this.emit("change:" + k, this, changes[k], revert[k]);
                }
            }
            if (Object.keys(changes).length) {
                this.emit('change', this, changes, revert);
            }
        }
    };
    Model.prototype.register = function () {
        var _this = this;
        var constructor = this.constructor;
        var schema = this[field_1.SCHEMA] = new schema_1.Schema();
        var props = constructor[field_1.SCHEMA].fields;
        props.forEach(function (definition, key) {
            var field = schema_1.Schema.createField(definition);
            schema.set(key, field);
            field.applyDefault(_this, key);
        });
        this.once('destroy', this.onDestroy);
    };
    Model.prototype.toJSON = function () {
        var _this = this;
        var fields = this.schema.props;
        if (fields && fields.length) {
            var map_1 = Object.create(null);
            fields.forEach(function (f) {
                if (!types_1.Types.isUndefined(_this[f])) {
                    map_1[f] = (_this[f] instanceof Model
                        || _this[f] instanceof collection_1.Collection) ? _this[f].toJSON() : _this[f];
                }
            });
            return map_1;
        }
        else {
            return void 0;
        }
    };
    Object.defineProperty(Model.prototype, "sync", {
        get: function () {
            return new http_1.SyncHttp(this);
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.validate = function (cb) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var errors = [];
            var chain = Promise.resolve();
            var props = _this.schema.props;
            var _loop_1 = function (i) {
                var k = props[i];
                var v = _this.get(k);
                field = _this.schema.field(k);
                errors = errors.concat(field.errors);
                if (field.required && !field.checkRequired(v)) {
                    errors = errors.concat(new validation_1.RequiredValidationError(k, v, _this));
                    return "continue";
                }
                field.customValidators.forEach(function (validator) {
                    var cast = function (e) {
                        if (typeof e != 'object') {
                            e = new validation_1.ValidationError(e, validator);
                        }
                        if (!(e instanceof validation_1.ValidationError)) {
                            Object.setPrototypeOf(e, validation_1.ValidationError.prototype);
                            Object.assign(e, validator);
                        }
                        return e;
                    };
                    try {
                        var error_1 = validator.set({
                            value: v,
                            field: k,
                            model: _this
                        }).validate();
                        if (error_1 instanceof Promise) {
                            chain = chain.then(function (r) {
                                return error_1;
                            }).catch(function (e) {
                                errors.push(cast(e));
                                return e;
                            });
                        }
                    }
                    catch (e) {
                        errors.push(cast(e));
                    }
                });
            };
            var field;
            for (var i in props) {
                _loop_1(i);
            }
            var callback = function () {
                if (errors.length) {
                    _this.emit('validate', _this, errors);
                    return reject(errors);
                }
                _this.emit('validate', _this, null);
                resolve(true);
            };
            chain.then(callback, callback);
        }).then(function (ok) {
            if (typeof cb == 'function') {
                cb(null);
                return true;
            }
            return true;
        }, function (errors) {
            if (typeof cb == 'function') {
                cb(errors);
                return errors;
            }
            return Promise.reject(errors);
        });
    };
    Model.prototype.parse = function (res) { };
    Model.prototype.save = function (options) {
        var _this = this;
        if (options === void 0) { options = { validate: true }; }
        var sync = function () {
            var save = function () {
                if (_this.isNew) {
                    return _this.sync.create().then(function (res) {
                        return _this.set(res);
                    });
                }
                return _this.sync.update().then(function (res) {
                    return _this.set(res);
                });
            };
            return save().then(function (m) {
                _this.emit('save', m);
                return m;
            });
        };
        if (options.validate == false) {
            return sync();
        }
        return this.validate()
            .then(function (ok) {
            return sync();
        });
    };
    Model.prototype.fetch = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var url = this.isNew ? this.url : this.url + "/" + this[this.index];
        return this.sync.read({
            url: options.url || url,
            method: options.method,
            query: options.query || {},
            patch: options.patch
        }).then(function (res) {
            return _this.set(res);
        });
    };
    Model.prototype.onDestroy = function () {
        var _this = this;
        this.off('save');
        this.off('validate');
        this.off('change');
        this.off('response');
        this.off('sync');
        this.schema.fields.forEach(function (f, k) {
            _this.off("change:" + k);
        });
    };
    Model.prototype.destroy = function () {
        var _this = this;
        if (this.isNew) {
            this.emit('destroy', this, null);
            return this;
        }
        return this.sync.delete().then(function (res) {
            _this.emit('destroy', _this, res);
            return res;
        });
    };
    return Model;
}(emitter_1.Emitter));
Model.PRIVATE = Symbol('private');
Model.CHANGES = Symbol('changes');
__decorate([
    field_2.Id,
    field_2.Field
], Model.prototype, "id", void 0);
__decorate([
    cached_1.Cached
], Model.prototype, "uuid", null);
__decorate([
    cached_1.Cached
], Model.prototype, "sync", null);
__decorate([
    bound_1.Bound
], Model.prototype, "onDestroy", null);
exports.Model = Model;
//# sourceMappingURL=model.js.map