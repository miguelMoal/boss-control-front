import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead`
  height: 60px;
  background: ${({ bg }) => bg || "none"};
`;

export const TableBody = styled.tbody``;

export const TableTR = styled.tr``;

export const TableTH = styled.th`
  text-align: left;
  color: white;
  font-weight: bold;
  padding-left: 15px;
`;

export const TableTD = styled.td`
  padding-left: 15px;
  color: white;
`;
