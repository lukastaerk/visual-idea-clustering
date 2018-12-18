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
    backgroundColor,
    border: `1px solid ${color}`
  })
);

export { Box };
