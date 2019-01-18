import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Board,
  Header,
  MenuBar,
  IdeaStack,
  ClusterList,
  DropZone,
  ActiveIdea
} from "./components";
import CHI19S1_ideas from "./data/CHI19S1-ideas.json";
import { loadIdeas, resetState } from "./actions";
import { backgroundColor, lightRed } from "./constants/color";
var FileSaver = require("file-saver");

class App extends Component {
  componentDidMount() {
    this.handleNextIdeas();
  }
  componentDidUpdate(prevProps) {
    this.handleNextIdeas();
  }

  dataLoader = (fromIndex, toIndex, JSON_DATA) => {
    const data = JSON_DATA.slice(fromIndex, toIndex);
    var ideas = data.map(idea => {
      return { ...idea, position: { left: 0, top: 0 } };
    });
    return ideas.reverse();
  };

  handleNextIdeas = () => {
    const { stackIdeas, nextIndex } = this.props;
    if (stackIdeas.length !== 0) return null; //when stack still holdes ideas don't give more ideas
    const nextStack = this.dataLoader(nextIndex, nextIndex + 5, CHI19S1_ideas);
    this.props.loadIdeas(nextStack);
  };

  handleDownloadState = event => {
    const state = this.props;
    let date = new Date();
    var blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    FileSaver.saveAs(
      blob,
      "Clustering-State-" +
        date
          .toGMTString()
          .split(" ")
          .join("-") +
        ".json"
    );
  };

  render() {
    const { stackIdeas, boardIdeas, clusters, activeIdea } = this.props;

    return (
      <div className="container-fluid" style={{ background: backgroundColor }}>
        <Header />
        <div className="d-flex flex-row">
          <div className="float-left" style={{ width: 180 }}>
            <MenuBar
              handleDownloadState={this.handleDownloadState}
              handleResetState={this.props.resetState}
            />
            <IdeaStack
              name={"Idea Stack"}
              nextIdeas={stackIdeas}
              type="STACK"
            />
            <DropZone sink={{ type: "TRASH" }} dropColor={lightRed}>
              <IdeaStack name={"Idea Trash"} type="TRASH" />
            </DropZone>
          </div>
          <Board boardIdeas={boardIdeas} clusters={clusters} />
          <div className="float-right" style={{ width: 400 }}>
            {activeIdea ? (
              <ActiveIdea
                {...activeIdea}
                {...findIdea(activeIdea, this.props)}
              />
            ) : (
              <ClusterList clusters={clusters} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
const findIdea = ({ id, container }, props) => {
  switch (container.type) {
    case "BOARD":
      return props.boardIdeas.find(i => i.id === id);
    case "STACK":
      return props.stackIdeas.find(i => i.id === id);
    case "CLUSTER":
      return props.clusters
        .find(ci => ci.id === container.id)
        .ideas.find(i => i.id === id);
    default:
      return {};
  }
};

const mapStateToProps = state => ({
  ...state.clustering.present,
  activeIdea: state.activeIdea
});

const mapDispatchToProps = dispatch => ({
  loadIdeas: (...props) => dispatch(loadIdeas(...props)),
  resetState: () => dispatch(resetState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
