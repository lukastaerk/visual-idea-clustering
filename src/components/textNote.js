import React, { Component } from "react";
import { textnoteIcon } from "../icons";
import { Section } from "../styledComponents";

class TextNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.textnote !== this.props.textnote) {
      this.setState({
        onEdit: false
      });
    }
  }

  handleEdit = event => {
    if (this.state.onEdit) {
      this.props.handleSave({ textnote: this.textarea.value });
    }
    this.setState(prevState => ({
      onEdit: !prevState.onEdit
    }));
  };
  render() {
    const { textnote } = this.props;
    const { onEdit } = this.state;
    return (
      <div className="clearfix">
        <Section>
          <div style={{ float: "left", paddingTop: ".5rem" }}>Textnote:</div>
          <div style={{ float: "right" }}>
            <img alt="textnote" height="40" src={textnoteIcon} />
            <EditButton onEdit={onEdit} handleEdit={this.handleEdit} />
          </div>
        </Section>
        {onEdit ? (
          <textarea
            ref={node => (this.textarea = node)}
            defaultValue={textnote}
          />
        ) : (
          <div style={{ marginLeft: "5px", fontSize: 14 }}>{textnote}</div>
        )}
      </div>
    );
  }
}

export const EditButton = ({ handleEdit, onEdit }) => (
  <button
    style={{ margin: "5px 5px" }}
    type="button"
    className="btn btn-sm small"
    onClick={handleEdit}
  >
    {onEdit ? "Save" : "Edit"}
  </button>
);

export default TextNote;
