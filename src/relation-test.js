import test from "tape";
import { select, project, where,
    pluck, groupBy, orderBy,
    join, index, zip } from "./relation";

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

test("groupBy",(assert) => {
    const rel = [{
        id: 1, data: "foo",
    }, {
        id: 2, data: "bar",
    } , {
        id: 3, data: "foo"
    }];

    assert.deepEqual(rel::groupBy("data").get("foo"),[
        { id: 1, data: "foo"}, {id: 3, data: "foo"}
    ]);
    assert.deepEqual(rel::groupBy("data").get("bar"),[
        {id: 2, data: "bar"}
    ]);

    assert.end();
});

test("orderBy",(assert) => {
    const a = [{
        a: 2, b: 1,
    },{
        a: 1, b: 2
    }];

    assert.deepEqual(a::orderBy("a"),[{
         a: 1, b: 2
     },{
        a: 2, b: 1,
    }]);
    assert.deepEqual(a::orderBy("b"),a);

    assert.end();
});

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
    assert.equal(Map, idx.constructor);
    assert.deepEqual(idx.get(1),{id: 1, data: "foo"});
    assert.end();
});

test("zip", (assert) => {
    const data = {
        a: [1, 2, 3, 4],
        b: [2, 4, 6]
    };

    const res = [
        {a: 1, b: 2},
        {a: 2, b: 4},
        {a: 3, b: 6}
    ];

    assert.deepEqual([...data::zip()], res);
    assert.end();
});


