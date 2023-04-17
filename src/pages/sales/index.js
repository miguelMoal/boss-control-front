//react
import { useState } from "react";
//Redux
import { useSelector } from "react-redux";
//components
import {
  Layout,
  Flex,
  Text,
  HandleStatus,
  Search,
  ItemProduct,
  CustomButton,
} from "@/components";
//conections
import { getProductsApi } from "@/connections";
//Hooks
import { useModal, useForm } from "@/hooks";
//externals
import { useQuery } from "react-query";

const headerProducts = [
  { name: "Nombre", id: 1, space: "30%" },
  { name: "Marca", id: 2, space: "15%" },
  { name: "Stock", id: 3, space: "15%" },
  { name: "Precio", id: 4, space: "15%" },
  { name: "Acciones", id: 5, space: "25%" },
];

const Sales = () => {
  const [ticket, setTicket] = useState([]);
  const { primaryColor, success } = useSelector((state) => state.theme);
  const { data: products, status } = useQuery(["products"], getProductsApi);
  const { handleChange, formData } = useForm();

  const productsFiltered = products?.filter((p) =>
    p.name.includes(formData?.search || "")
  );

  const handleAddToTicket = (product) => {
    setTicket([...ticket, product]);
  };

  return (
    <Layout>
      <HandleStatus status={status}>
        <Flex align="center" justify="space-between" mb="15px" h="40px">
          <Search handleChange={handleChange} />
        </Flex>
        <Flex gap="20px">
          <Flex direction="column" w="60%">
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
              pd="0px"
              h="calc(100vh - 220px)"
              style={{ overflowY: "auto" }}
            >
              {productsFiltered?.map((product) => (
                <ItemProduct product={product}>
                  <CustomButton
                    onClick={() => handleAddToTicket(product)}
                    borderColor={success}
                  >
                    Añadir
                  </CustomButton>
                </ItemProduct>
              ))}
            </Flex>
          </Flex>
          <Flex w="40%" direction="column">
            <Flex
              pd="10px"
              align="center"
              h="60px"
              shadow="0px 4px 8px #d9d9d9"
              bg={primaryColor}
              style={{ borderRadius: "5px" }}
            >
              <Text color="white" weight="bold">
                Ticket
              </Text>
            </Flex>
            <Flex>
              {ticket.map((p) => (
                <p>{p.name}</p>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default Sales;
