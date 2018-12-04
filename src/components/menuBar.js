import React from "react";
//import { colors } from "./../constants/index.json";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit / 2
  },
  box: {
    margin: "0px 10px 0px 0px"
  }
});

const MenuBar = ({
  handleNextIdeas,
  handleDownloadState,
  handleResetState,
  classes
}) => (
  <div className={classes.box}>
    <Button
      className={classes.button}
      fullWidth={true}
      variant="outlined"
      onClick={handleNextIdeas}
    >
      {"Next Ideas"}
    </Button>
    <Button
      className={classes.button}
      fullWidth={true}
      variant="outlined"
      onClick={handleDownloadState}
    >
      {"Download State"}
    </Button>
    <Button
      className={classes.button}
      fullWidth={true}
      variant="outlined"
      onClick={handleResetState}
    >
      {"Reset State"}
    </Button>
  </div>
);

export default withStyles(styles)(MenuBar);
