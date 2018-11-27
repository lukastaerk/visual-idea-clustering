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
    const newName = event.target.value;
    if (event.key === "Enter") {
      const { id } = this.props.container;
      this.props.dispatch(renameCluster(id, newName));
      return this.setState(prevState => {
        return {
          onRename: !prevState.onRename
        };
      });
    }
  };

  render() {
    const { style, className, name } = this.props;
    const { onRename } = this.state;
    var inputFeld = (
      <input
        type="text"
        name="clusterName"
        placeholder={name}
        autoFocus
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
