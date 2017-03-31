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
var validator_1 = require("./validator");
exports.Validator = validator_1.Validator;
var types_1 = require("../utils/types");
var validation_1 = require("../errors/validation");
var MinLengthValidator = (function (_super) {
    __extends(MinLengthValidator, _super);
    function MinLengthValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinLengthValidator.prototype.validate = function () {
        var surrogatePairs = this.value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        var len = this.value.length - surrogatePairs.length;
        if (len >= this.kind)
            return true;
        throw new validation_1.MinLengthValidationError(this);
    };
    return MinLengthValidator;
}(validator_1.Validator));
exports.MinLengthValidator = MinLengthValidator;
var MaxLengthValidator = (function (_super) {
    __extends(MaxLengthValidator, _super);
    function MaxLengthValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxLengthValidator.prototype.validate = function () {
        var surrogatePairs = this.value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        var len = this.value.length - surrogatePairs.length;
        if (len <= this.kind)
            return true;
        throw new validation_1.MaxLengthValidationError(this);
    };
    return MaxLengthValidator;
}(validator_1.Validator));
exports.MaxLengthValidator = MaxLengthValidator;
var EnumValidator = (function (_super) {
    __extends(EnumValidator, _super);
    function EnumValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnumValidator.prototype.validate = function () {
        if (this.kind.indexOf(this.value) > -1)
            return true;
        throw new validation_1.EnumValidationError(this);
    };
    return EnumValidator;
}(validator_1.Validator));
exports.EnumValidator = EnumValidator;
var MatchValidator = (function (_super) {
    __extends(MatchValidator, _super);
    function MatchValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchValidator.prototype.validate = function () {
        if (types_1.Types.isValue(this.value) && this.kind.test(this.value)) {
            return true;
        }
        throw new validation_1.MatchValidationError(this);
    };
    return MatchValidator;
}(validator_1.Validator));
exports.MatchValidator = MatchValidator;
var MinNumberValidator = (function (_super) {
    __extends(MinNumberValidator, _super);
    function MinNumberValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinNumberValidator.prototype.validate = function () {
        if (this.value >= this.kind) {
            return true;
        }
        throw new validation_1.MinNumberValidationError(this);
    };
    return MinNumberValidator;
}(validator_1.Validator));
exports.MinNumberValidator = MinNumberValidator;
var MaxNumberValidator = (function (_super) {
    __extends(MaxNumberValidator, _super);
    function MaxNumberValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxNumberValidator.prototype.validate = function () {
        if (this.value <= this.kind) {
            return true;
        }
        throw new validation_1.MaxNumberValidationError(this);
    };
    return MaxNumberValidator;
}(validator_1.Validator));
exports.MaxNumberValidator = MaxNumberValidator;
var MinDateValidator = (function (_super) {
    __extends(MinDateValidator, _super);
    function MinDateValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinDateValidator.prototype.validate = function () {
        if (this.value.getTime() >= this.kind.getTime()) {
            return true;
        }
        throw new validation_1.MinDateValidationError(this);
    };
    return MinDateValidator;
}(validator_1.Validator));
exports.MinDateValidator = MinDateValidator;
var MaxDateValidator = (function (_super) {
    __extends(MaxDateValidator, _super);
    function MaxDateValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxDateValidator.prototype.validate = function () {
        if (this.value.getTime() <= new Date().getTime()) {
            return true;
        }
        throw new validation_1.MaxDateValidationError(this);
    };
    return MaxDateValidator;
}(validator_1.Validator));
exports.MaxDateValidator = MaxDateValidator;
//# sourceMappingURL=index.js.map