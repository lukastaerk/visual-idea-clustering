import styled from "@emotion/styled";

export const IdeaContainer = styled.div(
  {
    position: "relative",
    margin: "0 auto",
    width: 120,
    height: 120
  },
  ({ hoverColor }) => ({
    "&:hover": {
      backgroundColor: hoverColor
    }
  })
);
