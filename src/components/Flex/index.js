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

  @media (max-width: 767px) {
    ${({ smallStyles }) => smallStyles}
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    ${({ mediumStyles }) => mediumStyles}
  }

  @media (min-width: 1024px) {
    ${({ largeStyles }) => largeStyles}
  }
`;

export default Flex;
