//components
import { CustomInput, Text, Flex } from "@/components";

const ItemTicket = ({ product, updateToSale }) => {
  const getTotal = () => {
    const result = Number(product.priceSale) * Number(product.toSale);
    return result;
  };

  return (
    <Flex align="center" mt="10px" gap="10px">
      <CustomInput
        style={{ textAlign: "center" }}
        name="quantity"
        placeholder="num"
        border="1px solid gray"
        w="15%"
        value={product.toSale}
        onChange={(e) => updateToSale(product._id, e.target.value)}
      />
      <Text ml="10px" w="45%">
        {product.name}
      </Text>
      <Flex justify="flex-end" w="20%">
        {product.priceSale}
      </Flex>
      <Flex justify="flex-end" w="20%">
        {getTotal()}
      </Flex>
    </Flex>
  );
};

export default ItemTicket;
