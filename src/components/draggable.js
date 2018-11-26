import React, { Component } from "react";
import { colors } from "./../constants/index.json";

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  handleDragStart = ev => {
    const { id, type, container } = this.props;
    const idea = this.node.current;
    var rect = idea.getBoundingClientRect();
    var x = ev.clientX - rect.x;
    var y = ev.clientY - rect.y;
    var data = {
      id: id,
      offset: { x: x, y: y },
      type: type,
      container: container
    };
    console.log(
      "draggable dragstart ",
      type,
      "class: ",
      ev.target.classList[1]
    );
    if (ev.target.classList[1] !== type) return null;
    ev.dataTransfer.setData("text", JSON.stringify(data));
  };

  // methods
  render() {
    const { style, id, dropZone, type } = this.props;
    return (
      <div
        className={dropZone + " " + type}
        style={style}
        ref={this.node}
        draggable
        onDragStart={this.handleDragStart}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
