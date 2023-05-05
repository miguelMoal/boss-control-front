//components
import { Flex, Text, FormProduct, Header } from "@/components";
import { useToastContext } from "@/components/Toast";
//Hooks
import { useForm } from "@/hooks";
//Connections
import { createProductApi } from "@/connections";
//Externals
import { useMutation, useQueryClient } from "react-query";
//Helpers
import { generateId } from "@/helpers";

const ModalAddProduct = ({ closeModal }) => {
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
            addToast("El producto se creó correctamente", true);
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
    <Flex w="450px" align="center" direction="column">
      <Header>
        <Text size="20px" color="white">
          Nuevo producto
        </Text>
      </Header>

      <Flex mt="20px" mb="20px" direction="column" w="400px">
        <FormProduct
          action={sendProduct}
          closeModal={closeModal}
          formData={formData}
          handleChange={handleChange}
          isLoading={isLoading}
          allReady={allReady}
        />
      </Flex>
    </Flex>
  );
};
export default ModalAddProduct;
