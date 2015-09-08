import { curry1, curry2, curry3 } from "./function";

const wrap = (curry,g) => curry(function (...args) {
    return {
        [Symbol.iterator]: function () {
            return g(...args);
        }
    };
});

export const map = wrap(curry2, function* (iter, f) {
    for (let item of iter) {
        yield f(item);
    }
});

export const forEach = curry2((iter, f) => {
    for (let item of iter) {
        f(item);
    }
    return iter;
});

export const filter = wrap(curry2, function* (iter, p) {
    for (let item of iter) {
        if (p(item)) { yield item; }
    }
});

export const flatMap = wrap(curry2, function* (iter, fn) {
    for (let item of iter) {
        yield* fn(item);
    }
});

export const partition = curry2((iter, getKey) => {
    const t = new Map();
    for (let item of iter) {
        const key = getKey(item);
        if (t.has(key)){
            t.get(key).push(item);
        } else {
            t.set(key,[item]);
        }
    }
    return t;
});

export const into = curry2((iter, Constructor) =>
    Constructor === Array ?
        Array.from(iter) :
        new Constructor(iter));

export const reduce = curry3((iter, reducer, into) => {
    for (let item of iter) {
        into = reducer(into, item);
    }
    return into;
});

export const generate = wrap((x) => x,function* (seed,f) {
    while (true) { // eslint-disable-line no-constant-condition
        yield seed;
        seed = f(seed);
    }
});

export const scan = wrap(curry3, function* (iter, reducer, into) {
    for (let item of iter) {
        into = reducer(into,item);
        yield into;
    }
});

export const concat = wrap(curry2,function* (l, r) {
    yield* l;
    yield* r;
});

export const cons = wrap(curry2,function* (iter, val) {
    yield val;
    yield* iter;
});

export const push = wrap(curry2,function* (iter, val) {
    yield* iter;
    yield val;
});

// // [[1,2,3],[4,5,6]] => [[1,4],[2,5],[3,6]]
// export const zip = curry1(function* (iters) {
//     if (iters::isEmpty()){ return; }

//     let rawIterators = iters::map((iter) => iter[Symbol.iterator]());
//     let done = false;

//     const getValues = () =>  rawIterators::map((iter) => {
//         let { value, done: _done } = iter.next();
//         if (_done){ done = true; }
//         return value;
//     });

//     while (done === false) {
//         let results = getValues();
//         if (!done){ yield results; }
//     }
// });

export const take = wrap(curry2,function* (iter,count) {
    for (let item of iter) {
        if (count <= 0){ break; }
        yield item;
        count--;
    }
});

export const takeWhile = wrap(curry2, function* (iter,pred) {
    for (let item of iter) {
        if (!pred(item)){ break; }
        yield item;
    }
});

export const drop = wrap(curry2,function* (iter, count) {
    for (let item of iter) {
        if (count > 0){
            count--;
        } else {
            yield item;
        }
    }
});

export const dropWhile = wrap(curry2,function* (iter,pred) {
    let dropping = true;

    for (let item of iter) {
        if (dropping) {
            dropping = pred(item);
            if (!dropping){ yield item; }
        } else {
            yield item;
        }
    }
});

export const unique = wrap(curry1,function* (iter){
    let set = new Set();
    for (let item of iter) {
        if (!set.has(item)){
            set.add(item);
            yield item;
        }
    }
});

export const first = curry2((iter,otherwise) => {
    for (let item of iter){
        return item;
    }
    return otherwise;
});

// Always returns array
// TODO : lazy sort (heap sort?)
export function sort (fn) {
    return [...this].sort(fn);
}

export function sortBy (getter) {
    return [...this].sort((a,b) =>
        getter(a) > getter(b) ? 1 : -1);
}

