import { FFROM, FMAP } from "./Functor";
import { MBIND } from "./Monad";
import { HASKEY, GETKEY } from "./Keyed";
import { map } from "./Iterator";

const ffrom  = (Type) => function (data) {
    return new Type(data);
};

const mapInto = (Type) => function (fn) {
    return Type[FFROM](this::map(fn));
};

Array.prototype[FFROM] = Array[FFROM] = function (data){
  const spread = [...data];
  return spread.length ? spread : [data];
};

Array.prototype[FMAP] = mapInto(Array);

Array.prototype[MBIND] = function (fn) {
  let dest = [];
  for (let item of this){
    dest = [...dest, ...fn(item)];
  }
  return dest;
};

Array.prototype[HASKEY] = function (i) {
    return this.hasOwnProperty(i);
};

Array.prototype[GETKEY] = function (i) {
    return this[i];
};

Map.prototype[FFROM] = Map[FFROM] = ffrom(Map);
Map.prototype[FMAP] = mapInto(Map);

Map.prototype[MBIND] = function (fn) {
    let coll = new Map();
    for (let item of this) {
        for (let [key, value] of fn(item)) {
            coll.set(key, value);
        }
    }
    return coll;
};

Map.prototype[HASKEY] = Map.prototype.has;
Map.prototype[GETKEY] = Map.prototype.get;

Set.prototype[FFROM] = Set[FFROM] = ffrom(Set);
Set.prototype[FMAP] = mapInto(Set);

Set.prototype[MBIND] = function (fn){
    let coll = new Set();
    for (let item of this) {
        for (let value of fn(item)) {
            coll.add(value);
        }
    }
    return coll;
};

Set.prototype[HASKEY] = Set.prototype.has;
Set.prototype[GETKEY] = Set.prototype.get;


Promise.prototype[FFROM] = Promise[FFROM] = function (data) {
    return Promise.resolve(data);
};

Promise.prototype[MBIND] = function (then) {
    return this.then(then);
};
