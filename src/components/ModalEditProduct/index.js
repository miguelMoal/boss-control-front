import { useState, useEffect } from "react";

//components
import { Text, Flex, CustomButton, CustomInput } from "@/components";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useForm } from "@/hooks";

//Connections
import { updateProductApi } from "@/connections";

//Externals
import { useMutation, useQueryClient } from "react-query";

const ModalEditProduct = ({ closeModal, product }) => {
  const [section, setSection] = useState("datos");

  const { handleChange, formData, setInitialData } = useForm();

  const { primaryColor, error } = useSelector((state) => state.theme);

  const { mutate: updateProduct } = useMutation(updateProductApi);

  const queryClient = useQueryClient();

  useEffect(() => {
    setInitialData(product);
  }, []);

  const allReady =
    formData?.name &&
    formData?.priceBuy &&
    formData?.priceSale &&
    formData?.available &&
    formData?.brand &&
    formData?.preferenceInStock;

  const newStock = formData?.add;

  const updateStock = () => {
    if (newStock) {
      updateProduct(
        { id: product._id, body: { available: formData.add } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("products");
            closeModal();
          },
        }
      );
    }
  };

  return (
    <Flex direction="column">
      <Flex
        gap="20px"
        h="40px"
        align="center"
        style={{ borderBottom: "1px solid gray" }}
      >
        <Text onClick={() => setSection("datos")}>Datos del producto</Text>
        <Text onClick={() => setSection("añadir")}>Añadir al stock</Text>
      </Flex>
      <Flex>
        {section == "datos" ? (
          <Flex mt="20px" align="center" direction="column">
            <Flex>
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
              <CustomInput
                value={formData?.priceBuy}
                placeholder="Precio de compra"
                border="1px solid gray"
                w="33%"
                name="priceBuy"
                onChange={handleChange}
              />
              <CustomInput
                value={formData?.priceSale}
                placeholder="Precio de venta"
                border="1px solid gray"
                w="33%"
                name="priceSale"
                onChange={handleChange}
              />
              <CustomInput
                value={formData?.brand}
                placeholder="Marca"
                border="1px solid gray"
                w="33%"
                name="brand"
                onChange={handleChange}
              />
            </Flex>
            <Flex mt="20px" gap="10px">
              <CustomInput
                value={formData?.available}
                placeholder="Disponibles"
                border="1px solid gray"
                w="50%"
                name="available"
                onChange={handleChange}
              />
              <CustomInput
                value={formData?.preferenceInStock}
                placeholder="Ideal en stock"
                border="1px solid gray"
                w="50%"
                name="preferenceInStock"
                onChange={handleChange}
              />
            </Flex>
            <Flex mt="20px" justify="center" gap="10px">
              <CustomButton
                onClick={() => closeModal()}
                color={error}
                borderColor={error}
              >
                Salir
              </CustomButton>
              <CustomButton color="white" bg={allReady ? primaryColor : "gray"}>
                Actualizar producto
              </CustomButton>
            </Flex>
          </Flex>
        ) : (
          <Flex mt="20px" align="center" direction="column">
            <Flex align="center" gap="10px" direction="column">
              <Text size="20px" weight="bold">
                {product.name}
              </Text>
              <Text>{`Stock Actual:  ${product.available} disponibles`}</Text>
              <CustomInput
                value={formData?.add}
                placeholder="Añadir al stock"
                border="1px solid gray"
                w="50%"
                name="add"
                onChange={handleChange}
              />
              <Text size="20px" weight="bold">
                {`Total:  ${
                  Number(product.available) + Number(formData?.add || 0)
                }`}
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
              <CustomButton
                onClick={() => updateStock()}
                color="white"
                bg={newStock ? primaryColor : "gray"}
              >
                Actualizar Stock
              </CustomButton>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ModalEditProduct;
