//components
import { Flex, Text, CustomButton, CustomInput } from "@/components";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useForm } from "@/hooks";

//Connections
import { createProductApi } from "@/connections";

//Externals
import { useMutation, useQueryClient } from "react-query";

const ModalAddProduct = ({ closeModal }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  const { handleChange, formData } = useForm();

  const { mutate: createProduct } = useMutation(createProductApi);

  const queryClient = useQueryClient();

  const allReady =
    formData?.name &&
    formData?.priceBuy &&
    formData?.priceSale &&
    formData?.available &&
    formData?.brand &&
    formData?.preferenceInStock;

  const sendProduct = () => {
    createProduct(
      { ...formData, color: "black", category: "all" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
        },
      }
    );
  };

  return (
    <Flex align="center" direction="column">
      <Text size="20px" color={primaryColor}>
        Nuevo producto
      </Text>
      <Flex mt="20px">
        <CustomInput
          placeholder="Nombre del producto"
          border="1px solid gray"
          w="100%"
          name="name"
          onChange={handleChange}
        />
      </Flex>
      <Flex mt="20px" gap="10px">
        <CustomInput
          placeholder="Precio de compra"
          border="1px solid gray"
          w="33%"
          name="priceBuy"
          onChange={handleChange}
        />
        <CustomInput
          placeholder="Precio de venta"
          border="1px solid gray"
          w="33%"
          name="priceSale"
          onChange={handleChange}
        />
        <CustomInput
          placeholder="Marca"
          border="1px solid gray"
          w="33%"
          name="brand"
          onChange={handleChange}
        />
      </Flex>
      <Flex mt="20px" gap="10px">
        <CustomInput
          placeholder="Disponibles"
          border="1px solid gray"
          w="50%"
          name="available"
          onChange={handleChange}
        />
        <CustomInput
          placeholder="Ideal en stock"
          border="1px solid gray"
          w="50%"
          name="preferenceInStock"
          onChange={handleChange}
        />
      </Flex>
      <Flex mt="20px" justify="center" gap="10px">
        <CustomButton
          color={error}
          borderColor={error}
          onClick={() => closeModal()}
        >
          Salir
        </CustomButton>
        <CustomButton
          bg={allReady ? primaryColor : "gray"}
          color="white"
          onClick={() => sendProduct()}
        >
          Añadir producto
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default ModalAddProduct;
