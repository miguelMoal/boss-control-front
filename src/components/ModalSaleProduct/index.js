//Redux
import { useSelector } from "react-redux";
//components
import { Text, Flex, CustomButton, CustomInput } from "@/components";
//Hooks
import { useForm } from "@/hooks";

const ModalSaleProduct = ({ product, closeModal }) => {
  const { handleChange, formData, setInitialData } = useForm();

  const { primaryColor, error } = useSelector((state) => state.theme);

  return (
    <Flex mt="20px" align="center" direction="column">
      <Flex align="center" gap="10px" direction="column">
        <Text size="20px" weight="bold">
          {product.name}
        </Text>

        <CustomInput
          value={formData?.add}
          placeholder="Cantidad"
          border="1px solid gray"
          w="50%"
          name="add"
          onChange={handleChange}
        />
        <Text size="20px" weight="bold">
          {`Total:  ${Number(product.available) + Number(formData?.add || 0)}`}
        </Text>
      </Flex>

      <Flex mt="20px" justify="center" gap="10px">
        <CustomButton
          onClick={() => closeModal()}
          color={error}
          borderColor={error}
        >
          Salir
        </CustomButton>
        <CustomButton onClick={() => updateStock()} color="white" bg="gray">
          Actualizar Stock
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default ModalSaleProduct;
