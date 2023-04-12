import {
  Layout,
  Flex,
  Text,
  ItemProduct,
  Search,
  HandleStatus,
} from "@/components";

//externals
import { useQuery } from "react-query";

//conections
import { getProductsApi } from "@/connections";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useModal, useForm } from "@/hooks";

const headerProducts = [
  { name: "Nombre", id: 1, space: "15%" },
  { name: "Marca", id: 2, space: "15%" },
  { name: "Stock", id: 3, space: "15%" },
  { name: "Precio", id: 4, space: "20%" },
  { name: "Acciones", id: 5, space: "35%" },
];

const Reinvest = () => {
  const { primaryColor } = useSelector((state) => state.theme);

  const { data: products, status } = useQuery(["products"], getProductsApi);

  const { handleChange, formData } = useForm();

  const productsFiltered = products?.filter(
    (p) => Number(p.available) <= Number(p.preferenceInStock) / 2
  );

  const productsSearch = productsFiltered?.filter((p) =>
    p.name.includes(formData?.search || "")
  );

  return (
    <Layout>
      <HandleStatus status={status}>
        <Flex align="center" mb="15px" h="40px">
          <Search handleChange={handleChange} />
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
          {productsSearch?.map((product) => (
            <ItemProduct product={product} />
          ))}
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default Reinvest;
