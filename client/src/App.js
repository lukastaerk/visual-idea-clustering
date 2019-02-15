import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import {
  Board,
  Header,
  MenuBar,
  IdeaStack,
  ClusterList,
  ActiveIdea,
  DisplayState
} from "./components";
import DATA from "./data";
import { downloadState } from "./utils";
import { loadIdeas, resetState } from "./actions";
import { backgroundColor } from "./constants/color";

class App extends Component {
  componentDidMount() {
    this.handleNextIdeas();
  }
  componentDidUpdate() {
    this.handleNextIdeas();
  }

  dataLoader = (fromIndex, toIndex, JSON_DATA) => {
    const data = JSON_DATA.slice(fromIndex, toIndex);
    var ideas = data.map(idea => {
      return {
        content: idea.content,
        "@id": idea["@id"],
        id: idea["@id"]
          .split("/")
          .filter(v => v !== "")
          .pop(),
        //title: idea.title ? idea.title : "Idea",
        position: { left: 0, top: 0 }
      };
    });
    return ideas.reverse();
  };

  handleNextIdeas = () => {
    const { stackIdeas, nextIndex } = this.props;
    if (stackIdeas.length !== 0) return null; //when stack still holdes ideas don't give more ideas
    const nextStack = this.dataLoader(nextIndex, nextIndex + 5, DATA["@graph"]);
    this.props.loadIdeas(nextStack);
  };

  render() {
    const { stackIdeas, boardIdeas, clusters, activeIdea } = this.props;

    return (
      <div className="container-fluid" style={{ background: backgroundColor }}>
        <Header
          handleDownloadState={() => downloadState(this.props)}
          handleResetState={this.props.resetState}
        />
        <div className="d-flex flex-row">
          <div className="float-left" style={{ width: 180 }}>
            <MenuBar />
            <IdeaStack
              name={"Idea Stack"}
              nextIdeas={stackIdeas}
              type="STACK"
            />
          </div>
          <Router style={{ overflow: "auto", height: "calc(100vh - 80px)" }}>
            <Board path="/" boardIdeas={boardIdeas} clusters={clusters} />
            <DisplayState path="/state" state={{ boardIdeas, clusters }} />
          </Router>
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
