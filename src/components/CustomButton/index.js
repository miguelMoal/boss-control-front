import styled from "styled-components";

const CustomButton = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: ${({ pd }) => pd || "0px 20px"};
  border-radius: 5px;
  color: ${({ color }) => color || "black"};
  background: ${({ bg }) => bg || "none"};
  border: ${({ borderColor }) => `1px solid ${borderColor}` || "none"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  cursor: pointer;
`;

export default CustomButton;
