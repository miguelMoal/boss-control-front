//components
import {
  Layout,
  ItemProduct,
  Flex,
  Text,
  CustomButton,
  ModalAddProduct,
} from "@/components";

//externals
import { useQuery } from "react-query";

//conections
import { getProductsApi } from "@/connections";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useModal } from "@/hooks";

const headerProducts = [
  { name: "Nombre", id: 1, space: "15%" },
  { name: "Marca", id: 2, space: "15%" },
  { name: "Stock", id: 3, space: "15%" },
  { name: "Precio", id: 4, space: "20%" },
  { name: "Acciones", id: 5, space: "35%" },
];

const Products = () => {
  const { primaryColor } = useSelector((state) => state.theme);

  const { data: products, status } = useQuery(["products"], getProductsApi);

  const { showModal, closeModal, ModalWrapper } = useModal();

  const addNewProduct = () => {
    showModal(<ModalAddProduct closeModal={closeModal} />);
  };

  return (
    <Layout>
      <ModalWrapper />
      <Flex align="center" justify="space-between" mb="15px">
        <Text>Buscador</Text>
        <CustomButton
          bg={primaryColor}
          color="white"
          onClick={() => addNewProduct()}
        >
          Añadir nuevo producto
        </CustomButton>
      </Flex>
      <Flex
        shadow="0px 4px 8px #d9d9d9"
        direction="column"
        bg="white"
        h="100%"
        pd="0px"
      >
        <Flex pd="10px" align="center" h="60px" shadow="0px 4px 8px #d9d9d9">
          {headerProducts.map((header) => (
            <Text w={header.space} weight="bold">
              {header.name}
            </Text>
          ))}
        </Flex>
        {products?.map((product) => (
          <ItemProduct product={product} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Products;
