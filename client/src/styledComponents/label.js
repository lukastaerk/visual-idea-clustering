import styled from "@emotion/styled";

const Li = styled.li({
  alignItems: "center",
  backgroundColor: "#f1f8ff",
  borderRadius: 3,
  display: "inline-flex",
  margin: ".4em .4em 0 0",
  padding: ".1em .6em"
});

const XButton = styled.button({
  backgroundColor: "#f1f8ff",
  border: 0,
  borderBottomRightRadius: 3,
  borderLeft: "1px solid #b4d9ff",
  borderTopRightRadius: 3,
  color: "#6a737d",
  display: "inline-block",
  width: 26,
  fontSize: 14,
  marginRight: "-.6em"
});

export { Li, XButton };
