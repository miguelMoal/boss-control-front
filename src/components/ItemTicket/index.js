import { useEffect } from "react";

//components
import { CustomInput, Text, Flex } from "@/components";
//Hooks
import { useForm } from "@/hooks";
//redux
import { useDispatch } from "react-redux";
//actions
import { addValue } from "@/redux/slices/total";

const ItemTicket = ({ product, updateTotal }) => {
  const { handleChange, formData, setInitialData } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    setInitialData({ quantity: 1 });
  }, []);

  const totalPrice = () => {
    const result = Number(formData?.quantity) * Number(product.priceSale);
    dispatch(
      addValue({
        id: product._id,
        result,
      })
    );
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
        value={formData?.quantity}
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
