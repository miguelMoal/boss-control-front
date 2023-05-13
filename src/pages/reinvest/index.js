import { useState } from "react";
//HOC
import { ProtectedRoute } from "@/HOC";

import {
  Layout,
  Flex,
  Text,
  Search,
  HandleStatus,
  ItemReinvest,
  CustomButton,
  CustomInput,
} from "@/components";

//externals
import { useQuery, useQueryClient } from "react-query";

//conections
import { getProductsApi } from "@/connections";
//Redux
import { useSelector } from "react-redux";
//Hooks
import { useModal, useForm } from "@/hooks";
//icons
import { CheckIcon } from "@/assets/icons";

const headerProducts = [
  { name: "Nombre", id: 1, space: "27%" },
  { name: "Marca", id: 2, space: "13%" },
  { name: "Stock", id: 3, space: "10%" },
  { name: "Stock Ideal", id: 4, space: "10%" },
  { name: "Precio Compra", id: 5, space: "15%" },
  { name: "Faltantes", id: 6, space: "10%" },
  { name: "Total Reinvercion", id: 7, space: "15%" },
];

const Reinvest = () => {
  const { primaryColor, warning, error } = useSelector((state) => state.theme);

  const [allYellow, setAllYellow] = useState(false);
  const [allRed, setAllRed] = useState(false);

  const queryClient = useQueryClient();

  const { data: products, status } = useQuery(["products"], getProductsApi);

  const { handleChange, formData } = useForm();

  const toggleCheck = (product) => {
    const newProducts = products.map((p) => {
      if (p._id == product._id) {
        return { ...p, checked: !p?.checked };
      } else {
        return p;
      }
    });
    queryClient.setQueryData("products", newProducts);
  };

  const productsFiltered = products?.filter(
    (p) => Number(p.available) <= Number(p.preferenceInStock) / 2
  );

  const productsSearch = productsFiltered?.filter((p) =>
    p.name.toLowerCase()?.includes(formData?.search?.toLowerCase() || "")
  );

  const getMissingProduct = (p) => {
    return Number(p.preferenceInStock - Number(p.available));
  };

  const productsReinvest = () => {
    let result = 0;
    products?.forEach((p) => {
      const missingProduct = getMissingProduct(p);
      if (p.checked == true) {
        const priceReinvest = Number(p.priceBuy) * missingProduct;
        result = result + priceReinvest;
      }
    });
    return result;
  };

  const activeAllYellow = () => {
    const newProducts = productsFiltered.map((product) => {
      const halfPreference = Number(product.preferenceInStock) / 2;
      const available = Number(product.available);
      if (available <= halfPreference && available != 0) {
        return { ...product, checked: !allYellow };
      } else {
        return product;
      }
    });
    queryClient.setQueryData("products", newProducts);
    setAllYellow(!allYellow);
  };

  const activeAllRed = () => {
    const newProducts = productsFiltered.map((product) => {
      if (Number(product.available) == 0) {
        return { ...product, checked: !allRed };
      } else {
        return product;
      }
    });
    queryClient.setQueryData("products", newProducts);
    setAllRed(!allRed);
  };

  const investmentBudget = () => {
    const progressBudget =
      Number(productsReinvest()) / Number(formData?.budget || 0);
    const result = progressBudget * 100;
    return result;
  };

  return (
    <Layout>
      <HandleStatus status={status} data={productsFiltered}>
        <Flex align="center" mb="15px" h="40px" justify="space-between">
          <Search handleChange={handleChange} />
          <Flex w="fit-content" gap="10px">
            <CustomButton
              borderColor={warning}
              color="gray"
              bg={allYellow && warning}
              onClick={() => activeAllYellow()}
            >
              <CheckIcon />
            </CustomButton>
            <CustomButton
              borderColor={error}
              color="gray"
              bg={allRed && error}
              onClick={() => activeAllRed()}
            >
              <CheckIcon />
            </CustomButton>
            <Flex gap="10px" align="center">
              <CustomInput
                placeholder="$Presupuesto"
                border="1px solid #ebebeb"
                w="105px"
                name="budget"
                onChange={handleChange}
                type="number"
                min={0}
              />
              {formData?.budget > 0 && (
                <Flex direction="column" bg="#ebebeb" h="10px" w="200px">
                  <Flex
                    bg={investmentBudget() > 100 ? error : primaryColor}
                    w={`${
                      investmentBudget() > 100 ? 100 : investmentBudget()
                    }%`}
                    h="10px"
                  >
                    {investmentBudget() > 100 && (
                      <Text color={error} mt="15px" size="12px">
                        Excediste el presupuesto {`${investmentBudget()}%`}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex
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
              style={{
                paddingLeft: header.id == 1 && "35px",
              }}
            >
              {header.name}
            </Text>
          ))}
        </Flex>
        <Flex
          direction="column"
          h="calc(100vh - 280px)"
          style={{ overflowY: "auto" }}
          className="scroll"
        >
          {productsSearch?.map((product) => (
            <ItemReinvest
              getMissingProduct={getMissingProduct}
              product={product}
              toggleCheck={toggleCheck}
            />
          ))}
        </Flex>
        <Flex align="end" direction="column">
          <Text
            weight="bold"
            size="30px"
            color={
              investmentBudget() > 100 && formData?.budget > 0
                ? error
                : primaryColor
            }
          >
            Total ${productsReinvest()}
          </Text>
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(Reinvest);
