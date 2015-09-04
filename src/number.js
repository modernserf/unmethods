import { curry1, curry2 } from "./function";

// 1
export const negate = curry1((a) => -a);
export const abs = curry1(Math.abs);
export const inc = curry1((a) => a + 1);
export const dec = curry1((a) => a - 1);
// 2
export const add = curry2((a,b) => a + b);
export const subtract = curry2((a,b) => a - b);
export const divide = curry2((a,b) => a / b);
export const multiply = curry2((a,b) => a * b);
export const modulo = curry2((a,b) => a % b);
export const pow = curry2(Math.pow);
