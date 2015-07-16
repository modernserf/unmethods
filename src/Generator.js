export function* ints (start=0) {
    for (let i = start; i < Number.MAX_SAFE_INTEGER; i++) {
        yield i;
    }
}

export function* unfold (seed, fn) {
    while (true) { // eslint-disable-line no-constant-condition
        yield seed;
        seed = fn(seed);
    }
}