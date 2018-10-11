import React, { Component } from 'react';
import { renderIdeas } from "./idea";
import '../css/board.css';


class IdeaStack extends Component {


	render(){
		const { nextIdeas } = this.props
		const ideasDisplay = (nextIdeas)? renderIdeas(nextIdeas, this.props.handleOffset): null
		return(
			<div className="ideaStack">
			<h6>Idea Stack</h6>
			<div className="ideaContainer">
			{ideasDisplay}
			</div>
			</div>
			)
	}
}

export default IdeaStack; 