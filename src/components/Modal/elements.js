import styled, { keyframes } from "styled-components";

export const BGModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(1.5px);
  z-index: 10000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  height: auto;
  width: auto;
  background: ${({ bg }) => bg || "black"};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 5px 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const ModalHead = styled.div`
  width: 100%;
  display: flex;
  direction: column;
`;

export const ModalBody = styled.div`
  min-height: 100%;
  height: auto;
  display: flex;
  direction: column;
  justify-items: start;
  align-items: center;
`;
