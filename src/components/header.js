import React, { Component } from "react";
import { App_Name } from "./../constants/index.json";

var styles = {
  header: {
    backgroundColor: "#282c34",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  }
};

const Header = () => (
  <div className="row">
    <div className="col" style={styles.header}>
      <h2>{App_Name}</h2>
    </div>
  </div>
);

export default Header;
