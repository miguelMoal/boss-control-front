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
import { RemoveIcon, EditIcon } from "@/assets/icons";

const headerProducts = [
  { name: "Nombre", id: 1, space: "30%", sm: `width: 30%; font-size: 14px` },
  { name: "Marca", id: 2, space: "16%", sm: `display: none` },
  { name: "Stock", id: 3, space: "12%", sm: `display: none` },
  {
    name: "Precio compra",
    id: 4,
    space: "12%",
    sm: `width: 25%; font-size: 14px`,
  },
  {
    name: "Precio venta",
    id: 5,
    space: "12%",
    sm: `width: 25%; font-size: 14px`,
  },
  { name: "Acciones", id: 6, space: "18%", sm: `width: 25%; font-size: 14px` },
];

const Products = () => {
  const [productToDelete, setProductToDelete] = useState(null);

  const { primaryColor, error, btnPrimary, warning } = useSelector(
    (state) => state.theme
  );

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
          <Text md={`display: none`}>Añadir </Text>
        </CustomButton>
      </Flex>
      <ModalWrapper />
      <HandleStatus status={status} data={productsFiltered}>
        <Flex
          pd="10px"
          align="center"
          h="60px"
          shadow="0px 4px 8px #161948"
          bg={primaryColor}
          style={{ borderRadius: "5px" }}
          sm={`overflow-x: scroll`}
        >
          {headerProducts.map((header, index) => (
            <Text
              key={header.name + index}
              w={header.space}
              weight="bold"
              color="white"
              sm={header.sm}
            >
              {header.name}
            </Text>
          ))}
        </Flex>
        <Flex
          direction="column"
          h="calc(100% - 120px)"
          pd="0px"
          style={{ overflowY: "auto", overflowX: "auto" }}
          className="scroll"
        >
          {productsFiltered?.map((product) => (
            <ItemProduct product={product} key={product._id}>
              <CustomButton
                pd="0px"
                color={warning}
                onClick={() => handleEditProduct(product)}
              >
                <EditIcon />
              </CustomButton>
              <CustomButton
                ml="20px"
                pd="0px"
                color={error}
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
