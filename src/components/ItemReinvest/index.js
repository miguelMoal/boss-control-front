import { Flex, Text } from "@/components";
//redux
import { useSelector } from "react-redux";
//icons
import { CheckIcon } from "@/assets/icons";

const ItemReinvest = ({ product, toggleCheck, getMissingProduct }) => {
  const { btnPrimary, success, error, warning, tertiaryColor } = useSelector(
    (store) => store.theme
  );

  const productAvailable = Number(product.available);

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

  const resultReinvest = () => {
    const result = getMissingProduct(product) * product.priceBuy;
    return result.toFixed(2);
  };

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: `1px solid ${tertiaryColor}`, minHeight: "55px" }}
    >
      <Flex w="10px" h="100%" bg={handleColorBar()}></Flex>
      <Flex gap="10px" w="27%" align="center">
        <Flex
          h="15px"
          w="15px"
          ml="10px"
          bg={product.checked ? btnPrimary : "gray"}
          style={{ borderRadius: "2px", color: "white" }}
          align="center"
          justify="center"
          onClick={() => toggleCheck(product)}
        >
          <CheckIcon />
        </Flex>
        <Text>{product.name}</Text>
      </Flex>
      <Text w="13%">{product.brand}</Text>
      <Text w="10%">{product.available}</Text>
      <Text w="10%">{product.preferenceInStock}</Text>
      <Text w="15%">$ {product.priceBuy}</Text>
      <Text color={error} w="10%">
        {getMissingProduct(product)}
      </Text>
      <Text w="15%"> $ {resultReinvest()}</Text>
    </Flex>
  );
};

export default ItemReinvest;
