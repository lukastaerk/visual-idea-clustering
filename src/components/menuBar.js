import React from "react";
import { Button } from "../styledComponents";

const MenuBar = ({
  handleNextIdeas,
  handleDownloadState,
  handleResetState,
  classes
}) => (
  <div style={{ marginRight: 10 }}>
    <Button onClick={handleNextIdeas}>{"Next Ideas"}</Button>
    <Button onClick={handleDownloadState}>{"Download State"}</Button>
    <Button onClick={handleResetState}>{"Reset State"}</Button>
  </div>
);

export default MenuBar;
