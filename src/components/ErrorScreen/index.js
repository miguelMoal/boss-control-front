//components
import { Flex, Text } from "@/components";
//Redux
import { useSelector } from "react-redux";
//icons
import { ErrorIcon } from "@/assets/icons";

const ErrorScreen = () => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  return (
    <Flex align="center" gap="10px" direction="column" pd="20px">
      <Flex justify="center" gap="20px" align="center" color={error}>
        <ErrorIcon size="70px" />
        <Text size="70px" color={primaryColor}>
          Error
        </Text>
      </Flex>
      <Text color={primaryColor}>Ha ocurrido un error intentalo mas tarde</Text>
    </Flex>
  );
};

export default ErrorScreen;
