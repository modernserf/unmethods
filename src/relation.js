import { curry1, curry2, curry3 }                        from "./function";
import { set, get, merge, entries, pick, rename, match } from "./keyed";
import { map, filter, reduce, partition, sortBy, into }  from "./iterator";

const compCurry2 = (f,g) => curry2((a,b) => f(a,g(b)));

export const pluck = compCurry2(map,get);
export const select = compCurry2(map,pick);
export const project = compCurry2(map,rename);
export const where = compCurry2(filter,match);
export const groupBy = compCurry2(partition,get);

export const orderBy = compCurry2(sortBy,get);

export const index = curry2((iter,key) =>
    iter::reduce((m,x) => m::set(x::get(key),x), new Map()));

export const join = curry3(function* (left, right, joinOn){
    for (let l of left) {
        for (let r of right) {
            if (l::get(joinOn) === r::get(joinOn)){
                yield l::merge(r);
            }
        }
    }
});

// convert a keyed of iters into a relation (i.e. an iter of keyeds)
export const zip = curry1(function* (keyed) {
    let rawIterators = keyed::entries()
        ::map(([key, iter]) =>  [key, iter[Symbol.iterator]()])
        ::into(Map);

    let done = false;

    const getValues = () => {
        let dest = new keyed.constructor();

        for (let [key, iter] of rawIterators) {
            let { value, done: _done } = iter.next();
            if (_done){ done = true; }
            dest = dest::set(key,value);
        }
        return dest;
    };

    while (done === false) {
        let results = getValues();
        if (!done){ yield results; }
    }
});
