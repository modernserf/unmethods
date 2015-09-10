# Iterator

Functions that operate on iterable collections, e.g. Array, Map, Set and generators. 

Functions that return iterators are lazy.
## concat
`foo::concat(bar) :: Iter f : Iter f -> Iter f`

Returns an iterator of the items of `foo` followed by the items of `bar`.

## cons 
`foo::cons(bar) :: Iter f : f -> Iter f`

Returns an iterator starting with item `bar` followed by the items of `foo`.

## drop
`foo::drop(count) :: Iter f : Number -> Iter f`

Returns an iterator of the items of `foo` after `count` items.

## dropWhile
`foo::dropWhile(pred) :: Iter f : (f -> Boolean) -> Iter f`

Returns an iterator of the items of `foo` after `pred` has returned true.

## filter
`foo::filter(pred) :: Iter f : (f -> Boolean) -> Iter f `

Returns an iterator of the items of `foo` where `pred` returns true.

## first
`foo::first(otherwise) ::  Iter f : f -> f `

If iterator `foo` has items, returns the first; otherwise returns `otherwise`.

## flatMap
`foo::flatMap(flatMapper) :: Iter f : (f -> Iter g) -> Iter g`

Returns an iterator of the results of `flatMapper` concatenated. 

## forEach (eager)
`foo::forEach(fn) :: Iter f : (f -> g) -> Iter f`

Calls `fn` on each item of `foo` for side effects, returning `foo`.

## generate (non-curried)
`generate(seed,genFn) ::  f, (f -> f) -> Iter f`

Returns an iterator of the repeated application of `genFn` on the previous result, starting with `seed`. Like `reduce` in reverse.

## into (eager)
`foo::into(Constructor) :: Iter f : G -> G f`

Returns a new object of type `Constructor` populated with the items of `foo`.

## map 
`foo::map(f) :: Iter f : (f -> g) -> Iter g`

Returns an iterator of `f` applied to each item of `foo`.

## partition (eager)
`foo::partition(getKey) :: Iter f : (f -> g) -> Map g [f]`

Partitions an iterator into a Map of Arrays.

## push
`foo::push(bar) :: Iter f : f -> Iter f`

Returns an iterator starting with the items of `foo` , followed by the item `bar`.

## reduce (eager)
`foo::reduce(reducerFn, init) :: Iter f : (g, f -> g), g -> g`

Reduces the items of `foo` with `reducerFn`.

## scan
`foo::scan(reducer,init)  Iter f : (g, f -> g), g -> Iter g`

Like `reduce`, but returns an iterator of each step of the reduction.

## sort (eager)
`foo::sort(comparator) :: Iter f : (f,f -> Number) -> Iter f`

Sort `foo` with `comparator`.  Same as `Array.prototype.sort`.

## sortBy (eager)
`foo::sortBy(getter) :: Iter f : (f -> g) -> Iter f`

Sort `foo` by comparing value returned by `getter`.

## take
`foo::take(count) :: Iter f : Number -> Iter f`

Returns an iterator of the first `count` items of `foo`.

## takeWhile
`foo::takeWhile(pred) :: Iter f : (f -> Boolean) -> Iter f`

Returns an iterator of the items of foo while `pred` returns true. 

## unique
`foo::unique() :: Iter f : Iter f`

Returns an iterator of unique items of `foo`.
