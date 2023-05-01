//components
import {
  Flex,
  Text,
  CustomButton,
  CustomInput,
  Header,
  Spinner,
} from "@/components";
import { useToastContext } from "@/components/Toast";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useForm } from "@/hooks";

//Connections
import { createProductApi } from "@/connections";

//Externals
import { useMutation, useQueryClient } from "react-query";

//Helpers
import { generateId } from "@/helpers";

const ModalAddProduct = ({ closeModal }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  const { handleChange, formData, setInitialData } = useForm();

  const { mutate: createProduct, isLoading } = useMutation(createProductApi);

  const queryClient = useQueryClient();
  const addToast = useToastContext();

  const allReady =
    formData?.name &&
    formData?.priceBuy &&
    formData?.priceSale &&
    formData?.available &&
    formData?.brand &&
    formData?.preferenceInStock;

  const sendProduct = () => {
    if (!isLoading) {
      createProduct(
        { ...formData, color: "black", category: "all" },
        {
          onSuccess: () => {
            addToast("El producto de creó correctamente", true);
            queryClient.invalidateQueries("products");
            queryClient.setQueryData("products", (oldData) => [
              ...oldData,
              { ...formData, _id: generateId() },
            ]);
            setInitialData({});
          },
          onError: () => {
            addToast("Ocurrió un error al crear el producto", false);
          },
        }
      );
    }
  };

  return (
    <Flex align="center" direction="column">
      <Header>
        <Text size="20px" color="white">
          Nuevo producto
        </Text>
      </Header>

      <Flex pd="10px" direction="column">
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
          {!isLoading && (
            <CustomButton color="white" bg={error} onClick={() => closeModal()}>
              Salir
            </CustomButton>
          )}

          <CustomButton
            bg={allReady ? primaryColor : "gray"}
            onClick={() => sendProduct()}
          >
            <Flex align="center" gap="20px" color="white">
              {isLoading && <Spinner />}
              Añadir producto
            </Flex>
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ModalAddProduct;
