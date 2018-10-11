import React, { Component } from 'react'; 
import "./../App.css"
import { App_Name } from'./../constants/index.json'

class Header extends Component {

	render(){
		console.log(App_Name)
		return(
			<div className="header">
				<h2 >{App_Name}</h2>
			</div>
			)
	}
}

export default Header; 