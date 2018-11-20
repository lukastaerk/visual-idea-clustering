import deepFreeze from "deep-freeze";
import simpleReducer from "../reducers/simpleReducer";
import moveIdeaReducer from "../reducers/moveIdeaReducer";
import loadIdeaReducer from "../reducers/loadIdeaReducer";

const testSimpleAction = () => {
  const counterBefor = 0;
  const action = {
    type: "INCREMENT"
  };
  const counterAfter = 1;

  expect(simpleReducer(counterBefor, action)).toEqual(counterAfter);
};

it("simple Increment Test", () => {
  testSimpleAction();
});

it("add ideas to nextIdeas", () => {
  expect(
    loadIdeaReducer(
      { stackIdeas: [1, 2, 3] },
      { type: "LOAD_IDEAS", ideas: [5, 6] }
    )
  ).toEqual({ stackIdeas: [1, 2, 3, 5, 6] });
});

it("move idea on board", () => {
  const stateBefor = { boardIdeas: [{ id: 1, position: 1 }] };
  const stateAfter = { boardIdeas: [{ id: 1, position: 2 }] };
  deepFreeze(stateBefor);
  deepFreeze(stateAfter);

  expect(
    moveIdeaReducer(stateBefor, {
      type: "MOVE_IDEA_BOARD_BOARD",
      id: 1,
      position: 2
    })
  ).toEqual(stateAfter);
});
it("move idea from stack to board", () => {
  const stateBefor = {
    stackIdeas: [{ id: 2, position: 0 }],
    boardIdeas: [{ id: 1, position: 1 }]
  };
  const stateAfter = {
    stackIdeas: [],
    boardIdeas: [{ id: 1, position: 1 }, { id: 2, position: 2 }]
  };
  deepFreeze(stateBefor);
  deepFreeze(stateAfter);

  expect(
    moveIdeaReducer(stateBefor, {
      type: "MOVE_IDEA_STACK_BOARD",
      id: 2,
      position: 2
    })
  ).toEqual(stateAfter);
});
