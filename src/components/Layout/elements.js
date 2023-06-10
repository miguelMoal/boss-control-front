import styled from "styled-components";

export const NavBar = styled.div`
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.primaryColor};
  display: flex;
  justify-content: flex-end;
  padding: 0px 20px;
  align-items: center;
`;

export const SideBar = styled.div`
  width: 300px;
  height: calc(100vh - 80px);
  background: ${({ theme }) => theme.primaryColor};
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ChildrenContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  padding: 10px;
  box-sizing: border-box;
  overflow-y: hidden;
  @media (min-width: 1200px) {
    width: calc(100vw - 300px);
    height: calc(100vh - 80px);
  }
`;

export const Content = styled.div`
  display: flex;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
`;

export const FlexBetween = styled.div``;
