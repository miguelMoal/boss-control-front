//components
import { CustomInput, Text, Flex } from "@/components";
//Hooks
import { useForm } from "@/hooks";
//redux
import { useDispatch } from "react-redux";
//actions
import { addValue } from "@/redux/slices/total";

const ItemTicket = ({ product, updateTotal }) => {
  const { handleChange, formData } = useForm();

  const dispatch = useDispatch();

  const totalPrice = () => {
    const result = Number(formData?.quantity || 1) * Number(product.priceSale);
    dispatch(addValue(result));
    return result;
  };

  return (
    <Flex align="center" mt="10px" gap="10px">
      <CustomInput
        name="quantity"
        onChange={handleChange}
        placeholder="num"
        border="1px solid gray"
        w="12%"
        value={formData?.quantity || 1}
      />
      <Text w="48%">{product.name}</Text>
      <Flex justify="flex-end" w="15%">
        {product.priceSale}
      </Flex>
      <Flex justify="flex-end" w="15%">
        {totalPrice()}
      </Flex>
    </Flex>
  );
};

export default ItemTicket;
