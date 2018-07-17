function isPlainObj(o) {
  return typeof o === "object" && o.constructor === Object;
}

export const createReducer = (reducers = {}, initState = {}) => (
  state = initState,
  { type, ...action } = {}
) => {
  if (type in reducers) {
    return reducers[type](state, { ...action, type });
  }
  return state;
};

export const combineReducers = (reducers = {}, initState = {}) => (
  state = initState,
  action = {}
) =>
  Object.keys(reducers).reduce((nextState, key) => {
    if (typeof reducers[key] === "function") {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  }, {});

export const set = (obj, path = [], value) => {
  if (!Array.isArray(path))
    throw new TypeError(
      "parameter 2 (path) must be an array of strings/numbers."
    );
  if (!path.length) {
    return value;
  }
  const [key, ...restPath] = path;
  if (typeof key !== "string" && typeof key !== "number")
    throw new TypeError(
      "parameter 2 (path) must be an array of strings/numbers."
    );
  let result;
  if (Array.isArray(obj)) {
    return Object.assign(new Array(obj.length), obj, {
      [key]: set(obj[key], restPath, value)
    });
  } else if (isPlainObj(obj)) {
    return { ...obj, [key]: set(obj[key], restPath, value) };
  } else {
    if (typeof key === "number") {
      return Object.assign(new Array(key).fill(undefined), {
        [key]: set(undefined, restPath, value)
      });
    }
    return { [key]: set(undefined, restPath, value) };
  }
};

export const composeReducers = (...reducers) => (state = {}, action = {}) =>
  reducers.reduceRight((state, reducer) => reducer(state, action), state);

export const applyActions = (initState = {}, actions = []) => reducer =>
  actions.reduce(reducer, initState);
