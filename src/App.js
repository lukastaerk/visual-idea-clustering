import React, { Component } from "react";
import Board from "./components/board";
import Header from "./components/header";
import MenuBar from "./components/menuBar";
import IdeaStack from "./components/ideaStack";
import CHI19S1_ideas from "./data/CHI19S1-ideas.json";
import "./App.css";
import Cluster from "./models/cluster";
const { isDistanceSmaler } = require("./utils/helpers");

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.state = {
      nextIdeas: [],
      boardIdeas: [],
      nextIdeasIndex: 0,
      clusters: [],
      isDrawingCluster: false
    };
  }
  componentDidMount() {
    const { nextIdeasIndex } = this.state;
    const nextIdeas = this.dataLoader(
      nextIdeasIndex,
      nextIdeasIndex + 5,
      CHI19S1_ideas
    );
    this.setState({
      nextIdeas: nextIdeas
    });
  }
  dataLoader = (fromIndex, toIndex, JSON_DATA) => {
    const data = JSON_DATA.slice(fromIndex, toIndex);
    var ideas = data.map(idea => {
      idea.position = { left: 0, top: 0 };
      return idea;
    });
    return ideas.reverse();
  };
  handleDrop = (data, position) => {
    var { state } = this;

    var closeIdeas = state.boardIdeas.filter(idea =>
      isDistanceSmaler(position, idea.position, 20)
    );
    console.log(closeIdeas);
    var index;
    if (closeIdeas.length > 0) {
      index = state[data.type].findIndex(i => i.id == data.id);
      var idea = state[data.type].splice(index, 1);
      var newCluster = new Cluster(closeIdeas[0].position, [
        ...closeIdeas,
        idea[0]
      ]);
      state.clusters = [...state.clusters, newCluster];
      console.log(newCluster);
      return this.setState({
        state
      });
    }
    console.log(data.type);
    switch (data.type) {
      case "clusters":
        index = state.clusters.findIndex(cluster => cluster.id == data.id);
        state.clusters[index].position = position;
        break;
      case "boardIdeas":
        index = state.boardIdeas.findIndex(idea => idea.id == data.id);
        state.boardIdeas[index].position = position;
        break;
      case "nextIdeas":
        index = state.nextIdeas.findIndex(i => i.id == data.id);
        var idea = state.nextIdeas.splice(index, 1);
        idea[0].position = position;
        state.boardIdeas.push(idea[0]);
        break;
    }
    console.log(state);
    this.setState({
      state
    });
  };

  handleDropTrash = ev => {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));

    var list = [];
    switch (data.type) {
      case "clusters":
        list = this.state.clusters;
        break;
      case "boardIdeas":
        list = this.state.boardIdeas;
        break;
      case "nextIdeas":
        list = this.state.nextIdeas;
        break;
    }

    var index = list.findIndex(idea => idea.id == data.id);
    list.splice(index, 1);
    this.setState({
      [data.type]: list
    });
  };

  handleNextIdeas = () => {
    console.log("handleNextIdeas");
    const { nextIdeasIndex, nextIdeas } = this.state;

    if (nextIdeas.length !== 0) return null; //when stack still holdes ideas don't give more ideas

    const nextStack = this.dataLoader(
      nextIdeasIndex + 5,
      nextIdeasIndex + 10,
      CHI19S1_ideas
    );
    this.setState(prevState => {
      return {
        nextIdeasIndex: prevState.nextIdeasIndex + 5,
        nextIdeas: prevState.nextIdeas.concat(nextStack)
      };
    });
  };

  handleDrawCluster = ev => {
    this.setState(prevState => {
      return { isDrawingCluster: !prevState.isDrawingCluster };
    });
  };
  createCluster = (x, y, width, height) => {
    let nextClusterId = this.state.clusters.length + 1;
    var cluster = {
      id: nextClusterId,
      position: { top: y, left: x },
      width: width,
      height: height
    };
    this.setState(prevState => {
      return { clusters: [...prevState.clusters, cluster] };
    });
    this.handleDrawCluster();
    console.log(this.state.clusters);
  };

  render() {
    const { nextIdeas, boardIdeas, isDrawingCluster, clusters } = this.state;

    return (
      <div className="App">
        <Header />
        <div className="row">
          <div className="col-2">
            <MenuBar
              handleNextIdeas={this.handleNextIdeas}
              handleDrawCluster={this.handleDrawCluster}
              isDrawingCluster={isDrawingCluster}
            />
            <IdeaStack isTrash={false} nextIdeas={nextIdeas} />
            <IdeaStack isTrash={true} handleDropTrash={this.handleDropTrash} />
          </div>
          <div className="col-9 board" ref={this.boardRef}>
            <Board
              boardIdeas={boardIdeas}
              clusters={clusters}
              handleDrop={this.handleDrop}
              isDrawingCluster={isDrawingCluster}
              createCluster={this.createCluster}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
