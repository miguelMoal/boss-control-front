import styled from "styled-components";

const CustomInput = styled.input`
  border: ${({ border }) => border || "none"};
  background: ${({ bg }) => bg || "none"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  color: ${({ color }) => color || "black"};
  padding: ${({ pd }) => pd || "10px"};
  width: ${({ w }) => w || "fit-content"};
  height: ${({ h }) => h || "fit-content"};
  border-color: ${({ borderColor }) => borderColor || "black"};
  border-radius: 5px;
`;

export default CustomInput;
