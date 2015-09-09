import test from "tape";
import { get, set, has, remove,
    entries, keys, values,
    fetch, fetchIn, fetchEither,
    update, updateIn,
    merge, deepMerge, removeIn,
    pick, omit, rename, match } from "./keyed";

test("get",(assert) => {
    const obj = { foo: "bar"};
    const m = new Map([["foo","bar"]]);
    assert.equal("bar",obj::get("foo"));
    assert.equal("bar",m::get("foo"));
    assert.end();
});

test("set",(assert) => {
    const obj = { foo: 1 };
    const withBar = obj::set("bar",2);
    assert.equal(withBar.bar, 2);
    assert.false(obj.hasOwnProperty('bar'));

    const m = new Map([["foo",1]]);
    const mWithBar = m::set("bar",2);
    assert.equal(mWithBar.get("bar"), 2);
    assert.false(m.has("bar"));
    assert.end();
});

test("has",(assert) => {
    const obj = {foo: 1};
    assert.true(obj::has("foo"));
    assert.false(obj::has("bar"));

    const m = new Map([["foo",1]]);
    assert.true(m::has("foo"));
    assert.false(m::has("bar"));
    assert.end();
});

test("remove",(assert) => {
    const obj = {foo: 1, bar: 2};
    const withoutBar = obj::remove("bar");
    assert.true(obj::has("bar"));
    assert.false(withoutBar::has("bar"));

    const m = new Map([["foo",1],["bar",2]]);
    const mWithoutBar = m::remove("bar");
    assert.true(m::has("bar"));
    assert.false(mWithoutBar::has("bar"));
    assert.end();
});

test("entries",(assert) => {
    const obj = { foo: 1, bar: 2 };
    const m = new Map(obj::entries());
    assert.equal(1, m.get("foo"));
    assert.equal(2, m.get("bar"));

    const m2 = new Map([["foo",1],["bar",2]]);
    const m2Copy = new Map(m2::entries());
    assert.equal(1, m2Copy.get("foo"));
    assert.equal(2, m2Copy.get("bar"));
    assert.end();
});

test("keys, values", (assert) => {
    const obj = { foo: 1, bar: 2 };
    assert.deepEqual([...obj::keys()].sort(),["bar","foo"]);
    assert.deepEqual([...obj::values()].sort(),[1,2]);
    assert.end();
});

test("fetch (in)", (assert) => {
    const obj = { foo: 1, bar: { baz: 2} };
    const notFound = {};
    assert.equal(1, obj::fetch("foo",() => notFound));
    assert.equal(notFound, obj::fetch("quux",() => notFound));
    assert.equal(1, obj::fetch("quux",(it) => it::get("foo")));

    assert.equal(2, obj::fetchIn(["bar","baz"],() => notFound));
    assert.equal(notFound, obj::fetchIn(["bar","quux"],() => notFound));
    assert.end();
});

test("fetchEither",(assert) => {
    const obj = { foo: 1, bar: 2};
    const notFound = {};
    assert.equal(1,obj::fetchEither(["foo","bar"],() => notFound));
    assert.equal(2,obj::fetchEither(["baz","bar"],() => notFound));
    assert.equal(notFound,obj::fetchEither(["baz","quxx"],() => notFound));
    assert.end();
});

test("update (in)",(assert) => {
    const obj = { foo: 1, bar: { baz: 2} };
    const u = obj::update("foo",(x) => x + 1);
    assert.equal(u.foo,2);

    const u2 = obj::updateIn(["bar","baz"],(x) => x + 1);
    assert.equal(u2.bar.baz, 3);
    assert.throws(() => {
        obj::updateIn(["nope","nothing","here"],(x) => x);
    });
    assert.end();
});

test("merge",(assert) => {
    const obj = { foo: 1};
    const obj1 = obj::merge({bar: 2});
    assert.deepEqual(obj1,{ foo: 1, bar: 2});

    const obj2 = obj1::merge({bar: { baz: 2}});
    assert.deepEqual(obj2,{foo: 1, bar: { baz: 2}});
    assert.end();
});

test("deepMerge", (assert) => {
    const obj = {foo: 1, bar: {baz: 2}};
    const obj1 = obj::deepMerge({bar: {quux: {plugh: 3}}});
    assert.deepEqual(obj1,{foo: 1, bar: {baz : 2, quux: { plugh: 3}}});
    assert.end();
});

test("removeIn", (assert) => {
    const obj = { foo: 1, bar: { baz: 2} };
    const removed = obj::removeIn(["bar","baz"]);
    assert.deepEqual(removed,{foo: 1, bar : {}});
    assert.end();
});

test("pick, omit", (assert) => {
    const obj = { foo: 1, bar: 2, baz: 3 };
    const s = obj::pick(["foo","bar"]);
    assert.deepEqual(s,{foo: 1, bar: 2});

    const o = obj::omit(["bar","baz"]);
    assert.deepEqual(o,{foo: 1});
    assert.end();
});

test("rename", (assert) => {
    const obj = { foo: 1, baz: 2};
    const r = obj::rename({foo: "bar"});
    assert.deepEqual(r,{bar: 1, baz: 2});
    assert.end();
});

test("match", (assert) => {
    const a = { foo: 1, baz: 2};
    const b = { foo: 2, baz: 3};
    assert.true(a::match({foo: 1}));
    assert.false(a::match({foo: 1, bar: 2}));
    assert.false(b::match({foo: 1}));
    assert.end();
});

