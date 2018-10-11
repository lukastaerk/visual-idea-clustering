import React, { Component } from 'react';
import '../css/board.css';


class IdeaTrash extends Component {

	allowDrop = (ev) =>{
		ev.preventDefault();
		console.log(ev.type)
		if(ev.type=="drop") this.props.handleDropTrash(ev)
		ev.target.style.backgroundColor = (ev.type == "dragover")? "#f78a8a" : "yellow"
	}

	render(){
		return(
			<div className="ideaStack" >
				<h6>Idea Trash</h6>
				<div className="ideaContainer" onDrop={this.allowDrop} onDragOver={this.allowDrop} onDragLeave={this.allowDrop}>
				
				</div>
			</div>
			)
	}
}

export default IdeaTrash; 