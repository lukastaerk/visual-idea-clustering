import React from "react";
import { App_Name } from "./../constants/index.json";
import { logoI2M } from "../logos";
import { header } from "../constants/color";
import { download, reset } from "../icons";
import { Button, H6, H2 } from "../styledComponents";
import { UndoRedo } from "./";
import { Link } from "@reach/router";

var styles = {
  header: {
    backgroundColor: header.color,
    color: header.textColor,
    borderBottom: `4px solid ${header.border}`
  },
  h: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)"
  }
};

const Header = ({ handleDownloadState, handleResetState }) => (
  <div className="row header" style={styles.header}>
    <div className="col-auto" style={styles.h}>
      <UndoRedo />
      <Button onClick={handleDownloadState}>
        {"Download"} <img alt="download" height={20} src={download} />
      </Button>
      <Button onClick={handleResetState}>
        {"Reset"} <img alt="reset" height={20} src={reset} />
      </Button>
      <Button>{"Import Sparks"}</Button>
    </div>
    <div className="col" style={styles.h}>
      <Link to="/">
        <H2>{App_Name}</H2>
      </Link>
    </div>
    <div className="col-auto" style={styles.h}>
      <Link to="/ideas">
        <H6>{"Ideas"}</H6>
      </Link>
      <Link to="/create-idea">
        <H6>{"Create Idea"}</H6>
      </Link>
      <img alt="logo" height="80" src={logoI2M} />
    </div>
  </div>
);

export default Header;
