import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.div`
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background: none;
`;

export const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 1;
  margin-left: -65px;
`;

export const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
