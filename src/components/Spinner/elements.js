import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  border-top: ${({ size, color }) => `${size / 8}px solid ${color || "black"}`};
  border: ${({ size }) => `${size / 0}px solid  rgba(0,0,0,0)`};
  border-radius: 50%;
  width: ${({ size }) => (size ? `${size}px` : "20px")};
  height: ${({ size }) => (size ? `${size}px` : "20px")};
  animation: ${spin} 1s linear infinite;
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
`;
