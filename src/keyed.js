import { comp, curry1, curry2, curry3 } from "function";
import { map, flatMap, every, intersect } from 'iterator';

export const HAS_KEY = Symbol("keyed/HAS_KEY");
export const GET_KEY = Symbol("keyed/GET_KEY");
// returns a modified copy; does not mutate the original.
export const SET_KEY = Symbol("keyed/SET_KEY");
export const DELETE_KEY = Symbol("keyed/DELETE_KEY");

// [key, value] pairs in iterator, as in map.
export const ENTRIES = Symbol("keyed/ENTRIES");

export const has = curry2((coll, key) => coll[HAS_KEY](key));
export const get = curry2((coll, key) => coll[GET_KEY](key));
export const set = curry3((coll,key,value) => coll[SET_KEY](key, value));
export const remove = curry2((coll, key) => coll[DELETE_KEY](key));

export const entries = curry1((coll) => coll[ENTRIES]());
export const keys = comp(map(get(0)),entries);
export const values = comp(map(get(1)),entries);

export const fetch = curry3((coll, key, otherwiseFn) =>
    coll::has(key) ? coll::get(key) : otherwiseFn(coll));

export const fetchIn = curry3((coll, path, otherwiseFn) => {
    let result = coll;
    for (let key of path) {
        if (result && result[GET_KEY]) {
            result = result[GET_KEY](key);
        } else {
            return otherwiseFn(coll);
        }
    }
    return result;
});

export const update = curry3((coll, key, valueFn) =>
    coll::set(key,valueFn(coll::get(key))));

export const merge = curry2((coll, other) => {
    let result = coll;
    for (let [key, value] of entries(other)) {
        result = coll::set(key, value);
    }
    return result;
});

// keyed iterables
export const invert = curry1(function* (iter){
    for (let [key, value] of iter) {
        yield [value, key];
    }
});

export const pick = curry2((coll, keys) =>
    keys::flatMap((key) =>
        coll::has(key) ? [[key, coll::get(key)]] : []));

// keys must be finite
export const omit = curry2((coll, keys) => {
    let set = new Set(keys);
    return entries(coll)::flatMap(([key, value]) =>
        set::has(key) ? [] : [[key, value]]);
});

// relations (iter of keyed using same maps)
export const select = curry2(function* (rel, keys){
    for (let item of rel) {
        yield item::pick(keys);
    }
});

const _whereInner = (item, spec) =>
    entries(spec)::every(([key,value]) => value(item::get(key)));

export const where = curry2(function* (rel, spec){
    for (let item of rel){
        if (_whereInner(item,spec)){
            yield item;
        }
    }
});

export const join = curry2(function* (left, right) {
    let joinOn = keys(left)::intersect(keys(right));

    for (let l of left) {
        for (let r of right) {
            for (let key of joinOn) {
                if (l::get(key) === r::get(key)){
                    yield l::merge(r);
                }
            }
        }
    }
});
