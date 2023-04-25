import {
  Layout,
  Flex,
  Text,
  Search,
  HandleStatus,
  ItemReinvest,
  CustomButton,
} from "@/components";

//externals
import { useQuery, useQueryClient } from "react-query";

//conections
import { getProductsApi } from "@/connections";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useModal, useForm } from "@/hooks";

const headerProducts = [
  { name: "Nombre", id: 1, space: "40%" },
  { name: "Marca", id: 2, space: "20%" },
  { name: "Stock", id: 3, space: "20%" },
  { name: "Precio", id: 4, space: "20%" },
];

const Reinvest = () => {
  const { primaryColor } = useSelector((state) => state.theme);

  const queryClient = useQueryClient();

  const { data: products, status } = useQuery(["products"], getProductsApi);

  const toggleCheck = (product) => {
    const newProducts = products.map((p) => {
      if (p._id === product._id) {
        return { ...p, checked: !p?.checked };
      } else {
        return p;
      }
    });
    queryClient.setQueryData("products", newProducts);
  };

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
            <Text
              w={header.space}
              weight="bold"
              color="white"
              style={{ paddingLeft: header.id == 1 && "35px" }}
            >
              {header.name}
            </Text>
          ))}
        </Flex>
        <Flex
          direction="column"
          bg="white"
          h="calc(100% - 120px)"
          style={{ overflowY: "auto" }}
        >
          {productsSearch?.map((product) => (
            <ItemReinvest product={product} toggleCheck={toggleCheck} />
          ))}
        </Flex>
        <Flex>
          <CustomButton></CustomButton>
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default Reinvest;
