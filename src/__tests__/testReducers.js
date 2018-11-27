import deepFreeze from "deep-freeze";
import clusteringReducer from "../reducers/clusteringReducer";
import { moveIdea, moveCluster, loadIdeas } from "../actions";

it("add ideas to stackIdeas", () => {
  expect(
    clusteringReducer(
      { stackIdeas: [1, 2, 3], nextIndex: 3 },
      { type: "LOAD_IDEAS", ideas: [5, 6] }
    )
  ).toEqual({ stackIdeas: [1, 2, 3, 5, 6], nextIndex: 5 });
});

it("move idea on board", () => {
  const stateBefor = { boardIdeas: [{ id: 1, position: 1 }] };
  const stateAfter = { boardIdeas: [{ id: 1, position: 2 }] };
  deepFreeze(stateBefor);
  deepFreeze(stateAfter);
  expect(
    clusteringReducer(stateBefor, {
      type: "MOVE_IDEA",
      source: { type: "BOARD" },
      sink: { type: "BOARD" },
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
    clusteringReducer(stateBefor, {
      type: "MOVE_IDEA",
      source: { type: "STACK" },
      sink: { type: "BOARD" },
      id: 2,
      position: 2
    })
  ).toEqual(stateAfter);
});
