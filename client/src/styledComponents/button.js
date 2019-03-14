/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import MUIButton from "@material-ui/core/Button";
import { button, ideaColor, clusterColor } from "../constants/color";

const styles = theme => ({
  button: {
    background: button.main,
    color: button.text
  }
});

let Button = ({ classes, children, ...props }) => {
  return (
    <MUIButton className={classes.button} size="small" {...props}>
      {children}
    </MUIButton>
  );
};
Button = withStyles(styles)(Button);

const editStyle = {
  padding: "5px 5px",
  borderRadius: 5,
  color: button.text,
  "&:hover": {
    backgroundColor: ideaColor
  },
  cursor: "pointer"
};
const EditButton = ({ children, ...props }) => (
  <span css={editStyle} {...props}>
    {children}
  </span>
);

const ClusterButton = styled.div({
  background: clusterColor,
  borderRadius: 5,
  padding: "5px 0px 5px 0px",
  color: button.text,
  "&:hover": {
    backgroundColor: ideaColor
  }
});

export { Button, EditButton, ClusterButton };
