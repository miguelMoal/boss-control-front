import styled, { keyframes } from "styled-components";

const appearFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const disappearToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const decreaseLine = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

export const ContentToast = styled.div`
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 50000;
`;

export const Line = styled.div`
  position: fixed;
  bottom: 0px;
  height: 2px;
  background: ${(props) => props.color || "#010101"};
  animation: ${decreaseLine} 3s linear forwards;
`;

export const Toast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  gap: 0.5rem;
  cursor: pointer;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
  animation: ${appearFromRight} 1s forwards;
  &.hide {
    animation: ${disappearToRight} 1s forwards;
  }
`;

export const ToastGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
