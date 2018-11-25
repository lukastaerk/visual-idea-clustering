import React, { Component } from "react";
import { connect } from "react-redux";
import { colors } from "./../constants/index.json";
import { moveIdea } from "../actions/moveIdea";

const mapDispatchToProps = dispatch => ({
  moveIdea: (...props) => dispatch(moveIdea(...props))
});

const mapStateToProps = state => ({
  ...state
});

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
    ev.dataTransfer.setData("text", JSON.stringify(data));
  };

  handleDragEnd = event => {
    let board = document.getElementById("board");
    const { top, left } = board.getBoundingClientRect();
    var data = JSON.parse(event.dataTransfer.getData("text"));
    const { x, y } = data.offset;
    let position = {
      left: event.clientX - x - left,
      top: event.clientY - y - top
    };

    const { type, container, id } = this.props;
    if (type === "idea") {
      let sink = event.target.class;

      this.props.moveIdea(container, sink, id, position);
    }
  };

  // methods
  render() {
    const { style, id } = this.props;
    return (
      <div
        className={id}
        style={style}
        ref={this.node}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draggable);
