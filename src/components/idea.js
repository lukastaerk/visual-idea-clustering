import React, { Component } from "react";
import Draggable from "./draggable";
//import { colors } from "./../constants/index.json";
import { ideaColor, borderColor } from "./../constants/color";

export const renderIdeas = (ideas, container, dropZone) => {
  if (!ideas) return null;
  const ideasRender = ideas.map((idea, i) => {
    return (
      <Idea
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
  if (!el) return { textHeight: undefined, text: undefined };
  var text = el.innerHTML;
  var wordArray = el.innerHTML.split(" ");
  textHeight = el.scrollHeight;
  while (el.scrollHeight > el.offsetHeight) {
    wordArray.pop();
    text = wordArray.join(" ") + "...";
    el.innerHTML = text;
  }
  return { textHeight, text };
}

var styles = {
  ideaBox: {
    position: "absolute",
    borderRadius: 10,
    border: "2px solid " + borderColor,
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
    const { textHeight, text } = ellipsizeTextBox(
      "description" + this.props.data.id
    );
    this.setState({
      textHeight: textHeight,
      ellipText: text,
      hasOnClick: textHeight > styles.description.maxHeight
    });
  }

  handleDisplayFullText = ev => {
    this.setState(prevState => {
      return { displayFull: !prevState.displayFull };
    });
  };

  render() {
    const {
      data: { position, id, description },
      container,
      dropZone
    } = this.props;
    const { displayFull, textHeight, ellipText, hasOnClick } = this.state;

    var style = {
      ...styles.ideaBox,
      ...position,
      background: ideaColor
    };

    if (container.type === "BOARD") {
      style = { ...style, background: ideaColor };
    }
    if (container.type === "CLUSTER") {
      style = { ...style, ...styles.inCluster };
    }

    var text = ellipText && !displayFull ? ellipText : description;
    var styleTextBox = styles.description;
    if (displayFull) {
      style.height = style.height + textHeight - styles.description.maxHeight;
      styleTextBox = { ...styleTextBox, maxHeight: textHeight };
    }
    return (
      <Draggable
        id={id}
        dropZone={dropZone}
        type={"idea"}
        container={container}
        style={style}
      >
        <div>
          <h6 style={styles.h6}>{"Idea " + id}</h6>
          <div
            id={"description" + id}
            style={styleTextBox}
            onClick={hasOnClick ? this.handleDisplayFullText : null}
          >
            {text}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Idea;
