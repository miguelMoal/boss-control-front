//components
import { Flex, Text } from "@/components";

const ItemAnalitycs = ({ icon, value, title, bg, textColor, iconBg }) => {
  return (
    <Flex
      color={textColor}
      align="center"
      bg={bg}
      style={{
        backgroundSize: "210% 210%",
        backgroundPosition: "100% 0",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <Flex color={textColor} w="100px" bg={iconBg} pd="5px">
        {icon}
      </Flex>
      <Flex direction="column" align="center">
        <Text size="18px">{title}</Text>
        <Text size="35px" weight="bold">
          {value}
        </Text>
      </Flex>
    </Flex>
  );
};
export default ItemAnalitycs;
