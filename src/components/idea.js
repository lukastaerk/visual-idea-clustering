import React, { Component } from "react";
import Draggable from "./draggable";
import { colors } from "./../constants/index.json";

export const renderIdeas = (ideas, type = false) => {
  const ideasRender = ideas.map((idea, i) => {
    return (
      <Idea
        position={
          type == "cluster" ? { position: null, float: "left" } : idea.position
        }
        key={idea.id}
        data={idea}
        type={type}
      />
    );
  });
  return ideasRender;
};

function ellipsizeTextBox(id) {
  var textHeight = 0;
  var el = document.getElementById(id);
  if (!el) return { textHeight: null, text: null };
  var text = el.innerHTML;
  var wordArray = el.innerHTML.split(" ");
  textHeight = el.scrollHeight;
  while (el.scrollHeight > el.offsetHeight) {
    wordArray.pop();
    text = wordArray.join(" ") + "...";
    el.innerHTML = text;
  }
  return { textHeight: textHeight, text: text };
}

var styles = {
  ideaBox: {
    position: "absolute",
    borderRadius: 10,
    border: "2px solid " + colors.idea.border,
    width: 120,
    height: 120,
    cursor: "move",
    zIndex: 2
  },
  description: {
    fontSize: 10,
    maxHeight: 80
  },
  h6: {
    textAlign: "center"
  }
};

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textHeight: styles.description.maxHeight,
      displayFull: false
    };
    this.ideaRef = React.createRef();
  }

  componentDidMount() {
    const { textHeight, text } = ellipsizeTextBox("des" + this.props.data.id);
    this.setState({
      textHeight: textHeight,
      ellipText: text
    });
  }

  handleDisplayFullText = ev => {
    this.setState(prevState => {
      return { displayFull: !prevState.displayFull };
    });
  };

  render() {
    const { data, position, type } = this.props;
    const { displayFull, textHeight, ellipText } = this.state;

    const handleDisplayFullText =
      this.state.textHeight > styles.description.maxHeight
        ? this.handleDisplayFullText
        : null;
    var style = {
      background:
        type == "boardIdeas" ? colors.board.idea : colors.idea.background,
      ...styles.ideaBox,
      ...position
    };

    var styleTextBox = styles.description;
    var description = ellipText ? ellipText : data.description;
    if (displayFull) {
      style.height = style.height + textHeight - 80;
      styleTextBox = { maxHeight: textHeight, fontSize: 10 };
      description = data.description;
    }
    return (
      <Draggable id={data.id} type={type} style={style}>
        <div>
          <h6 style={styles.h6}>{"Idea " + data.id}</h6>
          <div
            id={"des" + data.id}
            style={styleTextBox}
            onClick={handleDisplayFullText}
          >
            {description}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Idea;
