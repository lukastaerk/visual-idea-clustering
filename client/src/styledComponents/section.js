import React from "react";
import { header } from "../constants/color";
import { H6 } from "./";

const style = {
  fontSize: 16,
  borderTop: `2px solid ${header.border}`
};

const Section = ({ children }) => (
  <div className="clearfix" style={style}>
    <H6>{children}</H6>
  </div>
);

export default Section;
