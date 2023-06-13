import { useState } from "react";
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
import { generateId, verifyNameProduct } from "@/helpers";

const ModalAddProduct = ({ closeModal, products }) => {
  const [nameProd, setNameProd] = useState(null);

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
    if (!allReady) {
      return;
    }

    const prevProducts = queryClient.getQueryData("products");

    const nameExist = verifyNameProduct(
      prevProducts || products,
      formData.name
    );

    if (nameExist) {
      setNameProd("El producto ya existe");
    } else {
      setNameProd(null);
    }

    if (!isLoading && !nameExist) {
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
          onError: (err) => {
            addToast(err.response.data.msg, false);
          },
        }
      );
    }
  };

  return (
    <Flex align="center" direction="column" w="450px" sm={`width: 95vw`}>
      <Header>
        <Text size="20px" color="white">
          Nuevo producto
        </Text>
      </Header>
      <Flex
        mt="20px"
        mb="20px"
        direction="column"
        w="400px"
        sm={`width: 100%`}
        pd="10px"
      >
        <FormProduct
          action={sendProduct}
          closeModal={closeModal}
          formData={formData}
          handleChange={handleChange}
          isLoading={isLoading}
          allReady={allReady}
          nameProd={nameProd}
        />
      </Flex>
    </Flex>
  );
};
export default ModalAddProduct;
