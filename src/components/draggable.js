import React, { Component } from 'react';
import { colors } from'./../constants/index.json'


class Draggable extends Component {
	constructor(props) {
		super(props)
		this.node = React.createRef()
	}

	dragStart = (ev) => {
		const {id, type} = this.props
		const idea = this.node.current
		var rect = idea.getBoundingClientRect()
		var x = ev.clientX - rect.x 
		var y = ev.clientY - rect.y
		var data = {id:id, offset: {x:x,y:y}, type:type }
		ev.dataTransfer.setData("text", JSON.stringify(data));
	}

	resize = (event) => {
		var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

	    // update the element's style
	    target.style.width  = event.rect.width + 'px';
	    target.style.height = event.rect.height + 'px';

	    // translate when resizing from top or left edges
	    x += event.deltaRect.left;
	    y += event.deltaRect.top;

	    target.style.webkitTransform = target.style.transform =
	        'translate(' + x + 'px,' + y + 'px)';

	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);

		}

	// methods
	render() {
		const { style } = this.props
		return (
			<div >
			<div style={style} ref={this.node} draggable onDragStart={this.dragStart} onResize={this.resize} onResizeStart={this.resize}>
				{this.props.children}
			</div>
			</div>
			)
	}
}

export default Draggable