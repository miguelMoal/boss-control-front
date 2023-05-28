//components
import { CustomInput, CustomButton, Text, Flex } from "@/components";

//icons
import { RemoveIcon } from "@/assets/icons";

//Redux
import { useSelector } from "react-redux";

const ItemTicket = ({ product, updateToSale, deleteProductTicket }) => {
  const { gray, error } = useSelector((state) => state.theme);

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
        color={error}
      >
        <RemoveIcon size="25px" />
      </CustomButton>
      <CustomInput
        style={{ textAlign: "center" }}
        name="quantity"
        placeholder="num"
        border={`1px solid ${gray}`}
        w="15%"
        value={product.toSale}
        onChange={(e) => updateToSale(product._id, e.target.value)}
        type="number"
        min={0}
      />
      <Text ml="10px" w="35%">
        {product.name}
      </Text>
      <Flex justify="flex-end" w="15%">
        <Text>{product.priceSale}</Text>
      </Flex>
      <Flex justify="flex-end" w="15%">
        <Text>{getTotal()}</Text>
      </Flex>
    </Flex>
  );
};

export default ItemTicket;
