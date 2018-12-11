import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Board,
  Header,
  MenuBar,
  IdeaStack,
  ClusterList,
  DropZone
} from "./components";
import CHI19S1_ideas from "./data/CHI19S1-ideas.json";
import { loadIdeas, resetState } from "./actions";
var FileSaver = require("file-saver");

const mapStateToProps = state => ({
  ...state.present
});

const mapDispatchToProps = dispatch => ({
  loadIdeas: (...props) => dispatch(loadIdeas(...props)),
  resetState: () => dispatch(resetState())
});

class App extends Component {
  componentDidMount() {
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
    const { stackIdeas, boardIdeas, clusters } = this.props;
    return (
      <div className="container-fluid">
        <Header />
        <div className="d-flex flex-row">
          <div className="float-left" style={{ width: 180 }}>
            <MenuBar
              handleNextIdeas={this.handleNextIdeas}
              handleDownloadState={this.handleDownloadState}
              handleResetState={this.props.resetState}
            />
            <IdeaStack
              name={"Idea Stack"}
              nextIdeas={stackIdeas}
              type="STACK"
            />
            <DropZone sink={{ type: "TRASH" }}>
              <IdeaStack name={"Idea Trash"} type="TRASH" />
            </DropZone>
          </div>
          <Board boardIdeas={boardIdeas} clusters={clusters} />
          <div className="float-right">
            <ClusterList clusters={clusters} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
