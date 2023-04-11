//components
import { ItemProduct, Flex, Text } from "@/components";

const HandleStatus = ({ status, children }) => {
  if (status == "loading") {
    return (
      <Flex w="100%" h="100%" align="center" justify="center">
        <Text>Cargando...</Text>
      </Flex>
    );
  } else if (status == "success") {
    return <>{children}</>;
  } else {
    return (
      <Flex w="100%" h="100%" align="center" justify="center">
        <Text>Error...</Text>
      </Flex>
    );
  }
};

export default HandleStatus;
