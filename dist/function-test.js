"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _function = require("./function");

(0, _tape2["default"])("id returns a single argument identical to its input", function (assert) {
    var _arr = [1, "string", { a: "3" }, function () {
        return 1;
    }, [1, 2, 3]];

    for (var _i = 0; _i < _arr.length; _i++) {
        var val = _arr[_i];
        assert.equal(val, (0, _function.id)(val));
    }
    assert.end();
});

(0, _tape2["default"])("id discards multiple arguments", function (assert) {
    assert.equal("foo", (0, _function.id)("foo", "bar"));
    assert.end();
});

(0, _tape2["default"])("comp composes two functions, right-to-left", function (assert) {
    var a = function a(_a) {
        return _a + 1;
    };
    var b = function b(_b) {
        return _b * 2;
    };
    var ab = (0, _function.comp)(a, b);
    // ab(3) = a(b(3)) = 1 + (3 * 2)
    assert.equal(ab(3), 7);
    assert.end();
});

(0, _tape2["default"])("the second argument of comp can take multiple arguments", function (assert) {
    var a = function a(_a2) {
        return _a2 + 1;
    };
    var b = function b(l, r) {
        return l * r;
    };
    var ab = (0, _function.comp)(a, b);
    // ab(3,5) = a(b(3,5)) = 1 + (3 * 5)
    assert.equal(ab(3, 5), 16);
    assert.end();
});

(0, _tape2["default"])("curry1 takes a 1ary function and returns a 1ary function or a bound nullary function", function (assert) {
    var f = (0, _function.curry1)(function (x) {
        return x + 1;
    });
    var inval = 1;
    var outval = 2;
    assert.equal(outval, f(inval));
    assert.equal(outval, f.call(inval));
    assert.end();
});

(0, _tape2["default"])("curry2 takes a 2ary function and returns a right-curried 2ary function or a bound 1ary function", function (assert) {
    var f = function f(a, b) {
        return a - b;
    };
    var cf = (0, _function.curry2)(f);
    var l = 3;
    var r = 5;
    assert.equal(f(l, r), cf(r)(l));
    assert.equal(f(l, r), cf(l, r));
    assert.equal(f(l, r), cf.call(l, r));
    assert.end();
});

(0, _tape2["default"])("curry3 takes a 3ary function and returns a right-curried 3ary function or a bound 2ary function", function (assert) {
    var f = function f(a, b, c) {
        return a - b / c;
    };
    var a = 10;
    var b = 20;
    var c = 15;
    var cf = (0, _function.curry3)(f);
    assert.equal(f(a, b, c), cf(a, b, c));
    assert.equal(f(a, b, c), cf.call(a, b, c));
    assert.equal(f(a, b, c), cf(b)(c)(a));
    assert.equal(f(a, b, c), cf(b, c)(a));
    assert.equal(f(a, b, c), cf(b)(c, a));
    assert.end();
});