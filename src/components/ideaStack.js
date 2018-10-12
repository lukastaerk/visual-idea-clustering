import React, { Component } from 'react';
import { renderIdeas } from "./idea";
import { colors } from'./../constants/index.json'

var styles = {
	ideaStack:{
		position: "relative",
	    margin: "0 auto",
	    marginTop: 20, 
	    borderStyle: "solid", 
	    width: 150,
	    height: 170,
	    backgroundColor: colors.board.background
	},
	ideaContainer: {
	    position: "relative",
	    margin: "0 auto",
	    width: 120,
	    height: 120
	},
	h6: {
		textAlign: "center",

	}
}

class IdeaStack extends Component {

	allowDrop = (ev) =>{
		ev.preventDefault();
		console.log(ev.type)
		if(ev.type=="drop") this.props.handleDropTrash(ev)
		ev.target.style.backgroundColor = (ev.type == "dragover")? "#f78a8a" : "yellow"
	}

	renderContainer = (isTrash, ideasDisplay = null) => {
		if(isTrash){
			return (<div style={styles.ideaContainer} onDrop={this.allowDrop} onDragOver={this.allowDrop} onDragLeave={this.allowDrop}>	
					</div>)
		} else {
			return ( <div style={styles.ideaContainer}>
					{ideasDisplay}
					</div>)
		}
	}

	render(){
		const { nextIdeas, isTrash} = this.props
		const ideasDisplay = (nextIdeas)? renderIdeas(nextIdeas, this.props.handleOffset): null
		const ideaContainer = this.renderContainer(isTrash, ideasDisplay)
		return(
			<div style={styles.ideaStack}>
				<h6 style={styles.h6}>{(isTrash)? "Idea Stack":"Idea Trash"}</h6>
				{ideaContainer}
			</div>
			)
	}
}

export default IdeaStack; 