import Cluster from "../models/cluster";

export default (
  state = { stackIdeas: [], boardIdeas: [], clusters: [], nextIndex: 0 },
  action
) => {
  const { type } = action;
  var idea, newState;
  switch (type) {
    case "MOVE_IDEA":
      const { source, sink, id, position } = action;
      [idea, newState] = removeIdea(state, source, id);
      newState = dropIdea(newState, sink, idea, position);
      return newState;
    case "LOAD_IDEAS":
      const { ideas } = action;
      const stackIdeas = [...state.stackIdeas, ...ideas];
      return {
        ...state,
        stackIdeas: stackIdeas,
        nextIndex: ideas.length + state.nextIndex
      };
    case "MOVE_CLUSTER":
      var clusters, c;
      const { id: c_id, position: p } = action;
      [c, clusters] = removeElement(c_id, state.clusters);
      console.log(c_id, c, clusters);
      return { ...state, clusters: [...clusters, { ...c, position: p }] };
    default:
      return state;
  }
};

/**
 * input @array - a list mit object holding an id
 * return the object holding the id and the array without the object
 **/
function removeElement(id, array) {
  let index = array.findIndex(a => a.id === id);
  let resultArray = [...array.slice(0, index), ...array.slice(index + 1)];
  return [array[index], resultArray];
}
function removeIdea(state, source, id) {
  let boardIdeas, stackIdeas, clusters, idea, cluster, ideaList;
  switch (source.type) {
    case "BOARD":
      [idea, boardIdeas] = removeElement(id, state.boardIdeas);
      return [idea, { ...state, boardIdeas: boardIdeas }];
    case "STACK":
      [idea, stackIdeas] = removeElement(id, state.stackIdeas);
      return [idea, { ...state, stackIdeas: stackIdeas }];
    case "CLUSTER":
      [cluster, clusters] = removeElement(source.id, state.clusters);
      [idea, ideaList] = removeElement(id, cluster.ideas);
      if (ideaList.length < 1) {
        return [idea, { ...state, clusters: clusters }];
      }
      return [
        idea,
        { ...state, clusters: [...clusters, { ...cluster, ideas: ideaList }] }
      ];
    default:
      return [null, state];
  }
}

function dropIdea(state, sink, idea, p) {
  let boardIdeas, stackIdeas, clusters, cluster, idea2;
  switch (sink.type) {
    case "BOARD":
      return {
        ...state,
        boardIdeas: [...state.boardIdeas, { ...idea, position: p }]
      };
    case "STACK":
      return { ...state, stackIdeas: [...state.stackIdeas, idea] };
    case "CLUSTER":
      [cluster, clusters] = removeElement(sink.id, state.clusters);
      cluster = { ...cluster, ideas: [...cluster.ideas, idea] };
      return { ...state, clusters: [...clusters, cluster] };
    case "IDEA":
      [idea2, boardIdeas] = removeElement(sink.id, state.boardIdeas);
      clusters = [...state.clusters, new Cluster(p, [idea, idea2])];
      return { ...state, clusters: clusters, boardIdeas: boardIdeas };
    case "TRASH":
      return state;
    default:
      return state;
  }
}
