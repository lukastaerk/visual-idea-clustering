import React, { Component } from 'react';
import './board.css';

class Idea extends Component {
	constructor(props){
		super(props)
		this.ideaRef = React.createRef()
		this.state = {
			position: props.position,
			offset: {x:0,y:0}
		}
	}

 	componentWillReceiveProps(nextProps: Object) {
 		if(nextProps.position!==this.props.position){
 			this.setState((state)=>{
 				const { offset } = state
 				const { position } = nextProps
 				return {
 					position: { x:position.x-offset.x, y: position.y-offset.y },
 					offset: {x:0,y:0}
 				}
 			})
 		}
 	}
	drag = (ev) => {
		const idea = this.ideaRef.current
		var rect = idea.getBoundingClientRect()
		var x = ev.clientX - rect.x 
		var y = ev.clientY - rect.y
		this.setState({
			offset:{x:x,y:y}
		})
		ev.dataTransfer.setData("text",ev.target.id);
	}

  render() {
  	const { data } = this.props
  	const { position } = this.state
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
