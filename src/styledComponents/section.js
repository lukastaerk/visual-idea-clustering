import React from "react";
import { header } from "../constants/color";

const style = {
  fontSize: 16,
  borderTop: `2px solid ${header.border}`
};

const Section = ({ children }) => (
  <div className="clearfix" style={style}>
    {children}
  </div>
);

export default Section;
