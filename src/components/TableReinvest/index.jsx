import { Flex, CustomTable, Text } from "@/components";

//Redux
import { useSelector } from "react-redux";

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

const TableReinvest = ({ productsSearch, getMissingProduct, toggleCheck }) => {
  const { tertiaryColor, error, warning, btnPrimary } = useSelector(
    (state) => state.theme
  );

  const resultReinvest = (product) => {
    const result = getMissingProduct(product) * product.priceBuy;
    return result.toFixed(2);
  };

  const productAvailable = Number(productsSearch.available);

  const handleColorBar = () => {
    const halfPreference = Number(productsSearch.preferenceInStock) / 2;
    if (productAvailable > halfPreference) {
      return success;
    } else if (productAvailable > 0) {
      return warning;
    } else {
      return error;
    }
  };

  return (
    <Flex>
      <CustomTable>
        <CustomTable.Thead>
          <CustomTable.TR>
            {headerProducts?.map((header, index) => (
              <CustomTable.TH key={header.name + index}>
                {header.name}
              </CustomTable.TH>
            ))}
          </CustomTable.TR>
        </CustomTable.Thead>
        <CustomTable.Tbody>
          {productsSearch?.map((product, index) => (
            <CustomTable.TR bg={index % 2 && tertiaryColor}>
              <CustomTable.TD>
                <Flex h="55px" align="center">
                  <Flex w="10px" h="100%" bg={handleColorBar()}></Flex>
                  <Flex gap="10px" align="center">
                    <Flex
                      h="15px"
                      w="15px"
                      ml="10px"
                      bg={product.checked ? btnPrimary : "gray"}
                      style={{
                        borderRadius: "2px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      align="center"
                      justify="center"
                      onClick={() => toggleCheck(product)}
                    >
                      <CheckIcon />
                    </Flex>
                    <Text>{product.name}</Text>
                  </Flex>
                </Flex>
              </CustomTable.TD>
              <CustomTable.TD>{product.brand}</CustomTable.TD>
              <CustomTable.TD>{product.available}</CustomTable.TD>
              <CustomTable.TD>{product.preferenceInStock}</CustomTable.TD>
              <CustomTable.TD>$ {product.priceBuy}</CustomTable.TD>
              <CustomTable.TD>{getMissingProduct(product)}</CustomTable.TD>
              <CustomTable.TD>$ {resultReinvest(product)}</CustomTable.TD>
            </CustomTable.TR>
          ))}
        </CustomTable.Tbody>
      </CustomTable>
    </Flex>
  );
};
export default TableReinvest;
