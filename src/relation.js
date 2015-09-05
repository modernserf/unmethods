import { curry2, curry3 } from "./function";
import {
    set, get, merge,
    select as kSelect,
    rename, match } from "./keyed";
import { map, filter, reduce, partition, sortBy } from "./iterator";

const compCurry2 = (f,g) => curry2((a,b) => f(a,g(b)));

export const pluck = compCurry2(map,get);
export const select = compCurry2(map,kSelect);
export const project = compCurry2(map,rename);
export const where = compCurry2(filter,match);
export const groupby = compCurry2(partition,get);

export const orderby = compCurry2(sortBy,get);

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
