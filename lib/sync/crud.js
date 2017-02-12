"use strict";
var CRUD = (function () {
    function CRUD(entity) {
        this.entity = entity;
    }
    CRUD.prototype.create = function () { };
    CRUD.prototype.read = function () { };
    CRUD.prototype.update = function () { };
    CRUD.prototype.delete = function () { };
    return CRUD;
}());
exports.CRUD = CRUD;
//# sourceMappingURL=crud.js.map