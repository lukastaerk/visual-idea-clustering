import React from "react";
//import { colors } from "./../constants/index.json";
import { withStyles } from "@material-ui/core/styles";
import MUIButton from "@material-ui/core/Button";
import { button } from "../constants/color";

const styles = theme => ({
  button: {
    background: button.main,
    color: button.text
  }
});

const Button = ({ classes, children, ...props }) => {
  return (
    <MUIButton
      className={classes.button}
      size="small"
      fullWidth={true}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export default withStyles(styles)(Button);
