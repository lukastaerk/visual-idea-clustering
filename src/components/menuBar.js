import React, { Component } from 'react';
import { colors } from'./../constants/index.json'

var style = {
	box:{
	    margin: "0 auto",
	    marginTop: 20, 
	    borderRadius: 10,
	    borderStyle: "solid",
	    borderColor: colors.header.background, 
	    width: 150,
	    backgroundColor: colors.board.background
	},
	menu: {
		
	},
	list:{
		width: "100%",
		display:"inline-block",
		textAlign: "center"
	}
}

class MenuBar extends Component {

	render(){
		const { classes, handleNextIdeas } = this.props;
		return(
			<div style={style.box}>
				<div style={style.menu}>
					<ListItem name={"Draw Cluster"} />
			        <ListItem name={"Next Ideas"} onClick={handleNextIdeas}/>
			    </div>
			   </div>
			)
	}
}
class ListItem extends Component {

	handleMouse = (ev) => {
		ev.target.style.background = (ev.type=="mouseenter")? colors.header.background : null
		ev.target.style.color = (ev.type=="mouseenter")? "white" : colors.header.background
		
	}
	render(){
		const {name, onClick} = this.props
		return(
			<li style={style.list} onClick={onClick} >
			  <div  onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse}>{name}</div>
			</li>
			)
	}
}



export default MenuBar;