import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import {
  Board,
  Header,
  IdeaStack,
  ClusterList,
  ActiveIdea
} from "./components";
import { downloadState } from "./utils";
import { loadIdeas, resetState } from "./actions";
import { backgroundColor } from "./constants/color";

class App extends Component {
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
            <IdeaStack
              name={"Idea Stack"}
              stackIdeas={stackIdeas}
              type="STACK"
            />
          </div>
          <Router style={{ overflow: "auto", height: "calc(100vh - 80px)" }}>
            <Board path="/" boardIdeas={boardIdeas} clusters={clusters} />
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
