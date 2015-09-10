"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _keyed = require("./keyed");

(0, _tape2["default"])("get", function (assert) {
    var obj = { foo: "bar" };
    var m = new Map([["foo", "bar"]]);
    assert.equal("bar", _keyed.get.call(obj, "foo"));
    assert.equal("bar", _keyed.get.call(m, "foo"));
    assert.end();
});

(0, _tape2["default"])("set", function (assert) {
    var obj = { foo: 1 };
    var withBar = _keyed.set.call(obj, "bar", 2);
    assert.equal(withBar.bar, 2);
    assert["false"](obj.hasOwnProperty('bar'));

    var m = new Map([["foo", 1]]);
    var mWithBar = _keyed.set.call(m, "bar", 2);
    assert.equal(mWithBar.get("bar"), 2);
    assert["false"](m.has("bar"));
    assert.end();
});

(0, _tape2["default"])("has", function (assert) {
    var obj = { foo: 1 };
    assert["true"](_keyed.has.call(obj, "foo"));
    assert["false"](_keyed.has.call(obj, "bar"));

    var m = new Map([["foo", 1]]);
    assert["true"](_keyed.has.call(m, "foo"));
    assert["false"](_keyed.has.call(m, "bar"));
    assert.end();
});

(0, _tape2["default"])("remove", function (assert) {
    var obj = { foo: 1, bar: 2 };
    var withoutBar = _keyed.remove.call(obj, "bar");
    assert["true"](_keyed.has.call(obj, "bar"));
    assert["false"](_keyed.has.call(withoutBar, "bar"));

    var m = new Map([["foo", 1], ["bar", 2]]);
    var mWithoutBar = _keyed.remove.call(m, "bar");
    assert["true"](_keyed.has.call(m, "bar"));
    assert["false"](_keyed.has.call(mWithoutBar, "bar"));
    assert.end();
});

(0, _tape2["default"])("entries", function (assert) {
    var obj = { foo: 1, bar: 2 };
    var m = new Map(_keyed.entries.call(obj));
    assert.equal(1, m.get("foo"));
    assert.equal(2, m.get("bar"));

    var m2 = new Map([["foo", 1], ["bar", 2]]);
    var m2Copy = new Map(_keyed.entries.call(m2));
    assert.equal(1, m2Copy.get("foo"));
    assert.equal(2, m2Copy.get("bar"));
    assert.end();
});

(0, _tape2["default"])("keys, values", function (assert) {
    var obj = { foo: 1, bar: 2 };
    assert.deepEqual([].concat(_toConsumableArray(_keyed.keys.call(obj))).sort(), ["bar", "foo"]);
    assert.deepEqual([].concat(_toConsumableArray(_keyed.values.call(obj))).sort(), [1, 2]);
    assert.end();
});

(0, _tape2["default"])("fetch (in)", function (assert) {
    var obj = { foo: 1, bar: { baz: 2 } };
    var notFound = {};
    assert.equal(1, _keyed.fetch.call(obj, "foo", function () {
        return notFound;
    }));
    assert.equal(notFound, _keyed.fetch.call(obj, "quux", function () {
        return notFound;
    }));
    assert.equal(1, _keyed.fetch.call(obj, "quux", function (it) {
        return _keyed.get.call(it, "foo");
    }));

    assert.equal(2, _keyed.fetchIn.call(obj, ["bar", "baz"], function () {
        return notFound;
    }));
    assert.equal(notFound, _keyed.fetchIn.call(obj, ["bar", "quux"], function () {
        return notFound;
    }));
    assert.end();
});

(0, _tape2["default"])("fetchEither", function (assert) {
    var obj = { foo: 1, bar: 2 };
    var notFound = {};
    assert.equal(1, _keyed.fetchEither.call(obj, ["foo", "bar"], function () {
        return notFound;
    }));
    assert.equal(2, _keyed.fetchEither.call(obj, ["baz", "bar"], function () {
        return notFound;
    }));
    assert.equal(notFound, _keyed.fetchEither.call(obj, ["baz", "quxx"], function () {
        return notFound;
    }));
    assert.end();
});

(0, _tape2["default"])("update (in)", function (assert) {
    var obj = { foo: 1, bar: { baz: 2 } };
    var u = _keyed.update.call(obj, "foo", function (x) {
        return x + 1;
    });
    assert.equal(u.foo, 2);

    var u2 = _keyed.updateIn.call(obj, ["bar", "baz"], function (x) {
        return x + 1;
    });
    assert.equal(u2.bar.baz, 3);
    assert.throws(function () {
        _keyed.updateIn.call(obj, ["nope", "nothing", "here"], function (x) {
            return x;
        });
    });
    assert.end();
});

(0, _tape2["default"])("merge", function (assert) {
    var obj = { foo: 1 };
    var obj1 = _keyed.merge.call(obj, { bar: 2 });
    assert.deepEqual(obj1, { foo: 1, bar: 2 });

    var obj2 = _keyed.merge.call(obj1, { bar: { baz: 2 } });
    assert.deepEqual(obj2, { foo: 1, bar: { baz: 2 } });
    assert.end();
});

(0, _tape2["default"])("deepMerge", function (assert) {
    var obj = { foo: 1, bar: { baz: 2 } };
    var obj1 = _keyed.deepMerge.call(obj, { bar: { quux: { plugh: 3 } } });
    assert.deepEqual(obj1, { foo: 1, bar: { baz: 2, quux: { plugh: 3 } } });
    assert.end();
});

(0, _tape2["default"])("removeIn", function (assert) {
    var obj = { foo: 1, bar: { baz: 2 } };
    var removed = _keyed.removeIn.call(obj, ["bar", "baz"]);
    assert.deepEqual(removed, { foo: 1, bar: {} });
    assert.end();
});

(0, _tape2["default"])("pick, omit", function (assert) {
    var obj = { foo: 1, bar: 2, baz: 3 };
    var s = _keyed.pick.call(obj, ["foo", "bar"]);
    assert.deepEqual(s, { foo: 1, bar: 2 });

    var o = _keyed.omit.call(obj, ["bar", "baz"]);
    assert.deepEqual(o, { foo: 1 });
    assert.end();
});

(0, _tape2["default"])("rename", function (assert) {
    var obj = { foo: 1, baz: 2 };
    var r = _keyed.rename.call(obj, { foo: "bar" });
    assert.deepEqual(r, { bar: 1, baz: 2 });
    assert.end();
});

(0, _tape2["default"])("match", function (assert) {
    var a = { foo: 1, baz: 2 };
    var b = { foo: 2, baz: 3 };
    assert["true"](_keyed.match.call(a, { foo: 1 }));
    assert["false"](_keyed.match.call(a, { foo: 1, bar: 2 }));
    assert["false"](_keyed.match.call(b, { foo: 1 }));
    assert.end();
});