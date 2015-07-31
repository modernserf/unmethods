import { curry1, curry2, curry3 } from "function";

export const INTO = Symbol('iterator/INTO');

// usage: iter::into([]) or iter::into(Array)
export const into = curry2((iter, dest) =>
    dest[INTO] ? dest[INTO](iter) : dest.prototype[INTO](iter));

export const map = curry2(function* (iter, fn) {
    for (let item of iter) {
        yield fn(item);
    }
});

export const filter = curry2(function* (iter,pred) {
    for (let item of iter) {
        if (pred(item)) { yield item; }
    }
});

export const flatMap = curry2(function* (iter, fn) {
    for (let item of iter) {
        yield* fn(item);
    }
});

export const ap = curry2(function* (iter, fnIter) {
    for (let fn of fnIter) {
        for (let item of iter) {
            yield fn(item);
        }
    }
});

export const cons = curry2(function* (tail, head) {
    yield head;
    yield* tail;
});

export const conj = curry2(function* (rest, last) {
    yield* rest;
    yield last;
});

export const concat = curry1(function* (iters) {
    for (let iter of iters) {
        yield* iter;
    }
});

// [[1,2,3],[4,5,6]] => [[1,4],[2,5],[3,6]]
export const zip = curry1(function* (iters) {
    if (iters::isEmpty()){ return; }

    let rawIterators = iters::map((iter) => iter[Symbol.iterator]());
    let done = false;

    const getValues = () =>  rawIterators::map((iter) => {
        let { value, done: _done } = iter.next();
        if (_done){ done = true; }
        return value;
    });

    while (done === false) {
        let results = getValues();
        if (!done){ yield results; }
    }
});

export const prepend = curry2(function* (left, right) {
    yield* right;
    yield* left;
});

export const append = curry2(function* (left, right) {
    yield* left;
    yield* right;
});

export const scan = curry3(function* (iter, fn, seed) {
    for (let item of iter) {
        seed = fn(seed,item);
        yield seed;
    }
});

export const take = curry2(function* (iter,count) {
    for (let item of iter) {
        if (count <= 0){ break; }
        yield item;
        count--;
    }
});

export const takeWhile = curry2(function* (iter,pred) {
    for (let item of iter) {
        if (!pred(item)){ break; }
        yield item;
    }
});

export const drop = curry2(function* (iter, count) {
    for (let item of iter) {
        if (count > 0){
            count--;
        } else {
            yield item;
        }
    }
});

export const dropWhile = curry2(function* (iter,pred) {
    let dropping = true;

    for (let item of iter) {
        if (dropping) {
            dropping = pred(dropping);
            if (!dropping){ yield item; }
        } else {
            yield item;
        }
    }
});

export const index = curry1(function* (iter){
    let i = 0;
    for (let item of iter) {
        yield [i, item];
        i++;
    }
});

export const unique = curry1(function* (iter){
    let set = new Set();
    for (let item of iter) {
        if (!set.has(item)){
            set.add(item);
            yield item;
        }
    }
});

export const intersect = curry2(function* (left, right){
    let set = new Set();
    let lIter = left[Symbol.iterator]();
    let rIter = right[Symbol.iterator]();
    let l, r;

    while (!(l = lIter.next()).done || !(r = rIter.next()).done) {
        if (!l.done) {
            if (set.has(l.value)){ yield l.value; }
            set.add(l.value);
        }
        if (!r.done) {
            if (set.has(r.value)){ yield r.value; }
            set.add(r.value);
        }
    }
});

export const isEmpty = curry1((iter) => {
    return iter[Symbol.iterator]().next().done;
});

export const reduce = curry3((iter, reducer, into) => {
    for (let item of iter) {
        into = reducer(into, item);
    }
    return into;
});

export const every = curry2((iter, pred) => {
    for (let item of iter) {
        if (!pred(item)){ return false; }
    }
    return true;
});

export const find = curry3((iter, pred, otherwise) => {
    for (let item of iter) {
        if (pred(item)){ return item; }
    }
    return otherwise;
});

export const head = curry1((item) =>
    item[Symbol.iterator]().next().value);
