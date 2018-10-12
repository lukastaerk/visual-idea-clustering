import React, { Component } from 'react';
import { colors } from'./../constants/index.json'

export const renderIdeas = (ideas, handleOffset) => {

		const ideasRender = ideas.map((idea, i)=>{
			return <Idea position={idea.position} key={idea.id} data={idea} handleOffset={handleOffset}/>
		})
		return ideasRender
	}

var styles = {
	ideaBox: {
		position: "absolute",
	    width: 120,
	    height: 120,
	    background: colors.idea.background,
	    cursor: "move"
		},
	description:  {
	    fontSize: 10
		}
	};

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
  	var style = {top: position.y, left: position.x}
  	Object.assign(style, styles.ideaBox)
    return (
    	<div id={"idea"+data.id} style={style} draggable onDragStart={this.drag} ref={this.ideaRef}>
				<h6 >{"Idea "+ data.id}</h6>
				<div style={styles.description}>{data.description}</div>
		</div>
    );
  }
}

export default Idea;
