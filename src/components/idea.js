import React, { Component } from 'react';
import './../css/board.css';

export const renderIdeas = (ideas, handleOffset) => {

		const ideasRender = ideas.map((idea, i)=>{
			return <Idea position={idea.position} key={idea.id} data={idea} handleOffset={handleOffset}/>
		})
		return ideasRender
	}

class Idea extends Component {
	constructor(props){
		super(props)
		this.ideaRef = React.createRef()
	}
	drag = (ev) => {
		
		const idea = this.ideaRef.current
		var rect = idea.getBoundingClientRect()
		var x = ev.clientX - rect.x 
		var y = ev.clientY - rect.y
		this.props.handleOffset(x,y) //offset to controler 
		ev.dataTransfer.setData("text", ev.target.id);
	}

  render() {
  	const { data, position } = this.props
  	const style = {top: position.y, left: position.x}
    return (
    	<div id={"idea"+data.id} className="idea" draggable onDragStart={this.drag} ref={this.ideaRef} style={style}>
				<h6 >{"Idea "+ data.id}</h6>
				<div className="description">{data.description}</div>
		</div>
    );
  }
}

export default Idea;
