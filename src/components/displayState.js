import React, { Component } from "react";
import { loadData } from "../utils/loadData";

class DisplayState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: null
    };
  }

  componentDidMount() {
    loadData()
      .then(res => {
        this.setState({
          display: res
        });
      })
      .catch(err => console.log("err: " + err));
  }
  render() {
    return (
      <div>
        <div type="application/ld+json">
          {this.state.display && JSON.stringify(this.state.display, null, 2)}
        </div>
      </div>
    );
  }
}
export default DisplayState;
