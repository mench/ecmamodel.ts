"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var error_1 = require("./error");
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, message || options.field + " is invalid") || this;
        for (var i in options) {
            _this[i] = options[i];
        }
        return _this;
    }
    return ValidationError;
}(error_1.Exception));
exports.ValidationError = ValidationError;
var MinLengthValidationError = (function (_super) {
    __extends(MinLengthValidationError, _super);
    function MinLengthValidationError(options) {
        return _super.call(this, options.value + " is shorter than the minimum allowed length " + options.kind + ".", options) || this;
    }
    return MinLengthValidationError;
}(ValidationError));
exports.MinLengthValidationError = MinLengthValidationError;
var MaxLengthValidationError = (function (_super) {
    __extends(MaxLengthValidationError, _super);
    function MaxLengthValidationError(options) {
        return _super.call(this, options.value + " is longer than the maximum allowed length (" + options.kind + ").", options) || this;
    }
    return MaxLengthValidationError;
}(ValidationError));
exports.MaxLengthValidationError = MaxLengthValidationError;
var EnumValidationError = (function (_super) {
    __extends(EnumValidationError, _super);
    function EnumValidationError(options) {
        return _super.call(this, options.value + " is not a valid enum value for field " + options.field + ".", options) || this;
    }
    return EnumValidationError;
}(ValidationError));
exports.EnumValidationError = EnumValidationError;
var MinNumberValidationError = (function (_super) {
    __extends(MinNumberValidationError, _super);
    function MinNumberValidationError(options) {
        return _super.call(this, options.value + " is less than minimum allowed value (" + options.kind + ").", options) || this;
    }
    return MinNumberValidationError;
}(ValidationError));
exports.MinNumberValidationError = MinNumberValidationError;
var MaxNumberValidationError = (function (_super) {
    __extends(MaxNumberValidationError, _super);
    function MaxNumberValidationError(options) {
        return _super.call(this, options.value + " is more than maximum allowed value (" + options.kind + ").", options) || this;
    }
    return MaxNumberValidationError;
}(ValidationError));
exports.MaxNumberValidationError = MaxNumberValidationError;
var MinDateValidationError = (function (_super) {
    __extends(MinDateValidationError, _super);
    function MinDateValidationError(options) {
        return _super.call(this, options.value + " is before minimum allowed value (" + options.kind + ").", options) || this;
    }
    return MinDateValidationError;
}(ValidationError));
exports.MinDateValidationError = MinDateValidationError;
var MaxDateValidationError = (function (_super) {
    __extends(MaxDateValidationError, _super);
    function MaxDateValidationError(options) {
        return _super.call(this, options.value + " is after maximum allowed value (" + options.kind + ").", options) || this;
    }
    return MaxDateValidationError;
}(ValidationError));
exports.MaxDateValidationError = MaxDateValidationError;
var MatchValidationError = (function (_super) {
    __extends(MatchValidationError, _super);
    function MatchValidationError(options) {
        return _super.call(this, options.field + " is invalid", options) || this;
    }
    return MatchValidationError;
}(ValidationError));
exports.MatchValidationError = MatchValidationError;
var RequiredValidationError = (function (_super) {
    __extends(RequiredValidationError, _super);
    function RequiredValidationError(field, value, model) {
        return _super.call(this, field + " is required", {
            field: field,
            value: value,
            model: model
        }) || this;
    }
    return RequiredValidationError;
}(ValidationError));
exports.RequiredValidationError = RequiredValidationError;
//# sourceMappingURL=validation.js.map