import styled from "styled-components";

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 4px;
      font-size: 12px;
    }
  }
`;

const CustomTable = ({ headers, data, children }) => {
  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
              {children && <td>{children}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default CustomTable;
