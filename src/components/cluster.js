import React, { Component } from 'react';
import { colors } from'./../constants/index.json'

var styles = {
	clusterBox: {
		position: "absolute",
		borderRadius: 10,
		border: "2px solid "+ colors.idea.border,
		background: colors.cluster.background,
	    width: 150,
	    height: 150,
	    cursor: "move",
	    zIndex:1
	},
	h6: {
		textAlign:"center"
		}
	};

class Cluster extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	render(){
		const { id } = this.props
		return(
			<div id={"cluster"+id} style={styles.clusterBox} draggable onDragStart={()=>null}>
					<h6 style={styles.h6}>{"Cluster "+ id}</h6>
			</div>
			)
	}
}
export default Cluster