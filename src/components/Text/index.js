import styled from "styled-components";

const Text = styled.div`
  background: ${({ bg }) => bg || "none"};
  height: ${({ h }) => h || "fit-content"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  font-size: ${({ size }) => size || "16px"};
  font-weight: ${({ weight }) => weight || "ligth"};
  color: ${({ color }) => color || "white"};
  width: ${({ w }) => w || "fit-content"};
`;

export default Text;
