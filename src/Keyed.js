"use strict";

export const HASKEY = Symbol("Has key");
export const GETKEY = Symbol("Get key");

export const get = (key, otherwise) => (coll) => {
    if (coll.constructor === Object) {
        return coll.hasOwnProperty(key) ? coll[key] : otherwise;
    } else {
        return coll[HASKEY](key) ? coll[GETKEY](key) : otherwise;
    }
};

export function getL(key, otherwise) {
    return get(key, otherwise)(this);
}

export function getLSafe(key, otherwise) {
    if (!this) { return otherwise; }
    return get(key, otherwise)(this);
}
