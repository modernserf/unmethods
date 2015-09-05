import { curry1, curry2, curry3 } from "./function";
import { map, reduce } from "./iterator";

const keyed = Symbol("keyed");

Object.prototype[keyed] = function () {
    const self = this;
    return {
        get: (key) => this[key],
        has: (key) => this.hasOwnProperty(key),
        set: (key, value) => ({...this, [key]: value}),
        remove: (key) => {
            const dest = {};
            for (let k in this) {
                if (k !== key) {
                    dest[k] = this[k];
                }
            }
            return dest;
        },
        entries: function* () {
            for (let k in self) {
                yield [k, self[k]];
            }
        }
    };
};

Map.prototype[keyed] = function () {
    return {
        get: (key) => this.get(key),
        has: (key) => this.has(key),
        set: (key, value) => new Map(this).set(key,value),
        remove: (key) => {
            const nextMap = new Map(this);
            nextMap.delete(key);
            return nextMap;
        },
        entries: () => this.entries()
    };
};

function empty (coll) {
    return new coll.constructor();
}

export const get = curry2((coll, key) => coll[keyed]().get(key));

export const set = curry3((coll,key,value) =>
    coll[keyed]().set(key,value));

export const has = curry2((coll,key) => coll[keyed]().has(key));

export const remove = curry2((coll,key) => coll[keyed]().remove(key));

export const entries = curry1((coll) => coll[keyed]().entries());

export const keys = curry1((coll) => coll::entries()::map(([k]) => k));

export const values = curry1((coll) => coll::entries()::map(([,v]) => v));

export const fetch = curry3((coll, key, otherwiseFn) =>
    coll::has(key) ? coll::get(key) : otherwiseFn(coll));

const notFound = Symbol();
const _fetchIn = (coll,path) => {
    if (!coll || !coll[keyed]){ return notFound; }

    const [key,...rest] = path;
    if (rest.length) {
        return _fetchIn(coll::get(key),rest);
    } else if (coll::has(key)) {
        return coll::get(key);
    } else {
        return notFound;
    }
};

export const fetchIn = curry3((coll, path, otherwiseFn) => {
    const result = _fetchIn(coll,path);
    return result === notFound ? otherwiseFn(coll) : result;
});

export const fetchEither = curry3((coll,options,otherwiseFn) => {
    for (let opt of options) {
        if (coll::has(opt)) {
            return coll::get(opt);
        }
    }
    return otherwiseFn(coll);
});

export const update = curry3((coll, key, valueFn) =>
    coll::set(key,valueFn(coll::get(key))));

export const updateIn = curry3((coll,path,valueFn) => {
    const [key,...rest] = path;
    // force error if no coll
    return (coll || null)::update(key, rest.length ? updateIn(rest,valueFn) : valueFn);
});

export const merge = curry2((coll, other) =>
    other::entries()::reduce((result,[key, value]) =>
        result::set(key,value), coll));

export const deepMerge = curry2((coll,other) =>
    other::entries()::reduce((result, [key, value]) => {
        const child = result::get(key);
        return child && child[keyed] && value[keyed] ?
            result::update(key, deepMerge(value)) :
            result::set(key,value);
    }, coll));

export const removeIn = curry2((coll,path) => {
    const [key,...rest] = path;
    return rest.length ?
        coll::update(key,removeIn(rest)) :
        coll::remove(key);
});

export const select = curry2((coll, keys) =>
    keys::reduce((c,key) =>
        coll::has(key) ? c::set(key,coll::get(key)) : c
    , empty(coll)));

export const omit = curry2((coll,keys) =>
    keys::reduce(remove,coll));

// // keys must be finite
// export const omit = curry2((coll, keys) => {
//     let set = new Set(keys);
//     return entries(coll)::flatMap(([key, value]) =>
//         set::has(key) ? [] : [[key, value]]);
// });

// // relations (iter of keyed using same maps)
// export const select = curry2(function* (rel, keys){
//     for (let item of rel) {
//         yield item::pick(keys);
//     }
// });

// const _whereInner = (item, spec) =>
//     entries(spec)::every(([key,value]) => value(item::get(key)));

// export const where = curry2(function* (rel, spec){
//     for (let item of rel){
//         if (_whereInner(item,spec)){
//             yield item;
//         }
//     }
// });

// export const join = curry2(function* (left, right) {
//     let joinOn = keys(left)::intersect(keys(right));

//     for (let l of left) {
//         for (let r of right) {
//             for (let key of joinOn) {
//                 if (l::get(key) === r::get(key)){
//                     yield l::merge(r);
//                 }
//             }
//         }
//     }
// });
