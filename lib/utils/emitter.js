"use strict";
var EVENTS = Symbol('listener');
var ORIGINAL = Symbol('listener');
var Emitter = (function () {
    function Emitter() {
    }
    Emitter.on = function (target, event, handler, once) {
        if (once === void 0) { once = false; }
        var listener = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            handler.apply(void 0, args);
            if (once) {
                Emitter.off(target, event, handler);
            }
        };
        listener[ORIGINAL] = handler;
        var events = target[EVENTS];
        if (!events) {
            events = target[EVENTS] = {};
        }
        var listeners = events[event];
        if (!listeners) {
            events[event] = listener;
        }
        else if (typeof listeners == 'function') {
            events[event] = [listeners, listener];
        }
        else {
            listeners.push(listener);
        }
        return target;
    };
    Emitter.off = function (target, event, handler) {
        var events = target[EVENTS];
        if (events) {
            if (!handler) {
                delete events[event];
                return;
            }
            var listeners = events[event];
            if (typeof listeners == 'function') {
                if ((handler[ORIGINAL] || handler) === (listeners[ORIGINAL] || listeners)) {
                    delete events[event];
                }
            }
            else if (listeners) {
                var index = -1;
                for (var i = 0; i < listeners.length; i++) {
                    if ((handler[ORIGINAL] || handler) === (listeners[i][ORIGINAL] || listeners[i])) {
                        index = i;
                        break;
                    }
                }
                if (index >= 0) {
                    listeners.splice(i, 1);
                }
                if (listeners.length == 1) {
                    listeners = listeners[0];
                }
                else if (listeners.length == 0) {
                    delete events[event];
                }
            }
            else {
                delete target[EVENTS];
            }
            return target;
        }
    };
    Emitter.listeners = function (target, event) {
        var events = target[EVENTS];
        if (events) {
            var listeners = events[event];
            if (typeof listeners == 'function') {
                return [listeners];
            }
            else if (listeners) {
                var result = [];
                for (var i = 0; i < listeners.length; i++) {
                    result.push(listeners[i]);
                }
                return result;
            }
        }
    };
    Emitter.emit = function (target, event) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var listeners = Emitter.listeners(target, event);
        if (listeners && listeners.length) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].apply(listeners, args);
            }
        }
    };
    Emitter.prototype.on = function (event, listener) {
        return Emitter.on(this, event, listener);
    };
    Emitter.prototype.once = function (event, listener) {
        return Emitter.on(this, event, listener, true);
    };
    Emitter.prototype.off = function (event, listener) {
        return Emitter.off(this, event, listener);
    };
    Emitter.prototype.listeners = function (event) {
        return Emitter.listeners(this, event);
    };
    Emitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return Emitter.emit.apply(Emitter, [this, event].concat(args));
    };
    return Emitter;
}());
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map