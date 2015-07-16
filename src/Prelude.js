export const noop = () => {};

export const id = (x) => x;

export const comp2 = (a, b) => {
  return function (...args) {
    return a(b.apply(this, args));
  };
};

export const tap = (fn) => (data) => {
    fn(data);
    return data;
};

export const pipe1 = (fn) => function () {
    return fn(this);
};

export const tapL = pipe1(tap);
