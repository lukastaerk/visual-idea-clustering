import React, { Component } from "react";
import { textnoteIcon } from "../icons";
import { Section, EditButton } from "../styledComponents";

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
    if (this.state.onEdit && this.textarea.value.trim().length > 0) {
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
            <EditButton onClick={this.handleEdit}>
              {onEdit ? "Save" : "Edit"}
            </EditButton>
          </div>
        </Section>
        {onEdit ? (
          <textarea
            ref={node => (this.textarea = node)}
            defaultValue={textnote}
            onFocus={focusLast}
            autoFocus
          />
        ) : (
          <div style={{ marginLeft: "5px", fontSize: 14 }}>{textnote}</div>
        )}
      </div>
    );
  }
}

const focusLast = e => {
  var temp_value = e.target.value;
  e.target.value = "";
  e.target.value = temp_value;
};

export default TextNote;
