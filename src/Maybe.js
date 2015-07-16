import { FFROM } from "./Functor";
import { MBIND } from "./Monad";

const JUST = Symbol('Just data');
const MAYBE = Symbol('Maybe method');

const Nothing = {
    [FFROM] () { return Nothing; },
    [MBIND] () { return Nothing; },
    [MAYBE] (otherwise) { return otherwise; }
};

function Just (x) {
    if (x === null || x === undefined) {
        return Nothing;
    } else if (this instanceof Just) {
        this[JUST] = x;
    } else {
        return new Just(x);
    }
}

Just.prototype = {
    [FFROM] (x) {
       return Just(x);
    },
    [MBIND] (fn) {
        try {
            return fn(this[JUST]);
        } catch (e) {
            return Nothing;
        }
    },
    [MAYBE] () {
        return this[JUST];
    }
};

Just[FFROM] = Just.prototype[FFROM];

export function maybe (otherwise) {
    return this[MAYBE](otherwise);
}

