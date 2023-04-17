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
} from "@/components";

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
  { name: "Marca", id: 2, space: "15%" },
  { name: "Stock", id: 3, space: "15%" },
  { name: "Precio", id: 4, space: "15%" },
  { name: "Acciones", id: 5, space: "25%" },
];

const Products = () => {
  const { primaryColor, success, error, warning } = useSelector(
    (state) => state.theme
  );

  const { data: products, status } = useQuery(["products"], getProductsApi);
  const { mutate: deleteProduct } = useMutation(deleteProductApi);

  const { handleChange, formData } = useForm();

  const queryClient = useQueryClient();

  const { showModal, closeModal, ModalWrapper } = useModal();

  const addNewProduct = () => {
    showModal(<ModalAddProduct closeModal={closeModal} />);
  };

  const productsFiltered = products?.filter((p) =>
    p.name.includes(formData?.search || "")
  );

  const handleEditProduct = () => {
    showModal(<ModalEditProduct closeModal={closeModal} product={product} />);
  };

  const handleDelete = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    });
  };

  return (
    <Layout>
      <HandleStatus status={status}>
        <ModalWrapper />
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
                onClick={() => handleEditProduct()}
              >
                Editar
              </CustomButton>
              <CustomButton
                ml="10px"
                pd="0px"
                onClick={() => handleDelete(product._id)}
              >
                <RemoveIcon />
              </CustomButton>
            </ItemProduct>
          ))}
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default Products;
