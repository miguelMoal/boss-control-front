import { useState, useEffect } from "react";

//components
import {
  Text,
  Flex,
  CustomButton,
  CustomInput,
  Header,
  FormProduct,
} from "@/components";

import { useToastContext } from "@/components/Toast";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useForm } from "@/hooks";

//Connections
import { updateProductApi, addToStockApi } from "@/connections";

//Externals
import { useMutation, useQueryClient } from "react-query";

const ModalEditProduct = ({ closeModal, product }) => {
  const [section, setSection] = useState("datos");

  const { handleChange, formData, setInitialData } = useForm();

  const { primaryColor, error } = useSelector((state) => state.theme);

  const { mutate: updateProduct, isLoading } = useMutation(updateProductApi);
  const { mutate: addToStock, isLoading: loadingAddToStock } =
    useMutation(addToStockApi);

  const queryClient = useQueryClient();
  const addToast = useToastContext();

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

  const sendNewData = () => {
    updateProduct(
      { id: product._id, body: { ...formData } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          queryClient.setQueryData("products", (oldData) => {
            const newData = oldData.map((_product) => {
              if (_product._id == product._id) {
                return { ..._product, ...formData };
              } else {
                return _product;
              }
            });
            return newData;
          });
          addToast("El producto de actualizó correctamente", true);
          !isLoading && closeModal();
        },
        onError: () => {
          addToast("Algo salió mal al actualizar el producto", false);
        },
      }
    );
  };

  const updateStock = () => {
    if (newStock) {
      addToStock(
        { id: product._id, body: { toAdd: formData.add } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("products");
            queryClient.setQueryData("products", (oldData) => {
              const newData = oldData.map((_product) => {
                if (_product._id == product._id) {
                  return {
                    ..._product,
                    available:
                      Number(formData.available) + Number(formData.add),
                  };
                } else {
                  return _product;
                }
              });
              return newData;
            });
            addToast("El producto de actualizó correctamente", true);
            !isLoading && closeModal();
          },
        }
      );
    }
  };

  return (
    <Flex direction="column">
      <Header>
        <Text color="white" size="20px">
          Editar
        </Text>
      </Header>
      {/* <Flex
        justify="center"
        mt="10px"
        gap="10px"
        pd="20px"
        style={{ paddingBottom: "0px" }}
      >
        <CustomButton
          borderColor={primaryColor}
          onClick={() => setSection("datos")}
          bg={section == "datos" && primaryColor}
          color={section == "datos" && "white"}
        >
          Datos del producto
        </CustomButton>
        <CustomButton
          borderColor={primaryColor}
          onClick={() => setSection("añadir")}
          bg={section != "datos" && primaryColor}
          color={section != "datos" && "white"}
        >
          Anadir al stock
        </CustomButton>
      </Flex> */}
      <Flex pd="20px" style={{ paddingTop: "0px" }}>
        {section == "datos" ? (
          <Flex mt="20px" align="center" direction="column" w="400px">
            <FormProduct
              action={sendNewData}
              closeModal={closeModal}
              formData={formData}
              handleChange={handleChange}
              isLoading={isLoading}
              allReady={allReady}
              isEdit={true}
            />
          </Flex>
        ) : (
          <Flex mt="20px" align="center" direction="column" w="350px">
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
