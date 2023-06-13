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

CustomTable.Tbody = ({ children }) => {
  return <TableBody>{children}</TableBody>;
};

CustomTable.TR = ({ children }) => {
  return <TableTR>{children}</TableTR>;
};

CustomTable.TH = ({ children }) => {
  return <TableTH>{children}</TableTH>;
};

CustomTable.TD = ({ children }) => {
  return <TableTD>{children}</TableTD>;
};

export default CustomTable;
