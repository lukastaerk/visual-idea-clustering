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
			boardPosition:{
				top: 0,
				left: 0
			},
			isDrawingCluster: false
		}
	}
	componentDidMount(){
		const boardPos = this.boardRef.current.getBoundingClientRect()
		const { nextIdeasIndex } = this.state
		const nextIdeas = this.dataLoader(nextIdeasIndex, nextIdeasIndex+5, CHI19S1_ideas)
		const dropedIdeas = []
		this.setState({
			nextIdeas:nextIdeas,
			dropedIdeas: dropedIdeas,
			boardPosition:{
				top: boardPos.y,
				left: boardPos.x
			}, 
			offset: {
				x:0,
				y:0
			}
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
	handleDrop = (ev) => {
		ev.preventDefault();
		const { top, left} = this.state.boardPosition
		var data = JSON.parse(ev.dataTransfer.getData("text"));
		const { x, y } = data.offset
		console.log("drop", data)

		var { nextIdeas, dropedIdeas } = this.state
		console.log(nextIdeas,dropedIdeas)
		var index = dropedIdeas.findIndex(idea=>idea.id==data.id)
		if(index<0) {
			index = nextIdeas.findIndex(i=>i.id==data.id)
			var idea = nextIdeas.splice(index,1)
			idea[0].position = {x:ev.clientX - left - x, y:ev.clientY - top - y}
			dropedIdeas.push(idea[0])
			this.setState({
				nextIdeas:nextIdeas,
				dropedIdeas: dropedIdeas
			})
		} else {
			dropedIdeas[index].position = {x:ev.clientX - left - x, y:ev.clientY - top - y}
			this.setState({
				dropedIdeas: dropedIdeas
			})
		}
	}

	handleDropTrash = (ev) => {
		ev.preventDefault();
		var { nextIdeas, dropedIdeas } = this.state
		var data = JSON.parse(ev.dataTransfer.getData("text"));
		
		var index = dropedIdeas.findIndex(idea=>idea.id==data.id)
		if(index<0) {
			index = nextIdeas.findIndex(i=>i.id==data.id)
			nextIdeas.splice(index,1)
		} else {
			dropedIdeas.splice(index,1)
		}
		this.setState({
				nextIdeas:nextIdeas,
				dropedIdeas: dropedIdeas
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
					<Board dropedIdeas={dropedIdeas} clusters={clusters} handleDrop={this.handleDrop} isDrawingCluster={isDrawingCluster}/>
				</div>
				
				</div>
			</div>
			)
	}
}

export default App; 