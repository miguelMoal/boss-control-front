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
  { name: "Nombre", id: 1, space: "30%" },
  { name: "Marca", id: 2, space: "15%" },
  { name: "Stock", id: 3, space: "8%" },
  { name: "Stock ideal", id: 4, space: "10%" },
  { name: "Precio compra", id: 5, space: "12%" },
  { name: "Faltantes", id: 6, space: "10%" },
  { name: "Total reinvercion", id: 7, space: "15%" },
];

const Reinvest = () => {
  const { primaryColor, warning, error } = useSelector((state) => state.theme);

  const [allWarnings, setAllWarnings] = useState(false);

  const queryClient = useQueryClient();

  const { data: products, status } = useQuery(["products"], getProductsApi);

  const { handleChange, formData } = useForm();

  const toggleCheck = (product) => {
    console.log(product);
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
    p.name.includes(formData?.search || "")
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
        setAllWarnings(!allWarnings);
        return { ...product, checked: !allWarnings };
      } else {
        return product;
      }
    });
    queryClient.setQueryData("products", newProducts);
  };

  const activeAllRed = () => {
    const newProducts = productsFiltered.map((product) => {
      if (Number(product.available) == 0) {
        setAllWarnings(!allWarnings);
        return { ...product, checked: !allWarnings };
      } else {
        return product;
      }
    });
    queryClient.setQueryData("products", newProducts);
  };

  const investmentBudget = () => {
    const progressBudget =
      Number(productsReinvest()) / Number(formData?.budget || 0);
    const result = progressBudget * 100;
    return result;
  };

  return (
    <Layout>
      <HandleStatus status={status}>
        <Flex align="center" mb="15px" h="40px" justify="space-between">
          <Search handleChange={handleChange} />
          <Flex w="fit-content" gap="10px">
            <CustomButton
              borderColor={warning}
              color="gray"
              onClick={() => activeAllYellow()}
            >
              <CheckIcon />
            </CustomButton>
            <CustomButton
              borderColor={error}
              color="gray"
              onClick={() => activeAllRed()}
            >
              <CheckIcon />
            </CustomButton>
            <Flex gap="10px" align="center">
              <CustomInput
                placeholder="Presupuesto"
                border="1px solid #ebebeb"
                w="100px"
                name="budget"
                onChange={handleChange}
              />
              <Flex bg="#ebebeb" w="200px" h="10px">
                <Flex
                  bg={primaryColor}
                  w={`${investmentBudget()}%`}
                  h="10px"
                ></Flex>
              </Flex>
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
          h="calc(100vh - 300px)"
          style={{ overflowY: "auto" }}
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
          <Text weight="bold" size="30px" color={primaryColor}>
            Total ${productsReinvest()}
          </Text>
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default Reinvest;
