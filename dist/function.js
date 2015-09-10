"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var id = function id(x) {
    return x;
};

exports.id = id;
var comp = function comp(fnA, fnB) {
    return function () {
        return fnA(fnB.apply(undefined, arguments));
    };
};

exports.comp = comp;
var curry1 = function curry1(fn) {
    return function (target) {
        return this !== undefined ? fn(this) : fn(target);
    };
};

exports.curry1 = curry1;
var curry2 = function curry2(fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return this !== undefined ? fn.apply(undefined, [this].concat(args)) : args.length === 2 ? fn.apply(undefined, args) : function (target) {
            return fn(target, args[0]);
        };
    };
};

exports.curry2 = curry2;
var curry3 = function curry3(fn) {
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return this !== undefined ? fn.apply(undefined, [this].concat(args)) : args.length === 3 ? fn.apply(undefined, args) : args.length === 2 ? function (target) {
            return fn.apply(undefined, [target].concat(args));
        } : function () {
            for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args2[_key3] = arguments[_key3];
            }

            return args2.length === 2 ? fn(args2[1], args[0], args2[0]) : function (target) {
                return fn(target, args[0], args2[0]);
            };
        };
    };
};
exports.curry3 = curry3;