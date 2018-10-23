import React, { Component } from 'react';
import { colors } from'./../constants/index.json'

var style = {
	box:{
	    margin: "0 auto",
	    marginTop: 20, 
	    borderRadius: 10,
	    borderStyle: "solid",
	    borderColor: colors.header.background, 
	    width: 150
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
		const { handleNextIdeas, handleDrawCluster, isDrawingCluster } = this.props;
		return(
			<div style={style.box}>
				<div style={style.menu}>
					<ListItem name={isDrawingCluster? "Stop Drawing":"Draw Cluster"} onClick={handleDrawCluster} active={isDrawingCluster}/>
			        <ListItem name={"Next Ideas"} onClick={handleNextIdeas}/>
			    </div>
			   </div>
			)
	}
}
class ListItem extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	handleMouse = (ev) => {
		switch(ev.type){
			case "mouseenter":
				ev.target.style.background = colors.header.background
				ev.target.style.color = "white"
				break
			case "mouseleave":
				ev.target.style.background = (this.props.active)? "rgb(21, 66, 140)" : "white"
				ev.target.style.color =(this.props.active)? "white" : colors.header.background
				break
			default:
				break
		}
		
	}
	render(){
		const {name, onClick, active} = this.props
		return(
			<li style={style.list} onClick={onClick} >
			  <div onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse}>{name}</div>
			</li>
			)
	}
}



export default MenuBar;