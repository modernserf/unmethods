# Unmethods

[![Build Status](https://travis-ci.org/modernserf/unmethods.svg)](https://travis-ci.org/modernserf/unmethods)

Unmethods: useful JavaScript functions designed for modern types and syntax.

```
import { map, take, into } from "unmethods";
const results = aHugeList::map((x) => x.toUpperCase())::take(5)::into(Array);
```

## Protocols

Like underscore, unmethods provides functions for working with arrays and objects. Unlike underscore, which operates on arrays and objects, unmethods operate on protocols, like the ES6 iterator protocol (for lazy collections) and the experimental keyed protocol (for key-value stores). This means that the same set of functions operate on all kinds of collections, such as ES6's Map and Set; new collection types need to only implement the basic protocol to use all of the unmethods. 

## Uniform Function Call Syntax

Most of the functions provided here can be called in three different ways:

```js
// traditional
const a = map(list,fn);
// curried
const b = map(fn)(list);
// bound
const c = list::map(fn);
```

All thrree of these are identical.

# Background

ES2015, the newest iteration of JavaScript, introduces a ton of new features, types, and syntactic sugar. Those have all been explored pretty thoroughly, but the one that has the greatest implications for JavaScript are iterators; not the construct in itself but the use of the Iterator protocol.

Iterators are made possible by two new features: [symbols](http://www.2ality.com/2014/12/es6-symbols.html) and [generators](http://www.2ality.com/2015/03/es6-generators.html). Iterators are not necessarily a feature on their own, but rather a _set of conventions_ around symbols and generators:

> Given that JavaScript does not have interfaces, Iterable is more of a convention:
> 
> **Source**: A value is considered _iterable_ if it has a method whose key is the symbol `Symbol.iterator` that returns a so-called _iterator_. The iterator is an object that returns values via its method `next()`. We say: it enumerates _items_, one per method call.
> 
> **Consumption**: Data consumers use the iterator to retrieve the values they are consuming.
[Iterables and iterators in ECMAScript 6](http://www.2ality.com/2015/02/es6-iteration.html)

Collections like Array and Map conform to the Source side of the convention, and syntax like for-of and the spread operator conform to the Consumption side of the convention.

But JavaScript is a language that favors patterns and conventions over high-level features -- after all, `class` syntax is appearing just now, after nearly 20 years of implementing classical models via constructor functions and prototypes. Given that the iterable pseudo-interface is supported at a syntactic level by `for-of` and the spread operator, it seems like this is a pattern worth investigating.

# Methods

> it is often said that the anti-pattern that damages OO programming the most is inheritance. Hot take: nope, its methods.
> [@modernserf](https://twitter.com/modernserf/status/619001200889999360)

Its hard to get people to agree on what makes a language object-oriented -- its usually some combination of inheritance, self-reference, message passing and late binding -- but somehow the majority of them have ended up with something resembling methods -- functions that have a `caller.method(argument)` format, in which the caller is passed as an extra argument. Ruby implements this in terms of message passing; Go (which is arguably _not_ OO) implements it as special syntax on regular functions, and JavaScript does it via first-class functions and the magic `this` variable. 

Method syntax is convenient because it effectively allows us to read chains of functions left to right -- `foo.bar().baz().quux()` is easier to parse (for english speakers, at least) than `quux(baz(bar(foo)))`. Methods, in this sense, are effectively infix operators.

But in order to get this nice syntax, there's a huge tradeoff -- a method must be attached to its caller. In JavaScript, this means that either `foo` or something on `foo`'s prototype chain must have a `bar()` method. This is fine for your own objects, but what if you want to use a method on strings or arrays?

Enter [Monkey Patching](http://perfectionkills.com/extending-native-builtins/). If you want to use `bar()` with all arrays, just stick it on the Array prototype! Which works fine until someone else defines a `bar()` method that's incompatible with yours. Or, worse yet, the sandard library defines a `bar()` method that's similar to yours, except for a few maddening edge cases.

But the part that bugs me the most about methods in JS (and in OO languages in general) is that it conflates struct-field relationships (semantics) with subject-verb-object dataflow (syntax). Go shows that its not necessary to have self-reference to use method syntax (Go methods live side by side with the structs they interact with, they are not members of the struct) and the D language takes this further with [Uniform Function Call Syntax](https://en.wikipedia.org/wiki/Uniform_Function_Call_Syntax) -- `foo.bar(baz)` is mostly just a different syntax for `bar(foo,baz)`.

How can we use method syntax without actually using methods? 

# Bind Operator

ES2016 is experimenting with the [bind operator](http://blog.jeremyfairbank.com/javascript/javascript-es7-function-bind-syntax/), which allows you to call a function with `this` bound to the left-hand side of the operator. Effectively, it allows you use methods from one type on objects of another without going through the whole `Array.prototype.slice.call(arguments)` dance. 

But it also allows you to use _free methods_, functions written in the method style (e.g. using `this` as an argument) that aren't attached to any type. Clever people soon realized that you can combine these new syntaxes to create a library of functions that operate on _any_ iterator and support left-to-right bind syntax:

```js
function* map (fn) {
    for (let item of this) {
        yield fn(item);
    }
}

function* take (count) {
    for (let item of this) {
        yield item;
        count--;
        if (count <= 0) { break; }
    }
}

function toArray () {
    return Array.from(this);
}

["foo","bar","baz"]::map((x) => x.toUpperCase())::take(5)::toArray();
// => ["FOO","BAR","BAZ"]

function* infiniteButts () {
    while (true) {
        yield 'butts';
    }
}

infiniteButts::map((x) => x.toUpperCase())::take(5)::toArray();
// => ["BUTTS","BUTTS","BUTTS","BUTTS","BUTTS"]
```

`map`, `take`, and `toArray` are all related functions and are used like methods, but they are not attached to any object --  they can be bound to anything that conforms to the `Symbol.iterator` protocol.

# Interfaces and Protocols

What if we used symbols and free methods to define some interfaces of our own?

```js
const GET_KEY = Symbol();

Object.prototype[GET_KEY] = function (key) {
    return this[key];
};
Map.prototype[GET_KEY] = Map.prototype.get;

function get (key) { return this[GET_KEY](key); }

function fetch (key, otherwise){
    let value = this[GET_KEY](key);
    return value !== undefined ? value : otherwise;
}

function fetchIn (path, otherwise) {
    let value = this;
    for (let key of path) {
        if (value && value[GET_KEY]) {
            value = value[GET_KEY](key);
        } else {
            return otherwise;
        }
    }
    return value;
}

let foo = {
    bar: [
        new Map([
            ["baz", {
                quux: "you found it!"
            }]
        ])
    ]
};

foo::fetchIn(["bar",0,"baz","quux"],"oops");
// => "you found it!"
foo::fetchIn(["bar",1,"baz","quux"],"oops");
// => "oops"
```

This isn't yet a widespread pattern -- [transducers-js is experimenting with it](https://github.com/cognitect-labs/transducers-js/issues/20) but I haven't been able to find many other examples of this in the wild. 




