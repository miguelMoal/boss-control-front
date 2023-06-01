//components
import {
  ItemProduct,
  Flex,
  Text,
  ErrorScreen,
  Spinner,
  NotFoundScreen,
} from "@/components";
//Redux
import { useSelector } from "react-redux";

const HandleStatus = ({ status, children, data }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);
  if (status == "loading") {
    return (
      <Flex
        direction="column"
        w="100%"
        h="100%"
        align="center"
        justify="center"
        gap="15px"
      >
        <Spinner />
        <Text size="20px">Cargando...</Text>
      </Flex>
    );
  } else if (status == "success") {
    if (data.length > 0) {
      return <>{children}</>;
    } else {
      return (
        <Flex w="100%" h="100%" align="center" justify="center">
          <NotFoundScreen />
        </Flex>
      );
    }
  } else {
    return (
      <Flex w="100%" h="100%" align="center" justify="center">
        <ErrorScreen />
      </Flex>
    );
  }
};

export default HandleStatus;
