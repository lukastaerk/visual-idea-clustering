import React, { Component } from 'react';
import './board.css';
import CHI19S1_ideas from './data/CHI19S1-ideas.json';
import Idea from "./idea";

class Board extends Component {
	constructor(props){
		super(props)
		this.boardRef = React.createRef(); 
		this.state = {
			ideas:[],
			position: {x:0,y:0},
			boardPosition:{
				top: 0,
				left: 0
			} 
		}
	}

	componentDidMount(){
		const boardPos = this.boardRef.current.getBoundingClientRect()
		const ideas = this.dataLoader(0,5,CHI19S1_ideas)
		this.setState({
			ideas: ideas,
			boardPosition:{
				top: boardPos.y,
				left: boardPos.x
			} 
		})
	}

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

	handleDrop = (ev) => {
		 ev.preventDefault();
		 const { top, left} = this.state.boardPosition
		  var data = ev.dataTransfer.getData("text");
    	//var pos = document.getElementById(data).getBoundingClientRect()
			console.log("drop", data)
			var id = parseInt(data.slice(4))
			var ideas = this.state.ideas
			var index = ideas.findIndex(idea=>idea.id===id)
			ideas[index].position = {x:ev.clientX - left, y:ev.clientY - top}
			this.setState({
				ideas: ideas
			})
	}

	renderIdeas = (ideas) => {
		const ideasRender = ideas.map((idea, i)=>{
			return <Idea position={idea.position} key={idea.id} data={idea}/>
		})
		return ideasRender
	}

  render() {
  	const {position, ideas} = this.state
  	const ideasDisplay = (ideas)? this.renderIdeas(ideas) : null
    return (
    	<div ref={this.boardRef}>
	    	<div id="canvas" onDrop={this.handleDrop} onDragOver={this.allowDrop}> 
				{ ideasDisplay }
				</div>
			<div id="results">{"x: "+position.x+" y: "+position.y}</div>
		</div>
    );
  }
}

export default Board;
