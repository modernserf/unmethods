"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _keyed = require("./keyed");

var _relation = require("./relation");

(0, _tape2["default"])("pluck", function (assert) {
    var rel = [{
        id: 1, data: "foo"
    }, {
        id: 2, data: "bar"
    }];

    var p = _relation.pluck.call(rel, "data");
    assert.deepEqual([].concat(_toConsumableArray(p)), ["foo", "bar"]);
    assert.end();
});

(0, _tape2["default"])("select", function (assert) {
    var rel = [{
        id: 1, data: "foo"
    }, {
        id: 2, data: "bar"
    }];

    var s = _relation.select.call(rel, ["data"]);
    assert.deepEqual([].concat(_toConsumableArray(s)), [{ data: "foo" }, { data: "bar" }]);
    assert.end();
});

(0, _tape2["default"])("project", function (assert) {
    var rel = [{
        id: 1, data: "foo"
    }, {
        id: 2, data: "bar"
    }];
    var p = _relation.project.call(rel, { data: "baz" });
    assert.deepEqual([].concat(_toConsumableArray(p)), [{
        id: 1, baz: "foo"
    }, {
        id: 2, baz: "bar"
    }]);
    assert.end();
});

(0, _tape2["default"])("where", function (assert) {
    var rel = [{
        id: 1, data: "foo"
    }, {
        id: 2, data: "bar"
    }];
    var w = _relation.where.call(rel, { data: "foo" });
    assert.deepEqual([].concat(_toConsumableArray(w)), [{
        id: 1, data: "foo"
    }]);
    assert.end();
});

(0, _tape2["default"])("groupBy", function (assert) {
    var rel = [{
        id: 1, data: "foo"
    }, {
        id: 2, data: "bar"
    }, {
        id: 3, data: "foo"
    }];

    assert.deepEqual(_relation.groupBy.call(rel, "data").get("foo"), [{ id: 1, data: "foo" }, { id: 3, data: "foo" }]);
    assert.deepEqual(_relation.groupBy.call(rel, "data").get("bar"), [{ id: 2, data: "bar" }]);

    assert.end();
});

(0, _tape2["default"])("orderBy", function (assert) {
    var a = [{
        a: 2, b: 1
    }, {
        a: 1, b: 2
    }];

    assert.deepEqual(_relation.orderBy.call(a, "a"), [{
        a: 1, b: 2
    }, {
        a: 2, b: 1
    }]);
    assert.deepEqual(_relation.orderBy.call(a, "b"), a);

    assert.end();
});

(0, _tape2["default"])("join", function (assert) {
    var a = [{
        a_id: 1, foo: 1
    }, {
        a_id: 2, foo: 2
    }];
    var b = [{
        b_id: 1, foo: 2
    }, {
        b_id: 2, foo: 2
    }];
    var j = _relation.join.call(a, b, "foo");
    assert.deepEqual([].concat(_toConsumableArray(j)), [{ a_id: 2, foo: 2, b_id: 1 }, { a_id: 2, foo: 2, b_id: 2 }]);
    assert.end();
});

(0, _tape2["default"])("index", function (assert) {
    var rel = [{
        id: 1, data: "foo"
    }, {
        id: 2, data: "bar"
    }];

    var idx = _relation.index.call(rel, "id");
    assert.deepEqual(_keyed.get.call(idx, 1), { id: 1, data: "foo" });
    assert.end();
});

(0, _tape2["default"])("zip", function (assert) {
    var data = {
        a: [1, 2, 3, 4],
        b: [2, 4, 6]
    };

    var res = [{ a: 1, b: 2 }, { a: 2, b: 4 }, { a: 3, b: 6 }];

    assert.deepEqual([].concat(_toConsumableArray(_relation.zip.call(data))), res);
    assert.end();
});