# iterator

## map

Iter f : (f -> g) -> Iter g

## forEach

Iter f : (f -> g) -> Iter f

## filter

Iter f : (f -> Boolean) -> Iter f 

## flatMap

Iter f : (f -> Iter g) -> Iter g

## partition

Iter f : (f -> g) -> Map g f

## into

Iter f : G -> G f

## reduce

Iter f : (g, f -> g), g -> g

## generate (non-curried)

f, (f -> f) -> Iter f

## scan

Iter f : (g, f -> g), g -> Iter g

## concat

Iter f : Iter f -> Iter f

## cons 

Iter f : f -> Iter f

## push

Iter f : f -> Iter f

## take

Iter f : Number -> Iter f

## takeWhile

Iter f : (f -> Boolean) -> Iter f

## drop

Iter f : Number -> Iter f

## dropWhile

Iter f : (f -> Boolean) -> Iter f

## unique

Iter f : Iter f

## first

Iter f : f -> f 

## sort

Iter f : (f,f -> Number) -> Iter f

## sortBy

Iter f : (f -> g) -> Iter f

# keyed

## get

Keyed k v : k -> v 

## set

Keyed k v : k, v -> Keyed k v

## has

Keyed k v : k -> Boolean

## remove

Keyed k v : k -> Keyed k v

## entries

Keyed k v : Iter [k,v]

## keys

Keyed k v : Iter k

## values

Keyed k v : Iter v

## fetch

Keyed k v : k , (Keyed k v -> v) -> v

## fetchIn

Keyed k v : [k], (Keyed k v -> v) -> v

## fetchEither

Keyed k v : Iter k, (Keyed k v -> v) -> v

## update

Keyed k v : k, (v -> v) -> Keyed k v

## updateIn

Keyed k v : [k], (v -> v) -> Keyed k v

## merge

Keyed k v : Keyed k v -> Keyed k v

## deepMerge

Keyed k v : Keyed k v -> Keyed k v

## removeIn

Keyed k v : [k] -> Keyed k v

## select

Keyed k v : Iter k -> Keyed k v

## omit

Keyed k v : Iter k -> Keyed k v

## rename

Keyed k v : Keyed k l -> Keyed l v

## match

Keyed k v : Keyed k v -> Boolean

# relation

Relation k v = Iter (Keyed k v)

## pluck

Rel k v : k -> Iter v

## select

Rel k v : Iter k -> Rel k v

## project

Rel k v : Keyed k l -> Rel l v

## where

Rel k v : Keyed k v -> Rel k v

## groupBy

Rel k v : k -> Map k (Rel k v)

## orderBy

Rel k v : k -> Rel k v

## index

Rel k v : k -> Map k (Keyed k v)

## join

Rel k v : Rel k v, Iter k -> Rel k v

## zip

Keyed k (Iter v) : Rel k v

