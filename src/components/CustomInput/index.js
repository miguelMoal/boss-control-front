import styled from "styled-components";

const CustomInput = styled.input`
  border: ${({ border }) => border || "none"};
  background: ${({ bg }) => bg || "none"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  color: ${({ color }) => color || "white"};
  padding: ${({ pd }) => pd || "10px"};
  width: ${({ w }) => w || "fit-content"};
  height: ${({ h }) => h || "fit-content"};
  letter-spacing: 1.3px;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

export default CustomInput;
