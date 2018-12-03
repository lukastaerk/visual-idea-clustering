import React from "react";
import { App_Name } from "./../constants/index.json";
import { logoI2M } from "../logos";

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
  <div className="row header">
    <div className="col" style={styles.header}>
      <h2>{App_Name}</h2>
    </div>
    <div className="col-auto">
      <img alt="logo" height="80" src={logoI2M} />
    </div>
  </div>
);

export default Header;
