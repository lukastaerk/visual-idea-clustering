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
  ...state
});

const mapDispatchToProps = dispatch => ({
  loadIdeas: (...props) => dispatch(loadIdeas(...props)),
  resetState: () => dispatch(resetState())
});

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }
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
    const { stackIdeas, nextIndex } = this.props.clusteringReducer;
    if (stackIdeas.length !== 0) return null; //when stack still holdes ideas don't give more ideas

    const nextStack = this.dataLoader(nextIndex, nextIndex + 5, CHI19S1_ideas);
    this.props.loadIdeas(nextStack);
  };

  handleDownloadState = event => {
    const state = this.props.clusteringReducer;
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
    const { stackIdeas, boardIdeas, clusters } = this.props.clusteringReducer;
    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-auto">
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
          <div className="col container-fluid">
            <div className="row">
              <div className="col-12 board" ref={this.boardRef}>
                <Board boardIdeas={boardIdeas} clusters={clusters} />
              </div>
            </div>
          </div>
          <div className="col-auto">
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
