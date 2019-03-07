import styled from "@emotion/styled";

const Box = styled.div(
  {
    margin: "20px 10px",
    overflow: "auto",
    maxHeight: "calc(100vh - 300px)"
  },
  ({ color, backgroundColor }) => ({
    color,
    backgroundColor
  })
);

export { Box };
