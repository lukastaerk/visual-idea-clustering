import React, { Component } from 'react';
import { colors } from'./../constants/index.json'
export const renderIdeas = (ideas, isOnBoard = false) => {

		const ideasRender = ideas.map((idea, i)=>{
			return <Idea position={idea.position} key={idea.id} data={idea} isOnBoard={isOnBoard}/>
		})
		return ideasRender
	}

function ellipsizeTextBox(id) {
	var textHeight = 0; 
    var el = document.getElementById(id);
    var text = el.innerHTML;
    var wordArray = el.innerHTML.split(' ');
    textHeight = el.scrollHeight; 
    while(el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        text = wordArray.join(' ') + '...';
        el.innerHTML = text;
        
     }
     return {textHeight:textHeight, text:text}; 
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
	    fontSize: 10,
	    maxHeight: 80
		}, 
	h6: {
		textAlign:"center"
		}
	};

class Idea extends Component {
	constructor(props){
		super(props)
		this.state = {
			textHeight: styles.description.maxHeight,
			displayFull: false
		}
		this.ideaRef = React.createRef()
	}

	componentDidMount(){
		const{ textHeight, text } = ellipsizeTextBox("des"+this.props.data.id)
		this.setState({
			textHeight: textHeight,
			ellipText: text
		})
	}

	drag = (ev) => {
		const idea = this.ideaRef.current
		var rect = idea.getBoundingClientRect()
		var x = ev.clientX - rect.x 
		var y = ev.clientY - rect.y
		var data = {id:ev.target.id.slice(4), offset: {x:x,y:y}}
		ev.dataTransfer.setData("text", JSON.stringify(data));
	}

	handleDisplayFullText = (ev) => {
		this.setState(prevState=>{
			return { displayFull: !prevState.displayFull }
		})
	}

  render() {
  	const { data, position, isOnBoard } = this.props
  	const { displayFull, textHeight, ellipText } = this.state
  	const handleDisplayFullText = (this.state.textHeight>styles.description.maxHeight)? this.handleDisplayFullText : null
  	var style = {top: position.y, left: position.x, background: (isOnBoard)? colors.board.idea : colors.idea.background,}
  	Object.assign(style, styles.ideaBox)
  	var styleTextBox = styles.description
  	var description = (ellipText)? ellipText : data.description
  	if(displayFull){
  		style.height = style.height + textHeight - 80
  		styleTextBox = { maxHeight:textHeight, fontSize:10 }
  		description = data.description
  	}
    return (
    	<div id={"idea"+data.id} style={style} draggable onDragStart={this.drag} ref={this.ideaRef}>
				<h6 style={styles.h6}>{"Idea "+ data.id}</h6>
				<div id={"des"+data.id} style={styleTextBox} onClick={handleDisplayFullText}>{description}</div>
		</div>
    );
  }
}

export default Idea;
