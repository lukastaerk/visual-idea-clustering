import React, { Component } from "react";
import Draggable from "./draggable";
import { colors } from "./../constants/index.json";

export const renderClusters = clusters => {
  const clustersRender = clusters.map((cluster, i) => {
    return (
      <Cluster position={cluster.position} key={cluster.id} id={cluster.id} />
    );
  });
  return clustersRender;
};

var styles = {
  clusterBox: {
    //position: "absolute",
    borderRadius: 10,
    border: "2px solid " + colors.idea.border,
    background: colors.cluster.background,
    touchAction: "none",
    cursor: "move",
    zIndex: 1,
    margin: "0 auto"
    //boxSizing: "border-box"
  },
  h6: {
    textAlign: "center"
  }
};

export class Cluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.position.width,
      height: props.position.height
    };
  }

  allowDrop = ev => {
    ev.preventDefault();
    console.log(ev.type);
  };

  drop = ev => {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    console.log(data.id, data.type);
  };

  handleResize = event => {
    const current = this.nv;
    console.log("resize", current.offsetWidth, current.offsetHeight);
    this.setState({
      width: current.offsetWidth,
      height: current.offsetHeight
    });
  };

  render() {
    const { id, position } = this.props;
    const { width, height } = this.state;
    var pos = position ? position : {};
    var style = { ...styles.clusterBox, ...this.state };

    return (
      <div
        ref={elem => (this.nv = elem)}
        onMouseUp={this.handleResize}
        onDragLeave={this.allowDrop}
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        style={{
          resize: "both",
          border: "1px solid black",
          position: "absolute",
          overflow: "auto",
          top: pos.top,
          left: pos.left,
          width: width + 3,
          height: height + 3,
          zIndex: 1
        }}
      >
        <Draggable id={id} type={"clusters"} style={style}>
          <div
            id={"cluster" + id}
            onDragOver={this.allowDrop}
            onDrop={this.drop}
          >
            <h6 style={styles.h6}>{"Cluster " + id}</h6>
          </div>
        </Draggable>
      </div>
    );
  }
}
