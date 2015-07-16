// (>>=) :: m a -> (a -> m b) -> m b
import { FFROM } from "./Functor";

export const MBIND = Symbol('Monad bind');
export const MRETURN = FFROM;

class Monad {
  from (data){
    return this[MRETURN](data);
  }
  chain (fn) {
    return this[MBIND](fn);
  }
  [FMAP] (fn) {
    return this[MBIND]((a) => this[MBIND](fn(a)));
  }
  flatMap (fn) {
    return this[MBIND](comp2(this[MRETURN],fn));
  }
}

export const { from, chain, flatMap } = Monad.prototype;
