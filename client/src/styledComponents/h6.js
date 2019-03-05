import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing.unit / 2
  },
  bold: {
    fontWeight: "bold"
  },
  center: {
    textAlign: "center"
  }
});

const H6 = ({ children, classes, bold, noCenter }) => (
  <h6
    className={`${classes.root} ${bold ? classes.bold : ""} ${
      noCenter ? "" : classes.center
    }`}
  >
    {children}
  </h6>
);

H6.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(H6);
