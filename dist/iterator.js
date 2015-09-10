"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _function = require("./function");

var wrap = function wrap(curry, g) {
    return curry(function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _defineProperty({}, Symbol.iterator, function () {
            return g.apply(undefined, args);
        });
    });
};

var map = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, f) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$1$0.prev = 3;
                _iterator = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$1$0.next = 12;
                    break;
                }

                item = _step.value;
                context$1$0.next = 9;
                return f(item);

            case 9:
                _iteratorNormalCompletion = true;
                context$1$0.next = 5;
                break;

            case 12:
                context$1$0.next = 18;
                break;

            case 14:
                context$1$0.prev = 14;
                context$1$0.t0 = context$1$0["catch"](3);
                _didIteratorError = true;
                _iteratorError = context$1$0.t0;

            case 18:
                context$1$0.prev = 18;
                context$1$0.prev = 19;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }

            case 21:
                context$1$0.prev = 21;

                if (!_didIteratorError) {
                    context$1$0.next = 24;
                    break;
                }

                throw _iteratorError;

            case 24:
                return context$1$0.finish(21);

            case 25:
                return context$1$0.finish(18);

            case 26:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 14, 18, 26], [19,, 21, 25]]);
}));

exports.map = map;
var forEach = (0, _function.curry2)(function (iter, f) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = iter[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            f(item);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return iter;
});

exports.forEach = forEach;
var filter = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, p) {
    var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                context$1$0.prev = 3;
                _iterator3 = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                    context$1$0.next = 13;
                    break;
                }

                item = _step3.value;

                if (!p(item)) {
                    context$1$0.next = 10;
                    break;
                }

                context$1$0.next = 10;
                return item;

            case 10:
                _iteratorNormalCompletion3 = true;
                context$1$0.next = 5;
                break;

            case 13:
                context$1$0.next = 19;
                break;

            case 15:
                context$1$0.prev = 15;
                context$1$0.t0 = context$1$0["catch"](3);
                _didIteratorError3 = true;
                _iteratorError3 = context$1$0.t0;

            case 19:
                context$1$0.prev = 19;
                context$1$0.prev = 20;

                if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                    _iterator3["return"]();
                }

            case 22:
                context$1$0.prev = 22;

                if (!_didIteratorError3) {
                    context$1$0.next = 25;
                    break;
                }

                throw _iteratorError3;

            case 25:
                return context$1$0.finish(22);

            case 26:
                return context$1$0.finish(19);

            case 27:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 15, 19, 27], [20,, 22, 26]]);
}));

exports.filter = filter;
var flatMap = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, fn) {
    var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                context$1$0.prev = 3;
                _iterator4 = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                    context$1$0.next = 11;
                    break;
                }

                item = _step4.value;
                return context$1$0.delegateYield(fn(item), "t0", 8);

            case 8:
                _iteratorNormalCompletion4 = true;
                context$1$0.next = 5;
                break;

            case 11:
                context$1$0.next = 17;
                break;

            case 13:
                context$1$0.prev = 13;
                context$1$0.t1 = context$1$0["catch"](3);
                _didIteratorError4 = true;
                _iteratorError4 = context$1$0.t1;

            case 17:
                context$1$0.prev = 17;
                context$1$0.prev = 18;

                if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                    _iterator4["return"]();
                }

            case 20:
                context$1$0.prev = 20;

                if (!_didIteratorError4) {
                    context$1$0.next = 23;
                    break;
                }

                throw _iteratorError4;

            case 23:
                return context$1$0.finish(20);

            case 24:
                return context$1$0.finish(17);

            case 25:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 13, 17, 25], [18,, 20, 24]]);
}));

exports.flatMap = flatMap;
var partition = (0, _function.curry2)(function (iter, getKey) {
    var t = new Map();
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = iter[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var item = _step5.value;

            var key = getKey(item);
            if (t.has(key)) {
                t.get(key).push(item);
            } else {
                t.set(key, [item]);
            }
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                _iterator5["return"]();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    return t;
});

exports.partition = partition;
var into = (0, _function.curry2)(function (iter, Constructor) {
    return Constructor === Array ? Array.from(iter) : new Constructor(iter);
});

exports.into = into;
var reduce = (0, _function.curry3)(function (iter, reducer, into) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = iter[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var item = _step6.value;

            into = reducer(into, item);
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
                _iterator6["return"]();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    return into;
});

exports.reduce = reduce;
var generate = wrap(function (x) {
    return x;
}, regeneratorRuntime.mark(function callee$0$0(seed, f) {
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                if (!true) {
                    context$1$0.next = 6;
                    break;
                }

                context$1$0.next = 3;
                return seed;

            case 3:
                seed = f(seed);
                context$1$0.next = 0;
                break;

            case 6:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}));

exports.generate = generate;
var scan = wrap(_function.curry3, regeneratorRuntime.mark(function callee$0$0(iter, reducer, into) {
    var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                context$1$0.prev = 3;
                _iterator7 = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                    context$1$0.next = 13;
                    break;
                }

                item = _step7.value;

                into = reducer(into, item);
                context$1$0.next = 10;
                return into;

            case 10:
                _iteratorNormalCompletion7 = true;
                context$1$0.next = 5;
                break;

            case 13:
                context$1$0.next = 19;
                break;

            case 15:
                context$1$0.prev = 15;
                context$1$0.t0 = context$1$0["catch"](3);
                _didIteratorError7 = true;
                _iteratorError7 = context$1$0.t0;

            case 19:
                context$1$0.prev = 19;
                context$1$0.prev = 20;

                if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
                    _iterator7["return"]();
                }

            case 22:
                context$1$0.prev = 22;

                if (!_didIteratorError7) {
                    context$1$0.next = 25;
                    break;
                }

                throw _iteratorError7;

            case 25:
                return context$1$0.finish(22);

            case 26:
                return context$1$0.finish(19);

            case 27:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 15, 19, 27], [20,, 22, 26]]);
}));

exports.scan = scan;
var concat = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(l, r) {
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                return context$1$0.delegateYield(l, "t0", 1);

            case 1:
                return context$1$0.delegateYield(r, "t1", 2);

            case 2:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}));

exports.concat = concat;
var cons = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, val) {
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return val;

            case 2:
                return context$1$0.delegateYield(iter, "t0", 3);

            case 3:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}));

exports.cons = cons;
var push = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, val) {
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                return context$1$0.delegateYield(iter, "t0", 1);

            case 1:
                context$1$0.next = 3;
                return val;

            case 3:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}));

exports.push = push;
var take = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, count) {
    var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                context$1$0.prev = 3;
                _iterator8 = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                    context$1$0.next = 15;
                    break;
                }

                item = _step8.value;

                if (!(count <= 0)) {
                    context$1$0.next = 9;
                    break;
                }

                return context$1$0.abrupt("break", 15);

            case 9:
                context$1$0.next = 11;
                return item;

            case 11:
                count--;

            case 12:
                _iteratorNormalCompletion8 = true;
                context$1$0.next = 5;
                break;

            case 15:
                context$1$0.next = 21;
                break;

            case 17:
                context$1$0.prev = 17;
                context$1$0.t0 = context$1$0["catch"](3);
                _didIteratorError8 = true;
                _iteratorError8 = context$1$0.t0;

            case 21:
                context$1$0.prev = 21;
                context$1$0.prev = 22;

                if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
                    _iterator8["return"]();
                }

            case 24:
                context$1$0.prev = 24;

                if (!_didIteratorError8) {
                    context$1$0.next = 27;
                    break;
                }

                throw _iteratorError8;

            case 27:
                return context$1$0.finish(24);

            case 28:
                return context$1$0.finish(21);

            case 29:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 17, 21, 29], [22,, 24, 28]]);
}));

exports.take = take;
var takeWhile = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, pred) {
    var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                context$1$0.prev = 3;
                _iterator9 = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                    context$1$0.next = 14;
                    break;
                }

                item = _step9.value;

                if (pred(item)) {
                    context$1$0.next = 9;
                    break;
                }

                return context$1$0.abrupt("break", 14);

            case 9:
                context$1$0.next = 11;
                return item;

            case 11:
                _iteratorNormalCompletion9 = true;
                context$1$0.next = 5;
                break;

            case 14:
                context$1$0.next = 20;
                break;

            case 16:
                context$1$0.prev = 16;
                context$1$0.t0 = context$1$0["catch"](3);
                _didIteratorError9 = true;
                _iteratorError9 = context$1$0.t0;

            case 20:
                context$1$0.prev = 20;
                context$1$0.prev = 21;

                if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
                    _iterator9["return"]();
                }

            case 23:
                context$1$0.prev = 23;

                if (!_didIteratorError9) {
                    context$1$0.next = 26;
                    break;
                }

                throw _iteratorError9;

            case 26:
                return context$1$0.finish(23);

            case 27:
                return context$1$0.finish(20);

            case 28:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 16, 20, 28], [21,, 23, 27]]);
}));

exports.takeWhile = takeWhile;
var drop = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, count) {
    var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                context$1$0.prev = 3;
                _iterator10 = iter[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                    context$1$0.next = 16;
                    break;
                }

                item = _step10.value;

                if (!(count > 0)) {
                    context$1$0.next = 11;
                    break;
                }

                count--;
                context$1$0.next = 13;
                break;

            case 11:
                context$1$0.next = 13;
                return item;

            case 13:
                _iteratorNormalCompletion10 = true;
                context$1$0.next = 5;
                break;

            case 16:
                context$1$0.next = 22;
                break;

            case 18:
                context$1$0.prev = 18;
                context$1$0.t0 = context$1$0["catch"](3);
                _didIteratorError10 = true;
                _iteratorError10 = context$1$0.t0;

            case 22:
                context$1$0.prev = 22;
                context$1$0.prev = 23;

                if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
                    _iterator10["return"]();
                }

            case 25:
                context$1$0.prev = 25;

                if (!_didIteratorError10) {
                    context$1$0.next = 28;
                    break;
                }

                throw _iteratorError10;

            case 28:
                return context$1$0.finish(25);

            case 29:
                return context$1$0.finish(22);

            case 30:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[3, 18, 22, 30], [23,, 25, 29]]);
}));

exports.drop = drop;
var dropWhile = wrap(_function.curry2, regeneratorRuntime.mark(function callee$0$0(iter, pred) {
    var dropping, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                dropping = true;
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                context$1$0.prev = 4;
                _iterator11 = iter[Symbol.iterator]();

            case 6:
                if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
                    context$1$0.next = 20;
                    break;
                }

                item = _step11.value;

                if (!dropping) {
                    context$1$0.next = 15;
                    break;
                }

                dropping = pred(item);

                if (dropping) {
                    context$1$0.next = 13;
                    break;
                }

                context$1$0.next = 13;
                return item;

            case 13:
                context$1$0.next = 17;
                break;

            case 15:
                context$1$0.next = 17;
                return item;

            case 17:
                _iteratorNormalCompletion11 = true;
                context$1$0.next = 6;
                break;

            case 20:
                context$1$0.next = 26;
                break;

            case 22:
                context$1$0.prev = 22;
                context$1$0.t0 = context$1$0["catch"](4);
                _didIteratorError11 = true;
                _iteratorError11 = context$1$0.t0;

            case 26:
                context$1$0.prev = 26;
                context$1$0.prev = 27;

                if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
                    _iterator11["return"]();
                }

            case 29:
                context$1$0.prev = 29;

                if (!_didIteratorError11) {
                    context$1$0.next = 32;
                    break;
                }

                throw _iteratorError11;

            case 32:
                return context$1$0.finish(29);

            case 33:
                return context$1$0.finish(26);

            case 34:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[4, 22, 26, 34], [27,, 29, 33]]);
}));

exports.dropWhile = dropWhile;
var unique = wrap(_function.curry1, regeneratorRuntime.mark(function callee$0$0(iter) {
    var set, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, item;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                set = new Set();
                _iteratorNormalCompletion12 = true;
                _didIteratorError12 = false;
                _iteratorError12 = undefined;
                context$1$0.prev = 4;
                _iterator12 = iter[Symbol.iterator]();

            case 6:
                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                    context$1$0.next = 15;
                    break;
                }

                item = _step12.value;

                if (set.has(item)) {
                    context$1$0.next = 12;
                    break;
                }

                set.add(item);
                context$1$0.next = 12;
                return item;

            case 12:
                _iteratorNormalCompletion12 = true;
                context$1$0.next = 6;
                break;

            case 15:
                context$1$0.next = 21;
                break;

            case 17:
                context$1$0.prev = 17;
                context$1$0.t0 = context$1$0["catch"](4);
                _didIteratorError12 = true;
                _iteratorError12 = context$1$0.t0;

            case 21:
                context$1$0.prev = 21;
                context$1$0.prev = 22;

                if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
                    _iterator12["return"]();
                }

            case 24:
                context$1$0.prev = 24;

                if (!_didIteratorError12) {
                    context$1$0.next = 27;
                    break;
                }

                throw _iteratorError12;

            case 27:
                return context$1$0.finish(24);

            case 28:
                return context$1$0.finish(21);

            case 29:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[4, 17, 21, 29], [22,, 24, 28]]);
}));

exports.unique = unique;
var first = (0, _function.curry2)(function (iter, otherwise) {
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
        for (var _iterator13 = iter[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var item = _step13.value;

            return item;
        }
    } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
                _iterator13["return"]();
            }
        } finally {
            if (_didIteratorError13) {
                throw _iteratorError13;
            }
        }
    }

    return otherwise;
});

exports.first = first;
// Always returns array
// TODO : lazy sort (heap sort?)
var sort = (0, _function.curry2)(function (iter, fn) {
    return [].concat(_toConsumableArray(iter)).sort(fn);
});

exports.sort = sort;
var sortBy = (0, _function.curry2)(function (iter, getter) {
    return [].concat(_toConsumableArray(iter)).sort(function (a, b) {
        return getter(a) > getter(b) ? 1 : -1;
    });
});
exports.sortBy = sortBy;
// eslint-disable-line no-constant-condition