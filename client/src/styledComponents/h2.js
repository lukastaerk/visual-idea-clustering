import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing.unit / 2,
    fontSize: 24
  },
  bold: {
    fontWeight: "bold"
  },
  center: {
    textAlign: "center"
  }
});

export var H2 = ({ children, classes, bold, noCenter }) => (
  <h2
    className={`${classes.root} ${bold ? classes.bold : ""} ${
      noCenter ? "" : classes.center
    }`}
  >
    {children}
  </h2>
);

H2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(H2);
