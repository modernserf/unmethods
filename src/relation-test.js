import bindProtocols from "./index";
import test from "tape";
import { get } from "./keyed";
import { pluck, select, project, where, join, index } from "./relation";

bindProtocols();

test("pluck", (assert) => {
    const rel = [{
        id: 1, data: "foo",
    }, {
        id: 2, data: "bar"
    }];

    const p = rel::pluck("data");
    assert.deepEqual([...p],["foo","bar"]);
    assert.end();
});

test("select", (assert) => {
    const rel = [{
        id: 1, data: "foo",
    }, {
        id: 2, data: "bar"
    }];

    const s = rel::select(["data"]);
    assert.deepEqual([...s], [{data: "foo"},{data:"bar"}]);
    assert.end();
});

test("project", (assert) => {
    const rel = [{
        id: 1, data: "foo",
    }, {
        id: 2, data: "bar"
    }];
    const p = rel::project({data: "baz"});
    assert.deepEqual([...p],[{
        id: 1, baz: "foo",
    }, {
        id: 2, baz: "bar"
    }]);
    assert.end();
});

test("where", (assert) => {
    const rel = [{
        id: 1, data: "foo",
    }, {
        id: 2, data: "bar"
    }];
    const w = rel::where({data: "foo"});
    assert.deepEqual([...w],[{
        id: 1, data: "foo"
    }]);
    assert.end();
});

test.skip("groupby");
test.skip("orderby");

test("join", (assert) => {
    const a = [{
        a_id: 1, foo: 1,
    },{
        a_id: 2, foo: 2
    }];
    const b = [{
        b_id: 1, foo: 2,
    }, {
        b_id: 2, foo: 2
    }];
    const j = a::join(b,"foo");
    assert.deepEqual([...j],[
        { a_id: 2, foo: 2, b_id: 1},
        { a_id: 2, foo: 2, b_id: 2}
    ]);
    assert.end();
});

test("index",(assert) => {
    const rel = [{
        id: 1, data: "foo",
    }, {
        id: 2, data: "bar"
    }];

    const idx = rel::index("id");
    assert.deepEqual(idx::get(1),{id: 1, data: "foo"});
    assert.end();
});