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
  display: ${({ display }) => display || "block"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  line-height: ${({ lineHeight }) => lineHeight || "normal"};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || "normal"};

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
`;

export default Text;
