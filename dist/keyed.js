"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _function = require("./function");

var _iterator2 = require("./iterator");

var _constants = require("./constants");

Object.prototype[_constants.keyed] = function () {
    var _this = this;

    var self = this;

    // :(
    if (this.constructor === Map || this.constructor.name === "Map") {
        var _ret = (function () {
            var copy = function copy() {
                return new _this.constructor(_this);
            };

            return {
                v: {
                    get: function get(key) {
                        return _this.get(key);
                    },
                    has: function has(key) {
                        return _this.has(key);
                    },
                    set: function set(key, value) {
                        return copy().set(key, value);
                    },
                    remove: function remove(key) {
                        var nextMap = copy();
                        nextMap["delete"](key);
                        return nextMap;
                    },
                    entries: function entries() {
                        return _this.entries();
                    }
                }
            };
        })();

        if (typeof _ret === "object") return _ret.v;
    } else {
        return {
            get: function get(key) {
                return _this[key];
            },
            has: function has(key) {
                return _this.hasOwnProperty(key);
            },
            set: function set(key, value) {
                return _extends({}, _this, _defineProperty({}, key, value));
            },
            remove: function remove(key) {
                var dest = {};
                for (var k in _this) {
                    if (k !== key) {
                        dest[k] = _this[k];
                    }
                }
                return dest;
            },
            entries: regeneratorRuntime.mark(function entries() {
                var k;
                return regeneratorRuntime.wrap(function entries$(context$2$0) {
                    while (1) switch (context$2$0.prev = context$2$0.next) {
                        case 0:
                            context$2$0.t0 = regeneratorRuntime.keys(self);

                        case 1:
                            if ((context$2$0.t1 = context$2$0.t0()).done) {
                                context$2$0.next = 7;
                                break;
                            }

                            k = context$2$0.t1.value;
                            context$2$0.next = 5;
                            return [k, self[k]];

                        case 5:
                            context$2$0.next = 1;
                            break;

                        case 7:
                        case "end":
                            return context$2$0.stop();
                    }
                }, entries, this);
            })
        };
    }
};

function empty(coll) {
    return new coll.constructor();
}

var get = (0, _function.curry2)(function (coll, key) {
    return coll[_constants.keyed]().get(key);
});

exports.get = get;
var set = (0, _function.curry3)(function (coll, key, value) {
    return coll[_constants.keyed]().set(key, value);
});

exports.set = set;
var has = (0, _function.curry2)(function (coll, key) {
    return coll[_constants.keyed]().has(key);
});

exports.has = has;
var remove = (0, _function.curry2)(function (coll, key) {
    return coll[_constants.keyed]().remove(key);
});

exports.remove = remove;
var entries = (0, _function.curry1)(function (coll) {
    return coll[_constants.keyed]().entries();
});

exports.entries = entries;
var keys = (0, _function.curry1)(function (coll) {
    var _context;

    return (_context = entries.call(coll), _iterator2.map).call(_context, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1);

        var k = _ref2[0];
        return k;
    });
});

exports.keys = keys;
var values = (0, _function.curry1)(function (coll) {
    var _context2;

    return (_context2 = entries.call(coll), _iterator2.map).call(_context2, function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 2);

        var v = _ref32[1];
        return v;
    });
});

exports.values = values;
var fetch = (0, _function.curry3)(function (coll, key, otherwiseFn) {
    return has.call(coll, key) ? get.call(coll, key) : otherwiseFn(coll);
});

exports.fetch = fetch;
var notFound = Symbol();
var _fetchIn = function _fetchIn(_x, _x2) {
    var _again = true;

    _function2: while (_again) {
        var coll = _x,
            path = _x2;
        _path = key = rest = undefined;
        _again = false;

        if (!coll || !coll[_constants.keyed]) {
            return notFound;
        }

        var _path = _toArray(path);

        var key = _path[0];

        var rest = _path.slice(1);

        if (rest.length) {
            _x = get.call(coll, key);
            _x2 = rest;
            _again = true;
            continue _function2;
        } else if (has.call(coll, key)) {
            return get.call(coll, key);
        } else {
            return notFound;
        }
    }
};

var fetchIn = (0, _function.curry3)(function (coll, path, otherwiseFn) {
    var result = _fetchIn(coll, path);
    return result === notFound ? otherwiseFn(coll) : result;
});

exports.fetchIn = fetchIn;
var fetchEither = (0, _function.curry3)(function (coll, options, otherwiseFn) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var opt = _step.value;

            if (has.call(coll, opt)) {
                return get.call(coll, opt);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return otherwiseFn(coll);
});

exports.fetchEither = fetchEither;
var update = (0, _function.curry3)(function (coll, key, valueFn) {
    return set.call(coll, key, valueFn(get.call(coll, key)));
});

exports.update = update;
var updateIn = (0, _function.curry3)(function (coll, path, valueFn) {
    var _context3;

    var _path2 = _toArray(path);

    var key = _path2[0];

    var rest = _path2.slice(1);

    // force error if no coll
    return (_context3 = coll || null, update).call(_context3, key, rest.length ? updateIn(rest, valueFn) : valueFn);
});

exports.updateIn = updateIn;
var merge = (0, _function.curry2)(function (coll, other) {
    var _context4;

    return (_context4 = entries.call(other), _iterator2.reduce).call(_context4, function (result, _ref4) {
        var _ref42 = _slicedToArray(_ref4, 2);

        var key = _ref42[0];
        var value = _ref42[1];
        return set.call(result, key, value);
    }, coll);
});

exports.merge = merge;
var deepMerge = (0, _function.curry2)(function (coll, other) {
    var _context5;

    return (_context5 = entries.call(other), _iterator2.reduce).call(_context5, function (result, _ref5) {
        var _ref52 = _slicedToArray(_ref5, 2);

        var key = _ref52[0];
        var value = _ref52[1];

        var child = get.call(result, key);
        return child && child[_constants.keyed] && value[_constants.keyed] ? update.call(result, key, deepMerge(value)) : set.call(result, key, value);
    }, coll);
});

exports.deepMerge = deepMerge;
var removeIn = (0, _function.curry2)(function (coll, path) {
    var _path3 = _toArray(path);

    var key = _path3[0];

    var rest = _path3.slice(1);

    return rest.length ? update.call(coll, key, removeIn(rest)) : remove.call(coll, key);
});

exports.removeIn = removeIn;
var pick = (0, _function.curry2)(function (coll, keys) {
    return _iterator2.reduce.call(keys, function (c, key) {
        return has.call(coll, key) ? set.call(c, key, get.call(coll, key)) : c;
    }, empty(coll));
});

exports.pick = pick;
var omit = (0, _function.curry2)(function (coll, keys) {
    return _iterator2.reduce.call(keys, remove, coll);
});

exports.omit = omit;
var rename = (0, _function.curry2)(function (coll, keyMap) {
    var _context6;

    return (_context6 = entries.call(keyMap), _iterator2.reduce).call(_context6, function (res, _ref6) {
        var _context7;

        var _ref62 = _slicedToArray(_ref6, 2);

        var key = _ref62[0];
        var newKey = _ref62[1];
        return has.call(coll, key) ? (_context7 = set.call(res, newKey, get.call(coll, key)), remove).call(_context7, key) : res;
    }, coll);
});

exports.rename = rename;
var match = (0, _function.curry2)(function (coll, matcher) {
    var _context8;

    return !(_context8 = (_context8 = entries.call(matcher), _iterator2.filter).call(_context8, function (_ref7) {
        var _ref72 = _slicedToArray(_ref7, 2);

        var k = _ref72[0];
        var v = _ref72[1];
        return get.call(coll, k) !== v;
    }), _iterator2.first).call(_context8);
});
exports.match = match;