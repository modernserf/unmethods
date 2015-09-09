export const id = (x) => x;

export const comp = (fnA, fnB) => function (...args) {
    return fnA(fnB(...args));
};

export const curry1 = (fn) => function (target) {
    return this !== undefined ? fn(this) : fn(target);
};

export const curry2 = (fn) => function (...args) {
    return this !== undefined ? fn(this, ...args) :
        args.length === 2 ? fn(...args):
        (target) => fn(target, args[0]);
};

export const curry3 = (fn) => function (...args) {
    return this !== undefined ? fn(this, ...args) :
        args.length === 3 ? fn(...args) :
        args.length === 2 ? (target) => fn(target,...args) :
        (...args2) =>
            args2.length === 2 ?
                fn(args2[1],args[0],args2[0]) :
                (target) => fn(target, args[0], args2[0]);
};
