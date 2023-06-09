import styled, { css } from "styled-components";

const tdFixed = css`
  color: white;
  padding-left: 15px;
  &:last-child {
    position: sticky;
    right: 0;
  }
`;

const tdBasic = css`
  color: white;
  padding-left: 15px;
`;

const thFixed = css`
  text-align: left;
  color: white;
  font-weight: bold;
  padding-left: 15px;
  height: 10px;
  line-height: 1;
  &:last-child {
    position: sticky;
    right: 0;
  }
`;

const thBasic = css`
  text-align: left;
  color: white;
  font-weight: bold;
  padding-left: 15px;
  height: 10px;
  line-height: 1;
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead`
  height: 60px;
  background: ${({ bg }) => bg || "none"};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableBody = styled.tbody``;

export const TableTR = styled.tr`
  background: ${({ bg }) => bg || "none"};
  height: 55px;
  position: relative;
`;

export const TableTH = styled.th`
  background: ${({ bg }) => bg || "none"};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  ${({ fixed }) => (fixed ? thFixed : thBasic)}
`;

export const TableTD = styled.td`
  background: ${({ bg }) => bg || "none"};
  ${({ fixed }) => (fixed ? tdFixed : tdBasic)}
`;
