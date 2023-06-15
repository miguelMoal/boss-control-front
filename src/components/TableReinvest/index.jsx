import { Flex, CustomTable, Text } from "@/components";

//Redux
import { useSelector } from "react-redux";

//icons
import { CheckIcon } from "@/assets/icons";

const headerProducts = [
  { name: "Nombre", id: 1, minWidth: "200px" },
  { name: "Marca", id: 2, minWidth: "100px" },
  { name: "Stock", id: 3, minWidth: "100px" },
  { name: "Stock Ideal", id: 4, minWidth: "150px" },
  { name: "Precio Compra", id: 5, minWidth: "150px" },
  { name: "Faltantes", id: 6, minWidth: "120px" },
  { name: "Total Reinvercion", id: 7, minWidth: "180px" },
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
    <Flex sm={`height: calc(100vh - 270px)`} style={{ overflow: "auto" }}>
      <CustomTable>
        <CustomTable.Thead>
          <CustomTable.TR>
            {headerProducts?.map((header, index) => (
              <CustomTable.TH
                key={header.name + index}
                minWidth={header.minWidth}
              >
                {header.name}
              </CustomTable.TH>
            ))}
          </CustomTable.TR>
        </CustomTable.Thead>
        <CustomTable.Tbody>
          {productsSearch?.map((product, index) => (
            <CustomTable.TR bg={index % 2 && tertiaryColor}>
              <CustomTable.TD pin={index == 5 && "red"}>
                <Flex align="center">
                  <Flex w="10px" h="100%" bg={handleColorBar()}></Flex>
                  <Flex align="center">
                    <Flex
                      h="15px"
                      w="15px"
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
