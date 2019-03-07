import React, { Component } from "react";
import { connect } from "react-redux";
import { renameCluster } from "../actions";
import { edit } from "../icons";
import { EditButton, H6 } from "../styledComponents";

class RenameableH6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onRename: false
    };
  }

  handleRename = event => {
    this.setState(prevState => {
      return {
        onRename: !prevState.onRename
      };
    });
  };

  handleSaveName = event => {
    if (event.key === "Enter") {
      const { value } = event.target;
      const {
        container: { id },
        dispatch
      } = this.props;
      dispatch(renameCluster(id, value));
      return this.setState(prevState => {
        return {
          onRename: !prevState.onRename
        };
      });
    }
  };

  render() {
    let { style, className, name, defaultName } = this.props;
    const { onRename } = this.state;
    return (
      <H6 style={style} className={className} onDoubleClick={this.handleRename}>
        {onRename ? (
          <Input value={name} handleSave={this.handleSaveName} />
        ) : (
          <span>{name || defaultName}</span>
        )}
        <EditButton onClick={this.handleRename}>
          <img alt="edit" height="10" src={edit} />
        </EditButton>
      </H6>
    );
  }
}

const Input = ({ value, handleSave }) => (
  <input
    type="text"
    defaultValue={value}
    autoFocus
    maxLength={24}
    onKeyPress={handleSave}
  />
);
export default connect()(RenameableH6);
