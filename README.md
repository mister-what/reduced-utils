# reduced-utils
Tini immutability and reducer utils library

## Usage


### `set`

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

### `combineReducers`


### `createReducer`

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

### `applyActions`


### `composeReducers`

