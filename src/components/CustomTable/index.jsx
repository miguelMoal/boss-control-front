import {
  Table,
  TableHead,
  TableBody,
  TableTR,
  TableTH,
  TableTD,
} from "./elements";

//Redux
import { useSelector } from "react-redux";

const CustomTable = ({ children }) => {
  return <Table>{children}</Table>;
};

CustomTable.Thead = ({ children }) => {
  const { primaryColor } = useSelector(({ theme }) => theme);

  return <TableHead bg={primaryColor}>{children}</TableHead>;
};

CustomTable.Tbody = ({ children, h }) => {
  return <TableBody h={h}>{children}</TableBody>;
};

CustomTable.TR = ({ children, bg }) => {
  return <TableTR bg={bg}>{children}</TableTR>;
};

CustomTable.TH = ({ children, fixed, minWidth }) => {
  return (
    <TableTH fixed={fixed} minWidth={minWidth}>
      {children}
    </TableTH>
  );
};

CustomTable.TD = ({ children, fixed }) => {
  return <TableTD fixed={fixed}>{children}</TableTD>;
};

export default CustomTable;
