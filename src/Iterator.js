"use strict";

import { FFROM } from "./Functor";
import * as curried from "./iterator-curried";

const wrap0 = (fn) => function () {
    new Iterator(fn(this));
};

const wrap1 = (fn) => function (arg) {
    return new Iterator(fn(this)(arg));
};

class Iterator {
    constructor (iterable) {
        return {
            [Symbol.iterator]() {
                return iterable;
            }
        };
    }
    [FFROM] (data) {
        return new Iterator(data);
    }
    map = wrap1(curried.map)
    mapWithIndex = wrap1(curried.mapWithIndex)
    filter = wrap1(curried.filter)
    filterWithIndex = wrap1(curried.filterWithIndex)
    reduce (fn, into) {
        return new Iterator(into === undefined ?
            curried.reduce(fn)(curried.head(this))(curried.tail(this)) :
            curried.reduce(fn)(into)(this));
    }
    cons = wrap1(curried.cons)
    push = wrap1(curried.push)
    concat (right) {
        return new Iterator(curried.concat(this)(right));
    }
    take = wrap1(curried.take)
    takeWhile = wrap1(curried.takeWhile)
    drop = wrap1(curried.drop)
    dropWhile = wrap1(curried.dropWhile)
    head = wrap0(curried.head)
    tail = wrap0(curried.tail)
}

export const {
    map, mapWithIndex, filter, filterWithIndex, reduce,
    cons, push, concat, take, takeWhile, drop, dropWhile, head, tail,
} = Iterator.prototype;
