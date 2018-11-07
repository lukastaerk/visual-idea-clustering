import React, { Component } from "react";
import { colors } from "./../constants/index.json";

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  dragStart = ev => {
    const { id, type } = this.props;
    const idea = this.node.current;
    var rect = idea.getBoundingClientRect();
    var x = ev.clientX - rect.x;
    var y = ev.clientY - rect.y;
    var data = { id: id, offset: { x: x, y: y }, type: type };
    ev.dataTransfer.setData("text", JSON.stringify(data));
  };

  // methods
  render() {
    const { style } = this.props;
    return (
      <div>
        <div
          style={style}
          ref={this.node}
          draggable
          onDragStart={this.dragStart}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Draggable;
