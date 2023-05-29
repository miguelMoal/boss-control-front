//components
import { Flex } from "@/components";
//Redux
import { useSelector } from "react-redux";

const Header = ({ children }) => {
  const { primaryColor } = useSelector((state) => state.theme);

  return (
    <Flex
      gap="20px"
      h="50px"
      align="center"
      bg={primaryColor}
      justify="flex-start"
      pd="0px 15px"
    >
      {children}
    </Flex>
  );
};

export default Header;
