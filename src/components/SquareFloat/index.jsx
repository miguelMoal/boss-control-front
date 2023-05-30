import styled, { keyframes } from "styled-components";

const moveLRAnimation = keyframes`
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
`;

const SquareFloat = styled.div`
  animation: ${moveLRAnimation} 7s infinite;
  background: linear-gradient(0deg, #3358f4, #1d8cf8);
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  opacity: ${({ opacity }) => opacity || 0.3};
  position: absolute;
  border-radius: 20%;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: -1;
  animation-delay: ${({ animationDelay }) => animationDelay || "0s"};
`;
export default SquareFloat;
