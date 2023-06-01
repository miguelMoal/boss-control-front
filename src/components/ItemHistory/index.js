//components
import { Flex, Text } from "@/components";

//Helpers
import { transformDate } from "@/helpers";

//Redux
import { useSelector } from "react-redux";

const ItemHistory = ({ history }) => {
  const { primaryColor, btnPrimary } = useSelector((state) => state.theme);

  return (
    <Flex
      key={history._id}
      pd="20px"
      style={{
        position: "relative",
        border: `1px solid ${primaryColor}`,
        borderRadius: "5px",
      }}
      direction="column"
      gap="20px"
      mt="30px"
    >
      <Flex
        w="fit-content"
        style={{
          position: "absolute",
          top: "-20px",
          backgroundSize: "210% 210%",
          backgroundPosition: "100% 0",
        }}
        bg={btnPrimary}
        pd="0px 30px"
        h="40px"
        align="center"
      >
        <Text color="white" weight="bold">
          {transformDate(history.date)}
        </Text>
      </Flex>
      <Flex direction="column">
        {history.products?.map((prod) => (
          <Flex justify="space-between" mt="15px">
            <Text weight="bold" w="33.3%">
              {prod?.productId?.name}
            </Text>
            <Text weight="bold" w="33.3%" style={{ textAlign: "center" }}>
              Cantidad: {prod.quantity}
            </Text>
            <Text weight="bold" w="33.3%" style={{ textAlign: "end" }}>
              $ {prod.amount.toFixed(2)}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ItemHistory;
