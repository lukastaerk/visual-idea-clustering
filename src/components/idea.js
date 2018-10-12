import React, { Component } from 'react';
import { colors } from'./../constants/index.json'
//import  "./idea.css";
export const renderIdeas = (ideas, isOnBoard = false) => {

		const ideasRender = ideas.map((idea, i)=>{
			return <Idea position={idea.position} key={idea.id} data={idea} isOnBoard={isOnBoard}/>
		})
		return ideasRender
	}

function ellipsizeTextBox(id) {
    var el = document.getElementById(id);
    var wordArray = el.innerHTML.split(' ');
    while(el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
     }
}


var styles = {
	ideaBox: {
		position: "absolute",
		borderRadius: 10,
		border: "2px solid "+ colors.idea.border,
	    width: 120,
	    height: 120,
	    cursor: "move"
		},
	description:  {
	    fontSize: 10
		}, 
	h6: {
		textAlign:"center"
		}
	};

class Idea extends Component {
	constructor(props){
		super(props)
		this.ideaRef = React.createRef()
	}

	componentDidUpdate(){
		//ellipsizeTextBox("des"+this.props.data.id)
	}

	drag = (ev) => {
		const idea = this.ideaRef.current
		var rect = idea.getBoundingClientRect()
		var x = ev.clientX - rect.x 
		var y = ev.clientY - rect.y
		var data = {id:ev.target.id.slice(4), offset: {x:x,y:y}}
		ev.dataTransfer.setData("text", JSON.stringify(data));
	}

  render() {
  	const { data, position, isOnBoard } = this.props
  	var style = {top: position.y, left: position.x, background: (isOnBoard)? colors.board.idea : colors.idea.background,}
  	Object.assign(style, styles.ideaBox)
    return (
    	<div id={"idea"+data.id} style={style} draggable onDragStart={this.drag} ref={this.ideaRef}>
				<h6 style={styles.h6}>{"Idea "+ data.id}</h6>
				<div id={"des"+data.id} className="block-with-text" style={styles.description}>{data.description}</div>
		</div>
    );
  }
}

export default Idea;
