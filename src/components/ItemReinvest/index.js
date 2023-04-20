import { Flex, Text } from "@/components";
//redux
import { useSelector } from "react-redux";
//icons
import { CheckIcon } from "@/assets/icons";

const ItemReinvest = ({ product, toggleCheck }) => {
  const { primaryColor, success, error, warning } = useSelector(
    (store) => store.theme
  );

  const productAvailable = Number(product.available);

  console.log(product.name, product.checked);

  const handleColorBar = () => {
    const halfPreference = Number(product.preferenceInStock) / 2;
    if (productAvailable > halfPreference) {
      return success;
    } else if (productAvailable > 0) {
      return warning;
    } else {
      return error;
    }
  };

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: "1px solid gray", minHeight: "55px" }}
    >
      <Flex w="10px" h="100%" bg={handleColorBar()} mr="5px"></Flex>
      <Flex ml="15px" gap="10px" w="40%" align="center">
        <Flex
          h="15px"
          w="15px"
          bg={product.checked ? primaryColor : "gray"}
          style={{ borderRadius: "2px", color: "white" }}
          align="center"
          justify="center"
          onClick={() => toggleCheck(product)}
        >
          <CheckIcon />
        </Flex>
        <Text>{product.checked}</Text>
      </Flex>
      <Text w="20%">{product.brand}</Text>
      <Text w="20%">{product.available}</Text>
      <Text w="20%">{product.priceSale}</Text>
    </Flex>
  );
};

export default ItemReinvest;
