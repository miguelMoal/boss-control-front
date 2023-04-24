import { Flex, Text } from "@/components";
//redux
import { useSelector } from "react-redux";
//icons
import { CheckIcon } from "@/assets/icons";

const ItemReinvest = ({ product, toggleCheck, getMissingProduct }) => {
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
      <Flex w="10px" h="100%" bg={handleColorBar()}></Flex>
      <Flex gap="10px" w="30%" align="center">
        <Flex
          h="15px"
          w="15px"
          ml="10px"
          bg={product.checked ? primaryColor : "gray"}
          style={{ borderRadius: "2px", color: "white" }}
          align="center"
          justify="center"
          onClick={() => toggleCheck(product)}
        >
          <CheckIcon />
        </Flex>
        <Text>{product.name}</Text>
      </Flex>
      <Text w="15%">{product.brand}</Text>
      <Text w="8%">{product.available}</Text>
      <Text w="10%">{product.preferenceInStock}</Text>
      <Text w="12%">$ {product.priceBuy}</Text>
      <Text color={error} w="10%">
        {getMissingProduct(product)}
      </Text>
      <Text w="15%"> $ {getMissingProduct(product) * product.priceBuy}</Text>
    </Flex>
  );
};

export default ItemReinvest;
