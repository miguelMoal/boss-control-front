import { useState } from "react";

//HOC
import { ProtectedRoute } from "@/HOC";

//components
import {
  Layout,
  Flex,
  Text,
  CustomButton,
  ModalAddProduct,
  Search,
  HandleStatus,
  ModalEditProduct,
  ModalRemove,
  TableProducts,
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

const Products = () => {
  const [productToDelete, setProductToDelete] = useState(null);

  const { btnPrimary } = useSelector((state) => state.theme);

  const { data: products, status } = useQuery(["products"], getProductsApi);
  const { mutate: deleteProduct, isLoading: loadingDeleteProduct } =
    useMutation(deleteProductApi);

  const { handleChange, formData } = useForm();

  const productsFiltered = products?.filter((p) =>
    p.name.toLowerCase()?.includes(formData?.search?.toLowerCase() || "")
  );

  const queryClient = useQueryClient();
  const addToast = useToastContext();

  const { showModal, closeModal, ModalWrapper } = useModal();

  const addNewProduct = () => {
    showModal(
      <ModalAddProduct closeModal={closeModal} products={productsFiltered} />
    );
  };

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
      onError: (err) => {
        addToast(err.response.data.msg, false);
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
          bg={btnPrimary}
          color="white"
          onClick={() => addNewProduct()}
          style={{
            backgroundSize: "210% 210%",
            backgroundPosition: "100% 0",
          }}
        >
          <Text sm={`display: none`}>Añadir nuevo producto</Text>
          <Text
            md={`display: none`}
            xl={`display: none`}
            xxl={`display: none`}
            bigger={`display: none`}
          >
            Añadir
          </Text>
        </CustomButton>
      </Flex>
      <ModalWrapper />
      <HandleStatus status={status} data={productsFiltered}>
        <TableProducts
          productsFiltered={productsFiltered}
          loadingDeleteProduct={loadingDeleteProduct}
          handleEditProduct={handleEditProduct}
          handleDelete={handleDelete}
          productToDelete={productToDelete}
        />
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(Products);
