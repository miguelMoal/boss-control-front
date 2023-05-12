import { useState } from "react";

//HOC
import { ProtectedRoute } from "@/HOC";

//components
import {
  Layout,
  ItemProduct,
  Flex,
  Text,
  CustomButton,
  ModalAddProduct,
  Search,
  HandleStatus,
  ModalEditProduct,
  ModalRemove,
  Spinner,
} from "@/components";
import { useToastContext } from "@/components/Toast";

//externals
import { useQuery, useMutation, useQueryClient } from "react-query";

//conections
import { getProductsApi, deleteProductApi } from "@/connections";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useModal, useForm } from "@/hooks";

//icons
import { RemoveIcon } from "@/assets/icons";

const headerProducts = [
  { name: "Nombre", id: 1, space: "30%" },
  { name: "Marca", id: 2, space: "12%" },
  { name: "Stock", id: 3, space: "12%" },
  { name: "Precio compra", id: 4, space: "12%" },
  { name: "Precio venta", id: 5, space: "12%" },
  { name: "Acciones", id: 6, space: "22%" },
];

const Products = () => {
  const [productToDelete, setProductToDelete] = useState(null);

  const { primaryColor, warning, error } = useSelector((state) => state.theme);

  const { data: products, status } = useQuery(["products"], getProductsApi);
  const { mutate: deleteProduct, isLoading: loadingDeleteProduct } =
    useMutation(deleteProductApi);

  const { handleChange, formData } = useForm();

  const queryClient = useQueryClient();
  const addToast = useToastContext();

  const { showModal, closeModal, ModalWrapper } = useModal();

  const addNewProduct = () => {
    showModal(<ModalAddProduct closeModal={closeModal} />);
  };

  const productsFiltered = products?.filter((p) =>
    p.name.includes(formData?.search || "")
  );

  const handleEditProduct = (product) => {
    showModal(<ModalEditProduct closeModal={closeModal} product={product} />);
  };

  const handleDelete = (id) => {
    handleProductToDelete(id);
    showModal(
      <ModalRemove
        closeModal={closeModal}
        action={_deleteProduct}
        id={id}
        handleProductToDelete={handleProductToDelete}
      />
    );
  };

  const handleProductToDelete = (value) => {
    setProductToDelete(value);
  };

  const _deleteProduct = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        addToast("El producto se eliminó correctamente", true);
        queryClient.setQueryData("products", (oldData) => {
          const newData = oldData.filter((p) => p._id != id);
          return newData;
        });
        queryClient.invalidateQueries("products");
        handleProductToDelete(null);
      },
      onError: () => {
        addToast("Ocurrió un error al eliminar el producto", false);
        handleProductToDelete(null);
      },
    });
    closeModal();
  };

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} />
        <CustomButton
          bg={primaryColor}
          color="white"
          onClick={() => addNewProduct()}
        >
          Añadir nuevo producto
        </CustomButton>
      </Flex>
      <ModalWrapper />
      <HandleStatus status={status} data={productsFiltered}>
        <Flex
          pd="10px"
          align="center"
          h="60px"
          shadow="0px 4px 8px #d9d9d9"
          bg={primaryColor}
          style={{ borderRadius: "5px" }}
        >
          {headerProducts.map((header) => (
            <Text w={header.space} weight="bold" color="white">
              {header.name}
            </Text>
          ))}
        </Flex>
        <Flex
          direction="column"
          bg="white"
          h="calc(100% - 120px)"
          pd="0px"
          style={{ overflowY: "auto" }}
        >
          {productsFiltered?.map((product) => (
            <ItemProduct product={product} key={product._id}>
              <CustomButton
                borderColor={warning}
                ml="10px"
                onClick={() => handleEditProduct(product)}
              >
                Editar
              </CustomButton>
              <CustomButton
                ml="10px"
                pd="0px"
                onClick={() => handleDelete(product._id)}
              >
                {loadingDeleteProduct && productToDelete == product._id ? (
                  <Spinner color={error} size="25" />
                ) : (
                  <RemoveIcon />
                )}
              </CustomButton>
            </ItemProduct>
          ))}
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(Products);
