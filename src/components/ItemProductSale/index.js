//components
import { Flex, Text } from "@/components";
//redux
import { useSelector } from "react-redux";

const ItemProductSale = ({ product, children }) => {
  const { success, error, warning, tertiaryColor } = useSelector(
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

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: `1px solid ${tertiaryColor}`, minHeight: "55px" }}
      sm={`display: flex; justify-content: space-between`}
    >
      <Flex w="10px" h="100%" bg={handleColorBar()} mr="5px"></Flex>
      <Text w="35%" sm={`flex:3`}>
        {product.name}
      </Text>
      <Text w="15%" sm={`display: none`}>
        {product.brand}
      </Text>
      <Text w="15%" sm={`display: none`}>
        {product.available}
      </Text>
      <Text w="15%" sm={`flex:2`}>
        $ {product.priceSale}
      </Text>
      <Flex w="20%" sm={`flex:1`}>
        {children}
      </Flex>
    </Flex>
  );
};

export default ItemProductSale;
