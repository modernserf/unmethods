"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _iterator = require("./iterator");

(0, _tape2["default"])("map", function (assert) {
    var list = [1, 2, 3];
    var f = function f(x) {
        return x * 2;
    };
    assert.deepEqual([2, 4, 6], [].concat(_toConsumableArray(_iterator.map.call(list, f))));
    assert.end();
});

(0, _tape2["default"])("forEach", function (assert) {
    var list = [1, 2, 3];
    var res = 0;
    assert.equal(list, _iterator.forEach.call(list, function (x) {
        return res = res + x;
    }));
    assert.equal(res, 6);
    assert.end();
});

(0, _tape2["default"])("filter", function (assert) {
    var list = [1, 2, 3];
    assert.deepEqual([1, 3], [].concat(_toConsumableArray(_iterator.filter.call(list, function (x) {
        return x % 2 !== 0;
    }))));
    assert.end();
});

(0, _tape2["default"])("flatMap", function (assert) {
    var list = [1, 2, 3];
    var f = function f(x) {
        var val = x * 3;
        return val % 2 === 0 ? [] : [val, "ok"];
    };
    assert.deepEqual([3, "ok", 9, "ok"], [].concat(_toConsumableArray(_iterator.flatMap.call(list, f))));
    assert.end();
});

(0, _tape2["default"])("into", function (assert) {
    var _context;

    var list = [1, 2, 3];
    assert.deepEqual(list, (_context = _iterator.map.call(list, function (x) {
        return x;
    }), _iterator.into).call(_context, Array));
    assert.end();
});

(0, _tape2["default"])("partition", function (assert) {
    var list = [1, 2, 3];
    var p = function p(x) {
        return x % 2 === 0 ? "even" : "odd";
    };
    var expected = new Map([["odd", [1, 3]], ["even", [2]]]);
    var res = _iterator.partition.call(list, p);

    assert.deepEqual(expected.get("odd"), res.get("odd"));
    assert.deepEqual(expected.get("even"), res.get("even"));
    assert.end();
});

(0, _tape2["default"])("reduce", function (assert) {
    var list = [1, 2, 3];
    var add = function add(a, b) {
        return a + b;
    };
    assert.equal(6, _iterator.reduce.call(list, add, 0));
    assert.end();
});

(0, _tape2["default"])("scan", function (assert) {
    var list = [1, 2, 3];
    var add = function add(a, b) {
        return a + b;
    };
    assert.deepEqual([1, 3, 6], [].concat(_toConsumableArray(_iterator.scan.call(list, add, 0))));
    assert.end();
});

(0, _tape2["default"])("generate", function (assert) {
    var nats = (0, _iterator.generate)(1, function (x) {
        return x + 1;
    });
    assert.deepEqual([1, 2, 3], [].concat(_toConsumableArray(_iterator.take.call(nats, 3))));
    assert.end();
});

(0, _tape2["default"])("concat, cons, push", function (assert) {
    var list = [1, 2, 3];
    assert.deepEqual([1, 2, 3, 4, 5], [].concat(_toConsumableArray(_iterator.concat.call(list, [4, 5]))));
    assert.deepEqual([1, 2, 3, 4], [].concat(_toConsumableArray(_iterator.push.call(list, 4))));
    assert.deepEqual([4, 1, 2, 3], [].concat(_toConsumableArray(_iterator.cons.call(list, 4))));
    assert.end();
});

(0, _tape2["default"])("take, drop", function (assert) {
    var list = [1, 2, 3, 4, 5];
    assert.deepEqual([1, 2, 3], [].concat(_toConsumableArray(_iterator.take.call(list, 3))));
    assert.deepEqual([3, 4, 5], [].concat(_toConsumableArray(_iterator.drop.call(list, 2))));
    assert.deepEqual([1, 2, 3], [].concat(_toConsumableArray(_iterator.takeWhile.call(list, function (x) {
        return x <= 3;
    }))));
    assert.deepEqual([3, 4, 5], [].concat(_toConsumableArray(_iterator.dropWhile.call(list, function (x) {
        return x < 3;
    }))));
    assert.end();
});

(0, _tape2["default"])("unique", function (assert) {
    var list = [1, 2, 1, 3, 2, 4];
    assert.deepEqual([].concat(_toConsumableArray(_iterator.unique.call(list))), [1, 2, 3, 4]);
    assert.end();
});

(0, _tape2["default"])("first", function (assert) {
    var list = [1, 2, 3, 4, 5];
    var a = _iterator.filter.call(list, function (x) {
        return x > 3;
    });
    var b = _iterator.filter.call(list, function (x) {
        return x > 100;
    });
    var otherwise = {};
    assert.equal(_iterator.first.call(a, otherwise), 4);
    assert.equal(_iterator.first.call(b, otherwise), otherwise);
    assert.end();
});

(0, _tape2["default"])("iter functions return reusable iterators", function (assert) {
    var _context2;

    var iter = (_context2 = [1, 2, 3], _iterator.map).call(_context2, function (x) {
        return x * 2;
    });
    assert.deepEqual([].concat(_toConsumableArray(iter)), [].concat(_toConsumableArray(iter)));
    assert.end();
});

(0, _tape2["default"])("iter functions are lazy when possible", function (assert) {
    var items = [1, 2, 3];
    var res = [];
    var mapped = _iterator.map.call(items, function (x) {
        res.push(x);
        return x;
    });
    // mapped hasnt "run" yet
    assert.deepEqual([], res);
    // converting to an array evals mapped
    assert.deepEqual([].concat(_toConsumableArray(mapped)), items);
    assert.deepEqual(res, items);
    assert.end();
});

_tape2["default"].skip("sort");
_tape2["default"].skip("sortBy");