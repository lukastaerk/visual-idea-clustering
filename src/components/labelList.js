import React, { Component } from "react";
import { labelIcon } from "../icons";
import { EditButton } from "./textNote";
import { Section } from "../styledComponents";

const styles = {
  label: {
    alignItems: "center",
    backgroundColor: "#f1f8ff",
    borderRadius: 3,
    display: "inline-flex",
    margin: ".4em .4em 0 0",
    padding: ".1em .6em"
  },
  btn: {
    backgroundColor: "#f1f8ff",
    border: 0,
    borderBottomRightRadius: 3,
    borderLeft: "1px solid #b4d9ff",
    borderTopRightRadius: 3,
    color: "#6a737d",
    display: "inline-block",
    width: 26,
    fontSize: 14,
    marginRight: "-.6em"
  },
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
      this.handleInput({ ...event, target: this.input, key: "Enter" });
    }
    this.setState(prevState => ({
      onEdit: !prevState.onEdit
    }));
  };
  handleInput = event => {
    if (event.key === "Enter" || event.key === " ") {
      const value = event.target.value.trim();
      if (value.length <= 0) return (event.target.value = "");
      const labels = this.props.labels ? this.props.labels : [];
      this.props.handleSave({ labels: [value, ...labels] });
      event.target.value = "";
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
            <EditButton handleEdit={this.handleEdit} onEdit={onEdit} />
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
          {labels.map((l, i) => (
            <li key={i} style={styles.label}>
              {l}
              {onEdit ? (
                <button
                  onClick={() => {
                    this.handleDeleteLabel(i);
                  }}
                  style={styles.btn}
                >
                  x
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LabelList;
