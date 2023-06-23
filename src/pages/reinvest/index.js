import { useState } from "react";
//HOC
import { ProtectedRoute } from "@/HOC";

import {
  Layout,
  Flex,
  Text,
  Search,
  HandleStatus,
  CustomButton,
  CustomInput,
  TableReinvest,
} from "@/components";

//externals
import { useQuery, useQueryClient } from "react-query";

//conections
import { getProductsApi } from "@/connections";
//Redux
import { useSelector } from "react-redux";
//Hooks
import { useForm } from "@/hooks";
//icons
import { CheckIcon } from "@/assets/icons";

const Reinvest = () => {
  const { warning, error, btnWarning, btnDanger, btnSuccess } = useSelector(
    (state) => state.theme
  );

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
    return result.toFixed(2);
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
        <Flex
          align="center"
          mb="25px"
          h="40px"
          justify="space-between"
          direction="row"
          sm={`height: 90px; flex-direction: column`}
          md={`height: 90px; flex-direction: column`}
        >
          <Search
            handleChange={handleChange}
            sm={`width: 100%`}
            md={`width: 100%`}
          />
          <Flex gap="10px" w="350px" sm={`width: 100%`} md={`width: 100%`}>
            <CustomButton
              borderColor={warning}
              color="white"
              bg={allYellow && btnWarning}
              onClick={() => activeAllYellow()}
            >
              <CheckIcon />
            </CustomButton>
            <CustomButton
              borderColor={error}
              color="white"
              bg={allRed && btnDanger}
              onClick={() => activeAllRed()}
            >
              <CheckIcon />
            </CustomButton>
            <Flex
              gap="10px"
              align="center"
              direction="column"
              style={{ position: "relative" }}
            >
              <CustomInput
                placeholder="$Presupuesto"
                border="1px solid #ebebeb"
                name="budget"
                onChange={handleChange}
                type="number"
                min={0}
                w="180px"
                sm={`width: 100%`}
                md={`width: 100%`}
              />
              {formData?.budget > 0 && (
                <Flex
                  direction="column"
                  bg="#ebebeb"
                  h="10px"
                  w="180px"
                  sm={`width: 100%`}
                  md={`width: 100%`}
                  style={{ position: "absolute", bottom: "-15px" }}
                >
                  <Flex
                    bg={investmentBudget() > 100 ? error : btnSuccess}
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
        <TableReinvest
          getMissingProduct={getMissingProduct}
          productsSearch={productsSearch || []}
          toggleCheck={toggleCheck}
        />
        <Flex align="end" direction="column" justify="center" h="70px">
          <Text
            weight="bold"
            size="30px"
            color={
              investmentBudget() > 100 && formData?.budget > 0 ? error : "white"
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
