import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => wrap || "no-wrap"};
  box-sizing: ${({ boxSizing }) => boxSizing || "border-box"};
  gap: ${({ gap }) => gap || "0px"};
  padding: ${({ pd }) => pd || "0px"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "start"};
  justify-content: ${({ justify }) => justify || "flex-start"};
  background: ${({ bg }) => bg || "none"};
  height: ${({ h }) => h || "fit-content"};
  width: ${({ w }) => w || "100%"};
  color: ${({ color }) => color || "black"};
  box-shadow: ${({ shadow }) => shadow || "none"};
`;

export default Flex;
