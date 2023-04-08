import styled from "styled-components";

export const NavBar = styled.div`
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.primaryColor};
`;

export const SideBar = styled.div`
  width: 350px;
  height: calc(100vh - 80px);
  background: ${({ theme }) => theme.primaryColor};
  display: flex;
  flex-direction: column;
`;

export const ChildrenContainer = styled.div`
  width: calc(100vw - 350px);
  height: calc(100vh - 80px);
  padding: 10px;
  background: white;
`;

export const Content = styled.div`
  display: flex;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
`;
