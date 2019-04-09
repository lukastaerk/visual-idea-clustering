import React, { Component } from "react";
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
import { apiEndpoint } from "../utils";

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

class CreateIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      inspiredBy: "",
      icon: "",
      ideaDetails: "",
      ideaProblem: "",
      applicationAreas: [],
      ideaUsers: [],
      ideaUsersOther: ""
    };
  }

  handleSetUpdateState = fieldName => event => {
    const stateObject = {};
    stateObject[fieldName] = event.target.value;
    this.setState(stateObject);
  };

  //TODO handle backend in redux action? evaluate.
  handleFormSubmit = event => {
    apiEndpoint
      .post("/api/ideas", this.state)
      .then(response => {
        console.log(response);
        //dispatch()
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
    return 0;
  };

  render() {
    const { classes } = this.props;
    console.log("FORMDATA: ", this.state);
    return (
      <div className={classes.root}>
        <H6>{"Create Idea"}</H6>
        {/*TODO error message*/}
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.handleFormSubmit}
        >
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            onChange={this.handleSetUpdateState("title")}
            required
          />
          <TextField
            id="content"
            label="Description"
            className={classes.textField}
            onChange={this.handleSetUpdateState("content")}
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
            onChange={this.handleSetUpdateState("inspiredBy")}
            fullWidth
          />
          <TextField
            id="ideaDetails"
            label="Describe your idea in more detail (e.g., how is it used?)"
            className={classes.textField}
            onChange={this.handleSetUpdateState("ideaDetails")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
            required
          />
          <TextField
            id="ideaProblem"
            label="Which problem does the idea solve?"
            className={classes.textField}
            onChange={this.handleSetUpdateState("ideaProblem")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
            required
          />
          <SectionControl
            label="In which of the following areas can the idea be applied?"
            categories={categories}
            formData={this.state.applicationAreas}
          />
          <Button>
            <input type="submit" value="Submit" />
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(connect()(CreateIdea));
