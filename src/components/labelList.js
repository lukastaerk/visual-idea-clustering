import React, { Component } from "react";
import { labelIcon } from "../icons";
import { Section, EditButton, Li, XButton } from "../styledComponents";

const styles = {
  input: {
    backgroundColor: "#f1f8ff",
    border: 0,
    borderBottomRightRadius: 3,
    borderLeft: "1px solid #b4d9ff",
    borderTopRightRadius: 3,
    color: "#6a737d",
    display: "inline-flex",
    fontSize: 14,
    padding: ".1em .6em"
  },
  block: {
    display: "inline",
    paddingLeft: 0
  }
};
class LabelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        onEdit: false
      });
    }
  }

  handleEdit = event => {
    if (this.state.onEdit) {
      this.handleInput({ key: "Enter" });
    }
    this.setState(prevState => ({
      onEdit: !prevState.onEdit
    }));
  };
  handleInput = event => {
    if (event.key === "Enter" || event.key === " ") {
      const value = this.input.value.trim();
      if (value.length <= 0) return (this.input.value = "");
      const labels = this.props.labels ? this.props.labels : [];
      this.props.handleSave({ labels: [value, ...labels] });
      this.input.value = "";
    }
  };

  handleDeleteLabel = index => {
    const { labels } = this.props;
    this.props.handleSave({
      labels: [...labels.slice(0, index), ...labels.slice(index + 1)]
    });
  };

  render() {
    const labels = this.props.labels ? this.props.labels : [];
    const { onEdit } = this.state;
    return (
      <div className="clearfix">
        <Section>
          <div style={{ float: "left", paddingTop: ".5rem" }}>Labels:</div>
          <div style={{ float: "right" }}>
            <img alt="label" height="40" src={labelIcon} />
            <EditButton onClick={this.handleEdit}>
              {onEdit ? "Save" : "Edit"}
            </EditButton>
          </div>
        </Section>
        {onEdit ? (
          <input
            ref={node => (this.input = node)}
            style={styles.input}
            onKeyPress={this.handleInput}
            autoFocus
            type="text"
          />
        ) : null}
        <ul style={styles.block}>
          {labels.map((label, index) => (
            <Li key={index}>
              {label}
              {onEdit ? (
                <XButton onClick={() => this.handleDeleteLabel(index)}>
                  x
                </XButton>
              ) : null}
            </Li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LabelList;
