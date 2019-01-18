import React from "react";
import { Button } from "../styledComponents";

const MenuBar = ({ handleDownloadState, handleResetState, classes }) => (
  <div style={{ marginRight: 10 }}>
    <Button onClick={handleDownloadState}>{"Download State"}</Button>
    <Button onClick={handleResetState}>{"Reset State"}</Button>
  </div>
);

export default MenuBar;
