import React from "react";
import { App_Name } from "./../constants/index.json";
import { logoI2M } from "../logos";
import { header } from "../constants/color";
import { UndoRedo } from "./";

var styles = {
  header: {
    backgroundColor: header.color,
    color: header.textColor,
    borderBottom: `4px solid ${header.border}`
  },
  h: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)"
  }
};

const Header = () => (
  <div className="row header" style={styles.header}>
    <div className="col-auto" style={styles.h}>
      <UndoRedo />
    </div>
    <div className="col" style={styles.h}>
      <h2>{App_Name}</h2>
    </div>
    <div className="col-auto">
      <img alt="logo" height="80" src={logoI2M} />
    </div>
  </div>
);

export default Header;