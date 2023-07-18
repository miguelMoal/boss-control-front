import styled from "styled-components";

const Flex = styled.div`
  display: ${({ display }) => display || "flex"};
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
  border-radius: ${({ radius }) => radius || "0px"};

  @media (max-width: 575px) {
    ${({ sm }) => sm}
  }

  @media (min-width: 576px) and (max-width: 767px) {
    ${({ md }) => md}
  }

  @media (min-width: 768px) and (max-width: 991px) {
    ${({ lg }) => lg}
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    ${({ xl }) => xl}
  }

  @media (min-width: 1200px) {
    ${({ xxl }) => xxl}
  }

  @media (min-width: 1400px) {
    ${({ bigger }) => bigger}
  }
`;

export default Flex;
