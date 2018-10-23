import React, { Component } from 'react';
import { renderIdeas } from "./idea";
import Cluster from "./cluster";
import { colors } from'./../constants/index.json'

var styles = {
	board: {
	    width: "150%",
	    height: "150vh",
	    background: colors.board.background,
	    position: "relative",
	},
	container: { overflow:"auto", height: "100vh"}
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
  	const {dropedIdeas} = this.props
  	const ideasDisplay = (dropedIdeas)? renderIdeas(dropedIdeas, true) : null
    return (

    	<div style={styles.container}>
	    	<div style={styles.board} onDrop={this.props.handleDrop} onDragOver={this.allowDrop}> 
				{ ideasDisplay }
				<Cluster id={1}/>
			</div>
		</div>
    );
  }
}

export default Board;
