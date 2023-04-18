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
        name="quantity"
        placeholder="num"
        border="1px solid gray"
        w="12%"
        value={product.toSale}
        onChange={(e) => updateToSale(product._id, e.target.value)}
      />
      <Text w="48%">{product.name}</Text>
      <Flex justify="flex-end" w="15%">
        {product.priceSale}
      </Flex>
      <Flex justify="flex-end" w="15%">
        {getTotal()}
      </Flex>
    </Flex>
  );
};

export default ItemTicket;
