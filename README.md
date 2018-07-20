[![Build Status](https://travis-ci.org/mister-what/reduced-utils.svg?branch=master)](https://travis-ci.org/mister-what/reduced-utils) [![codecov](https://codecov.io/gh/mister-what/reduced-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/mister-what/reduced-utils)
# reduced-utils
Tini immutability and reducer utils library

## Usage


### set

```js
import { set } from "reduced-utils";
const myObject = {
    someProp: "value"
};
const value = "Hello World";
const nextObject = set(myObject, ["some", "deep", "value"], value);

console.log(myObject) // {someProp: "value"}
console.log(nextObject) // {someProp: "value", some: {deep: {value: "Hello World"}}}

```

### combineReducers

```typescript
combineReducers(
  reducers: {
    [sliceName: string]: (
      state: Object, 
      action: Object
    ) => newState: Object
  },
  initialState?: Object
): (state: Object, action: Object) => newState: Object
```

See: https://redux.js.org/api-reference/combinereducers

```js
const rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer}, {});
```


### createReducer

```js
import { createReducer } from "reduced-utils";
import * as ActionTypes from "../constants/ActionTypes";

const initialState = {
    counter: 0
};

export const counterReducer = createReducer({
  [ActionTypes.INCREASE]: (state, {value = 1}) => ({...state, counter: state.counter + value}),
  [ActionTypes.DECREASE]: (state, {value = 1}) => ({...state, counter: state.counter - value})
}, initialState);

```


