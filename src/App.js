import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "./components/board";
import Header from "./components/header";
import MenuBar from "./components/menuBar";
import IdeaStack from "./components/ideaStack";
import CHI19S1_ideas from "./data/CHI19S1-ideas.json";

import { loadIdeas } from "./actions/loadIdeas";
import { moveIdea } from "./actions/moveIdea";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  loadIdeas: (...props) => dispatch(loadIdeas(...props)),
  moveIdea: (...props) => dispatch(moveIdea(...props))
});

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }
  componentDidMount() {
    const { nextIndex } = this.props.clusteringReducer;
    const nextIdeas = this.dataLoader(nextIndex, nextIndex + 5, CHI19S1_ideas);
    this.props.loadIdeas(nextIdeas);
  }
  dataLoader = (fromIndex, toIndex, JSON_DATA) => {
    const data = JSON_DATA.slice(fromIndex, toIndex);
    var ideas = data.map(idea => {
      return { ...idea, position: { left: 0, top: 0 } };
    });
    return ideas.reverse();
  };

  handleDropTrash = ev => {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    const { id, type, container } = data;
    if (type !== "idea") return null;
    this.props.moveIdea(container, { type: "TRASH" }, id);
  };

  handleNextIdeas = () => {
    const { stackIdeas, nextIndex } = this.props.clusteringReducer;
    if (stackIdeas.length !== 0) return null; //when stack still holdes ideas don't give more ideas

    const nextStack = this.dataLoader(
      nextIndex + 5,
      nextIndex + 10,
      CHI19S1_ideas
    );
    this.props.loadIdeas(nextStack);
  };

  render() {
    const { stackIdeas, boardIdeas, clusters } = this.props.clusteringReducer;
    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-auto">
            <MenuBar handleNextIdeas={this.handleNextIdeas} />
            <IdeaStack isTrash={false} nextIdeas={stackIdeas} />
            <IdeaStack isTrash={true} handleDropTrash={this.handleDropTrash} />
          </div>
          <div className="col container-fluid">
            <div className="row">
              <div className="col-12 board" ref={this.boardRef}>
                <Board boardIdeas={boardIdeas} clusters={clusters} />
              </div>
            </div>
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
