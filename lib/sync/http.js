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
var crud_1 = require("./crud");
var bound_1 = require("../utils/bound");
var SyncHttp = (function (_super) {
    __extends(SyncHttp, _super);
    function SyncHttp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyncHttp.prototype.resolve = function (response) {
        var _this = this;
        this.entity.emit('response', this.entity, response);
        var result = function () {
            var contType = response.headers.get('content-type');
            if (contType.indexOf('application/json') > -1) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response.json());
            }
            if (response.ok) {
                return response.text();
            }
            return Promise.reject(response.text());
        };
        return result().then(function (response) {
            _this.entity.emit('sync', _this.entity, response);
            return _this.entity.parse(response) || response;
        }).catch(function (error) {
            _this.entity.emit('error', _this.entity, error);
            return Promise.reject(error);
        });
    };
    SyncHttp.prototype.encode = function () {
        return JSON.stringify(this.entity.toJSON());
    };
    SyncHttp.prototype.encodeUrl = function (query) {
        if (query && typeof query == 'object' && Object.keys(query).length) {
            return '?' + Object.keys(query)
                .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(query[key]); })
                .join("&")
                .replace(/%20/g, "+");
        }
        return "";
    };
    SyncHttp.prototype.create = function () {
        return fetch(this.entity.url, {
            method: "POST",
            body: this.encode(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(this.resolve, function (e) {
            return Promise.reject(e);
        });
    };
    SyncHttp.prototype.update = function () {
        return fetch(this.entity.url + "/" + (this.entity[this.entity.index] ? this.entity[this.entity.index] : ''), {
            method: "PUT",
            body: this.encode(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(this.resolve, function (e) {
            return Promise.reject(e);
        });
    };
    SyncHttp.prototype.read = function (options) {
        if (options === void 0) { options = { patch: false }; }
        var params = {};
        if (options.patch == true) {
            options.method = exports.METHODS.PATCH;
        }
        params.method = options.method || exports.METHODS.GET;
        var url = options.url || "/";
        if (params.method == exports.METHODS.GET) {
            url = url + this.encodeUrl(options.query);
        }
        else {
            params.body = JSON.stringify(options.query || {});
        }
        return fetch(url, params).then(this.resolve, function (e) {
            return Promise.reject(e);
        });
    };
    SyncHttp.prototype.delete = function () {
        return fetch(this.entity.url + "/" + (this.entity[this.entity.index] ? this.entity[this.entity.index] : ''), {
            method: "DELETE",
            body: this.encode(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(this.resolve, function (e) {
            return Promise.reject(e);
        });
    };
    return SyncHttp;
}(crud_1.CRUD));
__decorate([
    bound_1.Bound
], SyncHttp.prototype, "resolve", null);
exports.SyncHttp = SyncHttp;
exports.METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
};
//# sourceMappingURL=http.js.map