//components
import { Flex, Text } from "@/components";
//icons
import { NotFoundIcon } from "@/assets/icons";
//Redux
import { useSelector } from "react-redux";

const NotFoundScreen = () => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  return (
    <Flex
      justify="center"
      align="center"
      color={primaryColor}
      direction="column"
      gap="15px"
    >
      <NotFoundIcon size="80px" />
      <Text size="20px" color={primaryColor}>
        Aun no tienes datos registrados
      </Text>
    </Flex>
  );
};

export default NotFoundScreen;
