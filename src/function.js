export const id = (x) => x;

export const comp = (fnA, fnB) => function (...args) {
    return fnA(fnB.apply(this,args));
};

export const flip = (fn) => (a) => (b) => fn(b)(a);
export const dup = (fn) => (a) => fn(a)(a);

export const curry1 = (fn) => function (target) {
    return this ? fn(this) : fn(target);
};

export const curry2 = (fn) => function (arg) {
    return this ? fn(this, arg) : curry1((target) => fn(target, arg));
};

export const curry3 = (fn) => function (arg, arg2) {
    return this ?
        fn(this, arg, arg2) :
        curry2((_arg2, target) => fn(target, arg, _arg2));
};

export const tap = curry2((lhs, fn) => {
    fn(lhs);
    return lhs;
});