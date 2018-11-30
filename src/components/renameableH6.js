import React, { Component } from "react";
import { connect } from "react-redux";
import { renameCluster } from "../actions";

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
    let { style, className, name } = this.props;
    const { onRename } = this.state;
    var inputFeld = (
      <input
        type="text"
        placeholder={name}
        autoFocus
        maxLength={24}
        onKeyPress={this.handleSaveName}
      />
    );

    return (
      <h6 style={style} className={className} onDoubleClick={this.handleRename}>
        {onRename ? inputFeld : name}
      </h6>
    );
  }
}
export default connect()(RenameableH6);
