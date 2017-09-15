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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var emitter_1 = require("./utils/emitter");
var objects_1 = require("./utils/objects");
var bound_1 = require("./utils/bound");
var cached_1 = require("./utils/cached");
var http_1 = require("./sync/http");
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(type) {
        var _this = _super.call(this) || this;
        _this.typify(type);
        _this.indexes = Object.create(null);
        _this.array = [];
        _this.on('create', _this.onCreate);
        _this.on('remove', _this.onRemove);
        return _this;
    }
    Collection.prototype.onCreate = function (item) {
        item.on('change', this.onItemChange);
    };
    Collection.prototype.onRemove = function (item) {
        item.off('change', this.onItemChange);
        item.off('index', this.onItemIndex);
        item.off('destroy', this.onItemDestroy);
    };
    Collection.prototype.onItemChange = function (item, old) {
        this.emit('change', item, old);
    };
    Collection.prototype.onItemIndex = function (model) {
        var index = model.getId();
        if (index) {
            delete this.indexes[model.uuid];
            this.indexes[index] = model;
        }
    };
    Collection.prototype.onItemDestroy = function (model) {
        this.remove(model);
    };
    Object.defineProperty(Collection.prototype, "url", {
        get: function () {
            throw new Error('method not overridden');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "length", {
        get: function () {
            return this.array.length;
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.get = function (id) {
        if (typeof id == 'object') {
            return this.indexes[id[this.type.index]] || this.indexes[id.uuid];
        }
        return this.indexes[id] || this.array.find(function (e) { return e.id == id; });
    };
    Collection.prototype.typify = function (type) {
        if (type && typeof type == 'function' && type.prototype instanceof model_1.Model) {
            this.type = type;
        }
        else {
            console.error(type + " should be extended from Model class");
            this.type = model_1.Model;
        }
    };
    Object.defineProperty(Collection.prototype, "sync", {
        get: function () {
            return new http_1.SyncHttp(this);
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.clear = function () {
        var _this = this;
        Object.keys(this.indexes).forEach(function (k) {
            _this.remove(_this.indexes[k]);
        });
        this.emit('clear');
    };
    Collection.prototype.add = function (data) {
        if (!data)
            return;
        var id = this.idOf(data);
        if (id) {
            var item = this.get(data);
            if (!item) {
                if (!(data instanceof this.type)) {
                    item = this.indexes[id] = new this.type(data);
                }
                else {
                    item = this.indexes[id] = data;
                }
                this.array.push(item);
                this.emit('create', item, this);
                item.on('index', this.onItemIndex);
                item.once('destroy', this.onItemDestroy);
            }
            else {
                item.set(data instanceof model_1.Model ? data.toJSON() : data);
            }
            return item;
        }
        else {
            return this.add(new this.type(data));
        }
    };
    Collection.prototype.prepend = function (data) {
        if (!data)
            return;
        var id = this.idOf(data);
        if (id) {
            var item = this.get(data);
            if (!item) {
                if (!(data instanceof this.type)) {
                    item = this.indexes[id] = new this.type(data);
                }
                else {
                    item = this.indexes[id] = data;
                }
                this.array.unshift(item);
                this.emit('create', item, this);
                item.on('index', this.onItemIndex);
                item.once('destroy', this.onItemDestroy);
            }
            else {
                item.set(data instanceof model_1.Model ? data.toJSON() : data);
            }
            return item;
        }
        else {
            return this.prepend(new this.type(data));
        }
    };
    Collection.prototype.remove = function (data) {
        if (!data)
            return null;
        var id = this.idOf(data);
        if (id) {
            var item = this.get(data);
            if (item) {
                var index = this.array.indexOf(item);
                if (index >= 0) {
                    this.array.splice(index, 1);
                    delete this.indexes[id];
                    delete this.indexes[item.uuid];
                    this.emit('remove', item, index, this);
                }
                else {
                    delete this.indexes[id];
                    delete this.indexes[item.uuid];
                    return null;
                }
            }
            return item;
        }
        return null;
    };
    Collection.prototype.idOf = function (data) {
        if (data === void 0) { data = {}; }
        return data[this.type.index] || data.uuid;
    };
    Collection.prototype.map = function (cb) {
        return this.array.map(cb);
    };
    Collection.prototype.filter = function (cb) {
        return this.array.filter(cb);
    };
    Collection.prototype.indexOf = function (data) {
        return this.array.indexOf(data);
    };
    Collection.prototype.each = function (cb) {
        this.array.forEach(cb);
    };
    Collection.prototype.sort = function (cb) {
        return this.array.sort(cb);
    };
    Collection.prototype.cleanup = function (cb) {
        var _this = this;
        return Object.keys(this.indexes)
            .filter(function (k) { return cb(_this.indexes[k]); })
            .map(function (k) { return _this.remove(_this.indexes[k]); });
    };
    Collection.prototype.reset = function (data) {
        var _this = this;
        if (data === void 0) { data = []; }
        Object.keys(this.indexes).forEach(function (k) {
            _this.onRemove(_this.indexes[k]);
        });
        this.array = [];
        this.indexes = Object.create(null);
        data.forEach(function (item) {
            _this.add(item);
        });
        this.emit('reset', this, data);
        return this;
    };
    Collection.prototype.fetch = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this.sync.read(objects_1.Objects.merge(options, {
            url: options.url || this.url,
            method: options.method,
            query: options.query || {},
            patch: options.patch
        })).then(function (res) {
            if (Array.isArray(res)) {
                return _this.reset(res);
            }
            return false;
        });
    };
    Collection.prototype.parse = function (res) { };
    Collection.prototype.toObject = function () {
        return objects_1.Objects.merge({}, this.indexes);
    };
    Collection.prototype.toArray = function () {
        return this.array.slice();
    };
    Collection.prototype.toJSON = function () {
        return this.array.slice().map(function (model) {
            if (model instanceof model_1.Model) {
                return model.toJSON();
            }
            return model;
        });
    };
    __decorate([
        bound_1.Bound
    ], Collection.prototype, "onCreate", null);
    __decorate([
        bound_1.Bound
    ], Collection.prototype, "onRemove", null);
    __decorate([
        bound_1.Bound
    ], Collection.prototype, "onItemChange", null);
    __decorate([
        bound_1.Bound
    ], Collection.prototype, "onItemIndex", null);
    __decorate([
        bound_1.Bound
    ], Collection.prototype, "onItemDestroy", null);
    __decorate([
        cached_1.Cached
    ], Collection.prototype, "sync", null);
    return Collection;
}(emitter_1.Emitter));
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map