//Components
import { Flex, CustomButton, CustomInput, Spinner, Text } from "@/components";

//Redux
import { useSelector } from "react-redux";

const FormProduct = ({
  closeModal,
  action,
  formData,
  handleChange,
  isLoading,
  allReady,
  isEdit = false,
}) => {
  const { primaryColor, error } = useSelector((state) => state.theme);
  return (
    <>
      <Flex direction="column">
        <Text>Nombre</Text>
        <CustomInput
          value={formData?.name}
          placeholder="Nombre del producto"
          border="1px solid gray"
          w="100%"
          name="name"
          onChange={handleChange}
        />
      </Flex>
      <Flex mt="20px" gap="10px">
        <Flex w="33%" direction="column">
          <Text>Precio compra</Text>
          <CustomInput
            value={formData?.priceBuy}
            placeholder="Precio compra"
            border="1px solid gray"
            name="priceBuy"
            w="100%"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </Flex>
        <Flex w="33%" direction="column">
          <Text>Precio venta</Text>
          <CustomInput
            value={formData?.priceSale}
            placeholder="Precio venta"
            border="1px solid gray"
            w="100%"
            name="priceSale"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </Flex>
        <Flex w="33%" direction="column">
          <Text>Marca</Text>
          <CustomInput
            value={formData?.brand}
            placeholder="Marca"
            border="1px solid gray"
            w="100%"
            name="brand"
            onChange={handleChange}
          />
        </Flex>
      </Flex>
      <Flex mt="20px" gap="10px">
        <Flex w="50%" direction="column">
          <Text>Disponibles</Text>
          <CustomInput
            value={formData?.available}
            placeholder="Disponibles"
            border="1px solid gray"
            w="100%"
            name="available"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </Flex>
        <Flex w="50%" direction="column">
          <Text>Ideal en stock</Text>
          <CustomInput
            value={formData?.preferenceInStock}
            placeholder="Ideal en stock"
            border="1px solid gray"
            w="100%"
            name="preferenceInStock"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </Flex>
      </Flex>
      <Flex mt="20px" justify="center" gap="10px">
        {!isLoading && (
          <CustomButton onClick={() => closeModal()} color="white" bg={error}>
            Salir
          </CustomButton>
        )}
        <CustomButton
          color="white"
          bg={allReady ? primaryColor : "gray"}
          onClick={() => action()}
        >
          {isLoading && <Spinner color="white" size="25" mr="15px" />}
          {!isEdit ? "Añadir producto" : "Actualizar producto"}
        </CustomButton>
      </Flex>
    </>
  );
};
export default FormProduct;
