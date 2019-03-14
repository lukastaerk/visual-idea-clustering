import React from "react";
import { connect } from "react-redux";
import { H6, Section, Button } from "../styledComponents";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Input } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "block",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    maxWidth: 600,
    margin: "auto"
  }
});

const CreateIdea = ({ classes }) => {
  return (
    <div className={classes.root}>
      <H6>{"Create Idea"}</H6>
      <form className={classes.container} autoComplete="off">
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          required
        />
        <TextField
          id="content"
          label="Description"
          className={classes.textField}
          fullWidth
          multiline
          rowsMax="10"
          required
        />
        <TextField
          id="inspiredBy"
          label="By which Sparks is the Idea inspired?"
          className={classes.textField}
          fullWidth
        />
        <Button>
          <input type="submit" value="Submit" />
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(connect()(CreateIdea));
