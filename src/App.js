import React, { Component } from 'react';
import Board from "./components/board";
import Header from "./components/header";
import MenuBar from "./components/menuBar";
import IdeaStack from "./components/ideaStack";
import CHI19S1_ideas from './data/CHI19S1-ideas.json';
import './App.css';

class App extends Component {
	constructor(props){
		super(props)
		this.boardRef = React.createRef(); 
		this.state = {
			nextIdeas: [],
			dropedIdeas: [],
			nextIdeasIndex: 0,
			clusters: [],
			isDrawingCluster: false
		}
	}
	componentDidMount(){
		const { nextIdeasIndex } = this.state
		const nextIdeas = this.dataLoader(nextIdeasIndex, nextIdeasIndex+5, CHI19S1_ideas)
		const dropedIdeas = []
		this.setState({
			nextIdeas:nextIdeas,
			dropedIdeas: dropedIdeas
		})
	}
	dataLoader = (fromIndex, toIndex, JSON_DATA) => {
		const data = JSON_DATA.slice(fromIndex,toIndex); 
		var ideas = data.map((idea)=>{
			idea.position = {x:0,y:0}
			return idea
		})
		return ideas.reverse(); 
	}
	handleDrop = (ev, pos) => {
		ev.preventDefault();
		var data = JSON.parse(ev.dataTransfer.getData("text"));
		const { x, y } = data.offset
		console.log(pos.top, pos.left)

		var index 
		switch(data.type){
			case "clusters":
				var { clusters } = this.state
				index = clusters.findIndex(cluster=>cluster.id==data.id)
				clusters[index].position = { ...clusters[index].position, ...{left:ev.clientX - pos.left - x, top:ev.clientY - pos.top - y}}
				this.setState({
					clusters: clusters
				})
				break
			case "dropedIdeas":
				var { dropedIdeas } = this.state
				index = dropedIdeas.findIndex(idea=>idea.id==data.id)
				dropedIdeas[index].position = {x:ev.clientX - pos.left - x, y:ev.clientY - pos.top - y}
				this.setState({
					dropedIdeas: dropedIdeas
				})
				break
			case "nextIdeas":
				var { nextIdeas, dropedIdeas } = this.state
				index = nextIdeas.findIndex(i=>i.id==data.id)
				console.log(index)
				var idea = nextIdeas.splice(index,1)
				idea[0].position = {x:ev.clientX - pos.left - x, y:ev.clientY - pos.top - y}
				dropedIdeas.push(idea[0])
				this.setState({
					nextIdeas:nextIdeas,
					dropedIdeas: dropedIdeas
				})
				break
		}
	}

	handleDropTrash = (ev) => {
		ev.preventDefault();
		var data = JSON.parse(ev.dataTransfer.getData("text"));
		
		var list = []
		switch(data.type) {
			case "clusters":
				list = this.state.clusters
				break
			case "dropedIdeas":
				list = this.state.dropedIdeas
				break
			case "nextIdeas":
				list = this.state.nextIdeas
				break
		}
		
		var index = list.findIndex(idea=>idea.id==data.id)
		list.splice(index,1)
		this.setState({
				[data.type]:list
			})
	}

	handleNextIdeas = () => {
		console.log("handleNextIdeas")
		const { nextIdeasIndex, nextIdeas } = this.state

		if(nextIdeas.length !== 0) return null; //when stack still holdes ideas don't give more ideas

		const nextStack = this.dataLoader(nextIdeasIndex+5, nextIdeasIndex+10, CHI19S1_ideas)
		this.setState((prevState)=>{
			return {
				nextIdeasIndex: prevState.nextIdeasIndex+5,
				nextIdeas: prevState.nextIdeas.concat(nextStack)
			}
		})
	}

	handleDrawCluster = (ev) => {
		this.setState(prevState => {
			return {isDrawingCluster: !prevState.isDrawingCluster}
		})
	}
	createCluster = (x,y,width,height) => {
		let nextClusterId = this.state.clusters.length+1
		var cluster = {id:nextClusterId,position:{top:y,left:x, width:width, height:height}}
		this.setState((prevState)=>{
			return {clusters: [...prevState.clusters, cluster]}
		})
		console.log(this.state.clusters)
	}

	render(){
		const { nextIdeas, dropedIdeas, isDrawingCluster, clusters } = this.state
		
		return(
			<div className="App">
				<Header/>
				<div className="row">
				<div className="col-2">
					<MenuBar handleNextIdeas={this.handleNextIdeas} handleDrawCluster={this.handleDrawCluster} isDrawingCluster={isDrawingCluster}/>
					<IdeaStack isTrash={false} nextIdeas={nextIdeas} />
					<IdeaStack isTrash={true} handleDropTrash={this.handleDropTrash} />
				</div>
				<div className="col-9 board" ref={this.boardRef} >
					<Board dropedIdeas={dropedIdeas} clusters={clusters} handleDrop={this.handleDrop} isDrawingCluster={isDrawingCluster} createCluster={this.createCluster}/>
				</div>
				
				</div>
			</div>
			)
	}
}

export default App; 