import test from "tape";
import { map, forEach, filter, flatMap, into,
    partition, reduce, scan, generate,
    take, drop, takeWhile, dropWhile,
    unique, first,
    concat, push, cons } from "./iterator";

test("map",(assert) => {
    const list = [1,2,3];
    const f = (x) => x * 2;
    assert.deepEqual([2,4,6],[...list::map(f)]);
    assert.end();
});

test("forEach",(assert) => {
    const list = [1,2,3];
    let res = 0;
    assert.equal(list,list::forEach((x) => res = res + x));
    assert.equal(res,6);
    assert.end();
});

test("filter", (assert) => {
    const list = [1,2,3];
    assert.deepEqual([1,3],[...list::filter((x) => x % 2 !== 0)]);
    assert.end();
});

test("flatMap", (assert) => {
    const list = [1,2,3];
    const f = (x) => {
        const val = x * 3;
        return val % 2 === 0 ? [] : [val,"ok"];
    };
    assert.deepEqual([3,"ok",9,"ok"],[...list::flatMap(f)]);
    assert.end();
});

test("into",(assert) => {
    const list = [1,2,3];
    assert.deepEqual(list, list::map((x) => x)::into(Array));
    assert.end();
});

test("partition",(assert) => {
    const list = [1,2,3];
    const p = (x) => x % 2 === 0 ? "even" : "odd";
    const expected = new Map([["odd",[1,3]],["even",[2]]]);
    const res = list::partition(p);

    assert.deepEqual(expected.get("odd"),res.get("odd"));
    assert.deepEqual(expected.get("even"),res.get("even"));
    assert.end();
});

test("reduce",(assert) => {
    const list = [1,2,3];
    const add = (a,b) => a + b;
    assert.equal(6,list::reduce(add,0));
    assert.end();
});

test("scan",(assert) => {
    const list = [1,2,3];
    const add = (a,b) => a + b;
    assert.deepEqual([1,3,6],[...list::scan(add,0)]);
    assert.end();
});

test("generate",(assert) => {
    const nats = generate(1,(x) => x + 1);
    assert.deepEqual([1,2,3], [...nats::take(3)]);
    assert.end();
});

test("concat, cons, push",(assert) => {
    const list = [1,2,3];
    assert.deepEqual([1,2,3,4,5], [...list::concat([4,5])]);
    assert.deepEqual([1,2,3,4],[...list::push(4)]);
    assert.deepEqual([4,1,2,3],[...list::cons(4)]);
    assert.end();
});

test("take, drop", (assert) => {
    const list = [1,2,3,4,5];
    assert.deepEqual([1,2,3],[...list::take(3)]);
    assert.deepEqual([3,4,5],[...list::drop(2)]);
    assert.deepEqual([1,2,3],[...list::takeWhile((x) => x <= 3)]);
    assert.deepEqual([3,4,5],[...list::dropWhile((x) => x < 3)]);
    assert.end();
});

test("unique", (assert) => {
    const list = [1,2,1,3,2,4];
    assert.deepEqual([...list::unique()],[1,2,3,4]);
    assert.end();
});

test("first",(assert) => {
    const list = [1,2,3,4,5];
    const a = list::filter((x) => x > 3);
    const b = list::filter((x) => x > 100);
    const otherwise = {};
    assert.equal(a::first(otherwise),4);
    assert.equal(b::first(otherwise),otherwise);
    assert.end();
});


test("iter functions return reusable iterators", (assert) => {
    const iter = [1,2,3]::map((x) => x * 2);
    assert.deepEqual([...iter],[...iter]);
    assert.end();
});

test("iter functions are lazy when possible", (assert) => {
    const items = [1,2,3];
    const res = [];
    const mapped = items::map((x) => {
        res.push(x);
        return x;
    });
    // mapped hasnt "run" yet
    assert.deepEqual([],res);
    // converting to an array evals mapped
    assert.deepEqual([...mapped],items);
    assert.deepEqual(res,items);
    assert.end();
});

test.skip("sort");
test.skip("sortBy");
