import { Flex, CustomTable, Text, CustomButton, Spinner } from "@/components";

//Redux
import { useSelector } from "react-redux";

const headerProducts = [
  { name: "Nombre", id: 1, minWidth: "220px" },
  { name: "Marca", id: 2, minWidth: "130px" },
  { name: "Stock", id: 3, minWidth: "80px" },
  { name: "Precio Venta", id: 5, minWidth: "150px" },
  { name: "Acciones", id: 6, minWidth: "150px" },
];

const TableProductSale = ({ productsFiltered, handleAddToTicket }) => {
  const { tertiaryColor, error, warning, background, success } = useSelector(
    (state) => state.theme
  );

  const handleColorBar = (product) => {
    const productAvailable = Number(product.available);
    const halfPreference = Number(product.preferenceInStock) / 2;
    if (productAvailable > halfPreference) {
      return success;
    } else if (productAvailable > 0) {
      return warning;
    } else {
      return error;
    }
  };

  const soludOut = (product) => {
    const productAvailable = Number(product.available);
    if (productAvailable == 0) {
      return (
        <CustomButton color={error} pd={"0px 14px"} borderColor={error}>
          <Text>Agotado</Text>
        </CustomButton>
      );
    } else {
      return (
        <CustomButton
          onClick={() => handleAddToTicket(product)}
          borderColor={success}
        >
          <Text>Añadir</Text>
        </CustomButton>
      );
    }
  };

  return (
    <Flex
      h="calc(100vh - 190px)"
      xxl={`height: calc(100vh - 160px)`}
      bigger={`height: calc(100vh - 160px)`}
      style={{ overflow: "auto" }}
      className="scroll"
    >
      <CustomTable>
        <CustomTable.Thead>
          <CustomTable.TR>
            {headerProducts?.map((header, index) => (
              <CustomTable.TH
                key={header.name + index}
                minWidth={header.minWidth}
                fixed={header.id == 6}
              >
                {header.name}
              </CustomTable.TH>
            ))}
          </CustomTable.TR>
        </CustomTable.Thead>
        <CustomTable.Tbody>
          {productsFiltered?.map((product, index) => (
            <CustomTable.TR bg={index % 2 && tertiaryColor}>
              <CustomTable.TD pin={index == 5 && "red"}>
                <Flex align="center">
                  <Flex
                    w="10px"
                    h="55px"
                    mr="10px"
                    bg={handleColorBar(product)}
                  ></Flex>
                  <Text>{product.name}</Text>
                </Flex>
              </CustomTable.TD>
              <CustomTable.TD>{product.brand}</CustomTable.TD>
              <CustomTable.TD>{product.available}</CustomTable.TD>
              <CustomTable.TD>$ {product.priceSale}</CustomTable.TD>
              <CustomTable.TD
                fixed={true}
                bg={index % 2 ? tertiaryColor : background}
              >
                <Flex>{soludOut(product)}</Flex>
              </CustomTable.TD>
            </CustomTable.TR>
          ))}
        </CustomTable.Tbody>
      </CustomTable>
    </Flex>
  );
};
export default TableProductSale;
