import React, { Component } from 'react';
import Draggable from "./draggable";
import { colors } from'./../constants/index.json'


export const renderClusters = (clusters) =>{
	const clustersRender = clusters.map((cluster, i)=>{
			return <Cluster position={cluster.position} key={cluster.id} id={cluster.id}/>
		})
		return clustersRender
}

var styles = {
	clusterBox: {
		position: "absolute",
		borderRadius: 10,
		padding: 20,
		border: "2px solid "+ colors.idea.border,
		background: colors.cluster.background,
	    width: 150,
	    height: 150,
	    touchAction: "none",
	    cursor: "move",
	    zIndex:1,
	    boxSizing: "border-box"
	},
	h6: {
		textAlign:"center"
		}
	};

export class Cluster extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	allowDrop = (ev) => {
		ev.preventDefault()
	}
	drop = (ev) => {
		ev.preventDefault();
		var data = JSON.parse(ev.dataTransfer.getData("text"));
		console.log(data.id)
	}

	render(){
		const { id, position } = this.props
		var pos = position? position:{}
		var style = { ...styles.clusterBox, ...pos}
		return(
			<Draggable id={id} type={"clusters"} style={style}>
				<div id={"cluster"+id} onDragOver={this.allowDrop} onDrop={this.drop}>
						<h6 style={styles.h6}>{"Cluster "+ id}</h6>
				</div>
			</Draggable>
			)
	}
}