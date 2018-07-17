import {
  combineReducers,
  set,
  createReducer,
  composeReducers,
  applyActions
} from "./utils";

describe("util tests", () => {
  describe("combine reducers", () => {
    const reducer = combineReducers({
      sliceA: (state = {}, { type = "NO_TYPE", value = null }) =>
        String(type).startsWith("A")
          ? { ...state, [type]: value }
          : String(type).includes("both") ? set(state, ["deep"], value) : state,
      sliceB: (state = {}, { type = "NO_TYPE", value = null }) =>
        String(type).startsWith("B")
          ? set(state, ["deep", type], value)
          : String(type).includes("both")
            ? set(state, ["both", String(type)], value)
            : state
    });
    let initState;
    beforeEach(() => {
      initState = reducer();
    });
    test("should return a default when no state is passed", () => {
      expect(initState).toEqual({
        sliceA: {},
        sliceB: {}
      });
    });
    test("should reduce slice A", () => {
      const result = reducer(initState, { type: "A_action", value: "hello" });
      expect(result).toEqual({
        sliceA: {
          A_action: "hello"
        },
        sliceB: {}
      });
    });
    test("should reduce slice B", () => {
      initState = reducer(initState, { type: "A_action", value: "hello" });
      const result = reducer(initState, { type: "B_action", value: "world" });
      expect(result).toEqual({
        sliceA: {
          A_action: "hello"
        },
        sliceB: {
          deep: {
            B_action: "world"
          }
        }
      });
    });
    test("should reduce both", () => {
      initState = reducer(initState, { type: "A_action", value: "hello" });
      initState = reducer(initState, { type: "B_action", value: "world" });
      const result = reducer(initState, { type: "in_both", value: 42 });
      expect(result).toEqual({
        sliceA: {
          A_action: "hello",
          deep: 42
        },
        sliceB: {
          both: {
            in_both: 42
          },
          deep: {
            B_action: "world"
          }
        }
      });
    });
  });
  describe("createReducer", () => {
    const reducer = createReducer(
      {
        ADD_TO_LIST: (state, { item: { id = "0", ...restItem } = {} }) => ({
          ...state,
          items: { ...state.items, [id]: { ...restItem, id } },
          list: [...state.list, id]
        }),
        REMOVE_FROM_LIST: (state, { item: { id = "0", ...restItem } = {} }) => {
          const nextItems = { ...state.items, [id]: undefined };
          delete nextItems[id];
          return {
            ...state,
            items: nextItems,
            list: state.list.filter(listItemId => listItemId !== id)
          };
        }
      },
      { list: [], items: {} }
    );
    test("should create init", () => {
      const result = reducer();
      expect(result).toEqual({ items: {}, list: [] });
    });
    test("should add list items init", () => {
      const apply = applyActions(reducer(), [
        { type: "ADD_TO_LIST", item: { id: "jonas", value: 1 } },
        { type: "ADD_TO_LIST", item: { id: "ich", value: 2 } },
        { type: "ADD_TO_LIST", item: { id: "me", value: "12" } },
        { type: "REMOVE_FROM_LIST", item: { id: "ich" } }
      ]);
      const result = apply(reducer);
      expect(result).toEqual({
        items: {
          jonas: { id: "jonas", value: 1 },
          me: { id: "me", value: "12" }
        },
        list: ["jonas", "me"]
      });
    });
  });
});
