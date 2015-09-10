"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _function = require("./function");

var _keyed = require("./keyed");

var _iterator4 = require("./iterator");

var compCurry2 = function compCurry2(f, g) {
    return (0, _function.curry2)(function (a, b) {
        return f(a, g(b));
    });
};

var pluck = compCurry2(_iterator4.map, _keyed.get);
exports.pluck = pluck;
var select = compCurry2(_iterator4.map, _keyed.pick);
exports.select = select;
var project = compCurry2(_iterator4.map, _keyed.rename);
exports.project = project;
var where = compCurry2(_iterator4.filter, _keyed.match);
exports.where = where;
var groupBy = compCurry2(_iterator4.partition, _keyed.get);

exports.groupBy = groupBy;
var orderBy = compCurry2(_iterator4.sortBy, _keyed.get);

exports.orderBy = orderBy;
var index = (0, _function.curry2)(function (iter, key) {
    return _iterator4.reduce.call(iter, function (m, x) {
        return m.set(_keyed.get.call(x, key), x);
    }, new Map());
});

exports.index = index;
var join = (0, _function.curry3)(regeneratorRuntime.mark(function callee$0$0(left, right, joinOn) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, l, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, r;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$1$0.prev = 3;
                _iterator = left[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$1$0.next = 37;
                    break;
                }

                l = _step.value;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                context$1$0.prev = 10;
                _iterator2 = right[Symbol.iterator]();

            case 12:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    context$1$0.next = 20;
                    break;
                }

                r = _step2.value;

                if (!(_keyed.get.call(l, joinOn) === _keyed.get.call(r, joinOn))) {
                    context$1$0.next = 17;
                    break;
                }

                context$1$0.next = 17;
                return _keyed.merge.call(l, r);

            case 17:
                _iteratorNormalCompletion2 = true;
                context$1$0.next = 12;
                break;

            case 20:
                context$1$0.next = 26;
                break;

            case 22:
                context$1$0.prev = 22;
                context$1$0.t0 = context$1$0["catch"](10);
                _didIteratorError2 = true;
                _iteratorError2 = context$1$0.t0;

            case 26:
                context$1$0.prev = 26;
                context$1$0.prev = 27;

                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                }

            case 29:
                context$1$0.prev = 29;

                if (!_didIteratorError2) {
                    context$1$0.next = 32;
                    break;
                }

                throw _iteratorError2;

            case 32:
                return context$1$0.finish(29);

            case 33:
                return context$1$0.finish(26);

            case 34:
                _iteratorNormalCompletion = true;
                context$1$0.next = 5;
                break;

            case 37:
                context$1$0.next = 43;
                break;

            case 39:
                context$1$0.prev = 39;
                context$1$0.t1 = context$1$0["catch"](3);
                _didIteratorError = true;
                _iteratorError = context$1$0.t1;

            case 43:
                context$1$0.prev = 43;
                context$1$0.prev = 44;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }

            case 46:
                context$1$0.prev = 46;

                if (!_didIteratorError) {
                    context$1$0.next = 49;
                    break;
                }

                throw _iteratorError;

            case 49:
                return context$1$0.finish(46);

            case 50:
                return context$1$0.finish(43);

            case 51:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 39, 43, 51], [10, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
}));

exports.join = join;
// convert a keyed of iters into a relation (i.e. an iter of keyeds)
var zip = (0, _function.curry1)(regeneratorRuntime.mark(function callee$0$0(keyed) {
    var _context;

    var rawIterators, done, getValues, results;
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                rawIterators = (_context = (_context = _keyed.entries.call(keyed), _iterator4.map).call(_context, function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);

                    var key = _ref2[0];
                    var iter = _ref2[1];
                    return [key, iter[Symbol.iterator]()];
                }), _iterator4.into).call(_context, Map);
                done = false;

                getValues = function getValues() {
                    var dest = new keyed.constructor();

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = rawIterators[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _context2;

                            var _step3$value = _slicedToArray(_step3.value, 2);

                            var key = _step3$value[0];
                            var iter = _step3$value[1];

                            var _iter$next = iter.next();

                            var value = _iter$next.value;
                            var _done = _iter$next.done;

                            if (_done) {
                                done = true;
                            }
                            dest = (_context2 = dest, _keyed.set).call(_context2, key, value);
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                                _iterator3["return"]();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    return dest;
                };

            case 3:
                if (!(done === false)) {
                    context$1$0.next = 10;
                    break;
                }

                results = getValues();

                if (done) {
                    context$1$0.next = 8;
                    break;
                }

                context$1$0.next = 8;
                return results;

            case 8:
                context$1$0.next = 3;
                break;

            case 10:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}));
exports.zip = zip;