import styled from "@emotion/styled";

const Box = styled.div(
  {
    margin: "20px 10px",
    borderRadius: 5,
    overflow: "hidden",
    textAlign: "center"
  },
  ({ color, backgroundColor }) => ({
    color,
    backgroundColor
  })
);

export { Box };
