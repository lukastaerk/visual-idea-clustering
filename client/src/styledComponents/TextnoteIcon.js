import React from "react";
import { ideaSize } from "../constants";
import { textnoteIcon } from "../icons";

const style = {
  float: "right",
  fontSize: ideaSize.fontSize
};

const LabelIcon = () => (
  <img
    draggable="false"
    style={style}
    alt="textnote"
    height="20"
    src={textnoteIcon}
  />
);

export default LabelIcon;
