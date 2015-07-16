export const map = (fn) => function* (iter) {
    for (let item of iter) {
        yield fn(item);
    }
};

export const mapWithIndex = (fn) => function* (iter) {
    let i = 0;
    for (let item of iter) {
        yield fn(item,i,iter);
        i++;
    }
};

export const filter = (pred) => function* (iter) {
    for (let item of iter) {
        if (pred(item)) { yield item; }
    }
};

export const filterWithIndex = (pred) => function* (iter) {
    let i = 0;
    for (let item of iter) {
        if (pred(item, i, iter)) { yield item; }
        i++;
    }
};

export const reduce = (reducer) => (into) => (iter) => {
    for (let item of iter) {
        into = reducer(into, item);
    }
    return into;
};

export const cons = (head) => function* (tail) {
    yield head;
    yield* tail;
};

export const push = (last) => function* (rest) {
    yield* rest;
    yield last;
};

export const concat = (left) => function* (right) {
    yield* left;
    yield* right;
};

export const take = (count) => function* (iter) {
    for (let item of iter) {
        if (count <= 0){ break; }
        yield item;
        count--;
    }
};

export const takeWhile = (pred) => function* (iter) {
    for (let item of iter) {
        if (!pred(item)){ break; }
        yield item;
    }
};

export const drop = (count) => function* (iter) {
    for (let item of iter) {
        if (count > 0){
            count--;
        } else {
            yield item;
        }
    }
};

export const dropWhile = (pred) => function* (iter) {
    let dropping = true;

    for (let item of iter) {
        if (dropping) {
            dropping = pred(dropping);
            if (!dropping){ yield item; }
        } else {
            yield item;
        }
    }
};

export const head = take(1);
export const tail = drop(1);

// TODO: lazy sort
