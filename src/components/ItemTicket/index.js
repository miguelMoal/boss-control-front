//components
import { CustomInput, CustomButton, Text, Flex } from "@/components";
//icons
import { RemoveIcon } from "@/assets/icons";

const ItemTicket = ({ product, updateToSale, deleteProductTicket }) => {
  const getTotal = () => {
    const result = Number(product.priceSale) * Number(product.toSale);
    return result;
  };

  return (
    <Flex align="center" mt="10px" gap="10px">
      <CustomButton
        onClick={() => deleteProductTicket(product)}
        w="15%"
        ml="10px"
        pd="0px"
        justify="flex-end"
      >
        <RemoveIcon size="25px" />
      </CustomButton>
      <CustomInput
        style={{ textAlign: "center" }}
        name="quantity"
        placeholder="num"
        border="1px solid gray"
        w="15%"
        value={product.toSale}
        onChange={(e) => updateToSale(product._id, e.target.value)}
      />
      <Text ml="10px" w="35%">
        {product.name}
      </Text>
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
