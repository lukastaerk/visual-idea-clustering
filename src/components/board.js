import React, { Component } from 'react';
import { renderIdeas } from "./idea";
import { colors } from'./../constants/index.json'

var styles = {
	board: {
	    width: "100%",
	    height: "100vh",
	    background: colors.board.background,
	    position: "relative"
	}
}
class Board extends Component {

	dataLoader = (fromIndex, toIndex, JSON_DATA) => {
		const data = JSON_DATA.slice(fromIndex,toIndex); 
		var ideas = data.map((idea)=>{
			idea.position = {x:0,y:0}
			return idea
		})
		return ideas; 
	}

	allowDrop = (ev) =>{
		ev.preventDefault();
	}

  render() {
  	const {dropedIdeas, handleOffset} = this.props
  	const ideasDisplay = (dropedIdeas)? renderIdeas(dropedIdeas, handleOffset) : null
    return (
	    	<div style={styles.board} onDrop={this.props.handleDrop} onDragOver={this.allowDrop}> 
				{ ideasDisplay }
			</div>
    );
  }
}

export default Board;
