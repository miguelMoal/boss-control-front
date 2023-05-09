import { Flex, Text } from "@/components";

//redux
import { useSelector } from "react-redux";

const ItemProductSale = ({ product, children }) => {
  const { success, error, warning } = useSelector((store) => store.theme);

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

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: "1px solid gray", minHeight: "55px" }}
    >
      <Flex w="10px" h="100%" bg={handleColorBar()} mr="5px"></Flex>
      <Text w="30%">{product.name}</Text>
      <Text w="15%">{product.brand}</Text>
      <Text w="15%">{product.available}</Text>
      <Text w="15%">{product.priceSale}</Text>
      <Flex w="25%">{children}</Flex>
    </Flex>
  );
};

export default ItemProductSale;
