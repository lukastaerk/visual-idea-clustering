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
Button = withStyles(styles)(Button);

const editStyle = {
  margin: "5px 5px",
  color: button.text,
  "&:hover": {
    backgroundColor: ideaColor
  }
};
const EditButton = ({ children, ...props }) => (
  <button css={editStyle} type="button" className="btn btn-sm small" {...props}>
    {children}
  </button>
);

const ClusterButton = styled.div({
  background: clusterColor,
  border: `.5px solid ${button.dark}`,
  borderRadius: 5,
  padding: "5px 0px 5px 0px",
  color: button.text,
  "&:hover": {
    backgroundColor: ideaColor
  }
});

export { Button, EditButton, ClusterButton };
