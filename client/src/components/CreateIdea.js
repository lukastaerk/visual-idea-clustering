import React from "react";
import { connect } from "react-redux";
import { H6, Section, Button } from "../styledComponents";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Input } from "@material-ui/core";
import { SectionControl } from "../styledComponents";
import { categories } from "../data/categories.json";

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
          rows="4"
          required
        />
        <TextField
          id="inspiredBy"
          label="By which Sparks is the Idea inspired?"
          className={classes.textField}
          fullWidth
        />
        <TextField
          id="content"
          label="Describe your idea in more detail (e.g., how is it used?)"
          className={classes.textField}
          fullWidth
          multiline
          rowsMax="10"
          rows="4"
          required
        />
        <TextField
          id="content"
          label="Which problem does the idea solve?"
          className={classes.textField}
          fullWidth
          multiline
          rowsMax="10"
          rows="4"
          required
        />
        <SectionControl
          label="In which of the following areas can the idea be applied?"
          categories={categories}
        />
        <Button>
          <input type="submit" value="Submit" />
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(connect()(CreateIdea));
