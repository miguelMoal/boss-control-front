//Redux
import { useSelector } from "react-redux";
//components
import { Text, Flex, CustomButton, CustomInput } from "@/components";
//Hooks
import { useForm } from "@/hooks";

const ModalSaleProduct = ({ product, closeModal, total }) => {
  const { handleChange, formData } = useForm();

  const { error, success } = useSelector((state) => state.theme);

  const getTotalSale = () => {
    let result = 0;
    if (formData?.cash) {
      result = Number(formData.cash || 0) - total;
    }
    return result;
  };

  return (
    <Flex pd="20px" mt="20px" align="center" direction="column">
      <Flex align="center" gap="10px" direction="column">
        <Text size="20px" weight="bold">
          Total Neto:${total}
        </Text>
        <CustomInput
          placeholder="Efectivo"
          border="1px solid gray"
          w="33%"
          name="cash"
          onChange={handleChange}
        />
        <Text size="20px" weight="bold">
          Cambio:{getTotalSale()}
        </Text>
      </Flex>

      <Flex mt="20px" justify="center" gap="10px">
        <CustomButton
          color={error}
          borderColor={error}
          onClick={() => closeModal()}
        >
          Cancelar
        </CustomButton>
        <CustomButton onClick={() => updateStock()} bg={success}>
          Vender
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default ModalSaleProduct;
