import Cluster from "../models/cluster";

export default (
  state = { stackIdeas: [], boardIdeas: [], clusters: [] },
  { type: type, source: source, sink: sink, id: id, position: p }
) => {
  let index,
    boardIdeas,
    stackIdeas,
    clusters,
    idea,
    idea2,
    newCluster,
    newState;
  switch (type) {
    case "MOVE_IDEA":
      [idea, newState] = removeIdea(state, source, id);
      newState = dropIdea(newState, sink, idea, p);
      return newState;
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
    case "ClUSTER":
      [cluster, clusters] = removeElement(source.id, state.clusters);
      [idea, ideaList] = removeElement(id, cluster.ideas);
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
        boardIdeas: [...boardIdeas, { ...idea, position: p }]
      };
    case "STACK":
      return { ...state, stackIdeas: [...stackIdeas, idea] };
    case "ClUSTER":
      [cluster, clusters] = removeElement(sink.id, state.clusters);
      cluster.addIdea(idea);
      return { ...state, clusters: [...clusters, cluster] };
    case "IDEA":
      [idea2, boardIdeas] = removeElement(sink.id, state.boardIdeas);
      clusters = [...state.clusters, new Cluster(p, [idea, idea2])];
      return { ...state, clusters: clusters, boardIdeas: boardIdeas };
    default:
      return [null, state];
  }
}
