import React, { Component } from "react";
import { textnoteIcon } from "../icons";

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
      <div>
        <img alt="textnote" height="40" src={textnoteIcon} />
        <EditButton onEdit={onEdit} handleEdit={this.handleEdit} />
        {onEdit ? (
          <textarea
            ref={node => (this.textarea = node)}
            defaultValue={textnote}
          />
        ) : (
          textnote
        )}
      </div>
    );
  }
}

export const EditButton = ({ handleEdit, onEdit }) => (
  <button type="button" className="btn btn-sm small" onClick={handleEdit}>
    {onEdit ? "Save" : "Edit"}
  </button>
);

export default TextNote;
