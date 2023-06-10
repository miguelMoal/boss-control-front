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
    <Flex align="center" mt="10px">
      <CustomButton
        onClick={() => deleteProductTicket(product)}
        pd="0px"
        color={error}
        style={{ width: "45px" }}
      >
        <RemoveIcon size="25px" />
      </CustomButton>
      <Flex w="65px">
        <CustomInput
          style={{ textAlign: "center" }}
          name="quantity"
          placeholder="num"
          border={`1px solid ${gray}`}
          w="50px"
          value={product.toSale}
          onChange={(e) => updateToSale(product._id, e.target.value)}
          type="number"
          min={0}
          pd="5px 0px"
        />
      </Flex>
      <Text w="40%" size="13px" xxl={`font-size: 16px`}>
        {product.name}
      </Text>
      <Flex justify="flex-end" w="25%" xxl={`display: flex`}>
        <Text size="13px" xxl={`font-size: 16px`}>
          $ {product.priceSale}
        </Text>
      </Flex>
      <Flex justify="flex-end" w="25%">
        <Text size="13px" xxl={`font-size: 16px`}>
          $ {getTotal()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ItemTicket;
