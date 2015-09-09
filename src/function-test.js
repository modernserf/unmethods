import test from "tape";
import { id, comp, curry1, curry2, curry3 } from "./function";

test("id returns a single argument identical to its input", (assert) => {
    for (let val of [1, "string",{a: "3"}, () => 1, [1,2,3]]) {
        assert.equal(val,id(val));
    }
    assert.end();
});

test("id discards multiple arguments", (assert) => {
    assert.equal("foo",id("foo","bar"));
    assert.end();
});

test("comp composes two functions, right-to-left",(assert) => {
    const a = (a) => a + 1;
    const b = (b) => b * 2;
    const ab = comp(a,b);
    // ab(3) = a(b(3)) = 1 + (3 * 2)
    assert.equal(ab(3),7);
    assert.end();
});

test("the second argument of comp can take multiple arguments",(assert) => {
    const a = (a) => a + 1;
    const b = (l,r) => l * r;
    const ab = comp(a,b);
    // ab(3,5) = a(b(3,5)) = 1 + (3 * 5)
    assert.equal(ab(3,5),16);
    assert.end();
});

test("curry1 takes a 1ary function and returns a 1ary function or a bound nullary function",(assert) => {
    const f = curry1((x) => x + 1);
    const inval = 1;
    const outval = 2;
    assert.equal(outval,f(inval));
    assert.equal(outval,inval::f());
    assert.end();
});

test("curry2 takes a 2ary function and returns a right-curried 2ary function or a bound 1ary function", (assert) => {
    const f = (a,b) => a - b;
    const cf = curry2(f);
    const l = 3;
    const r = 5;
    assert.equal(f(l,r), cf(r)(l));
    assert.equal(f(l,r), cf(l,r));
    assert.equal(f(l,r), l::cf(r));
    assert.end();
});

test("curry3 takes a 3ary function and returns a right-curried 3ary function or a bound 2ary function", (assert) => {
    const f = (a,b,c) => a - b / c;
    const a = 10;
    const b = 20;
    const c = 15;
    const cf = curry3(f);
    assert.equal(f(a,b,c),cf(a,b,c));
    assert.equal(f(a,b,c),a::cf(b,c));
    assert.equal(f(a,b,c),cf(b)(c)(a));
    assert.equal(f(a,b,c),cf(b,c)(a));
    assert.equal(f(a,b,c),cf(b)(c,a));
    assert.end();
});



