import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.typography.button,
    paddingTop: theme.spacing.unit / 2,
    textAlign: "center"
  }
});

const H6 = ({ children, classes }) => (
  <h6 className={classes.root}>{children}</h6>
);

H6.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(H6);
