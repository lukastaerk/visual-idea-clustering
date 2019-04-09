import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class SelectionControl extends React.Component {
  state = {
    ...this.props.categories,
    formData: this.props.formData
  };

  handleChange = event => {
    const checked = event.target.checked;
    const formData = this.state.formData;
    const elementName = event.target.value;

    if (checked) {
      if (!formData.includes(elementName)) {
        formData.push(elementName);
      }
    } else {
      if (formData.includes(elementName)) {
        formData.splice(formData.indexOf(elementName), 1);
      }
    }

    this.setState({ formData: formData });
  };

  render() {
    const { classes, categories } = this.props;
    const displayForm = categories.map(c => {
      const displayLabels = c.labels.map(l => (
        <FormControlLabel key={l} value={l} control={<Checkbox />} label={l} />
      ));
      return (
        <FormControl
          key={c.title}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">{c.title}</FormLabel>
          <FormGroup
            aria-label={c.title}
            name={c.title}
            className={classes.group}
            value={this.state[c]}
            onChange={this.handleChange}
          >
            {displayLabels}
          </FormGroup>
        </FormControl>
      );
    });
    return <div className={classes.root}>{displayForm}</div>;
  }
}

SelectionControl.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectionControl);
