import React, { Component } from "react";
import Draggable from "./draggable";
import { colors } from "./../constants/index.json";

export const renderIdeas = (ideas, container, dropZone) => {
  if (!ideas) return null;
  const ideasRender = ideas.map((idea, i) => {
    return (
      <Idea
        position={idea.position}
        container={container}
        dropZone={dropZone ? dropZone : "IDEA" + idea.id}
        key={idea.id}
        data={idea}
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
  inCluster: {
    position: "relative",
    top: 0,
    left: 0,
    float: "left"
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
    const { data, position, container, dropZone } = this.props;
    const { displayFull, textHeight, ellipText } = this.state;

    const handleDisplayFullText =
      this.state.textHeight > styles.description.maxHeight
        ? this.handleDisplayFullText
        : null;
    var style = {
      background:
        container.type == "BOARD" ? colors.board.idea : colors.idea.background,
      ...styles.ideaBox,
      ...position
    };
    if (container.type === "CLUSTER") {
      style = { ...style, ...styles.inCluster };
    }

    var styleTextBox = styles.description;
    var description = ellipText ? ellipText : data.description;
    if (displayFull) {
      style.height = style.height + textHeight - 80;
      styleTextBox = { maxHeight: textHeight, fontSize: 10 };
      description = data.description;
    }
    return (
      <Draggable
        id={data.id}
        dropZone={dropZone}
        type={"idea"}
        container={container}
        style={style}
      >
        <div className={dropZone}>
          <h6 className={dropZone} style={styles.h6}>
            {"Idea " + data.id}
          </h6>
          <div
            className={dropZone}
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
