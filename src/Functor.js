"use strict";

export const FFROM = Symbol("Functor from");
export const FMAP = Symbol("Functor map");

class Functor {
  from (data) {
    return this[FFROM](data);
  }
  map (fn) {
    return this[FMAP](fn);
  }
}

export const { from, map } = Functor.prototype;

export function into (Type) {
    return Type[FFROM](this);
}
