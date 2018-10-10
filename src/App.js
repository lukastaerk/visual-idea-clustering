import React, { Component } from 'react';
import Board from "./board";

class App extends Component {

	render(){

		return(
			<div className="row">
			<div className="col-3"></div>
			<div className="col-9">
				<Board/>
			</div>
			
			</div>
			)
	}
}

export default App; 