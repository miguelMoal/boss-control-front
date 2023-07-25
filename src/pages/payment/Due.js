//Components
import { EditIcon } from "@/assets/icons";
import { CustomButton, Flex, Text } from "@/components";

//Redux
import { useSelector } from "react-redux";

const Due = ({ infoPayment }) => {
  const { secondaryColor } = useSelector(({ theme }) => theme);
  return (
    <Flex w="400px" direction="column" pd="20px" style={{ paddingTop: 0 }}>
      <Flex justify="center">
        <Text size="20px" weight="bold" color="#1C1C1C">
          Subscrito a BOSS-CONTROL
        </Text>
      </Flex>
      <Flex direction="column" gap="10px" mt="20px">
        <Flex
          style={{
            border: "1px solid #d1d1d1",
            padding: 10,
            borderRadius: 5,
          }}
          direction="column"
        >
          <Flex justify="space-between">
            <Text color="#1C1C1C">
              {infoPayment?.paymentMethod?.billing_details.name || "Sin Nombre"}
            </Text>
            <Text color="#1C1C1C">
              {infoPayment?.paymentMethod?.card?.brand}
            </Text>
          </Flex>
          <Flex align="center">
            <Text color="#1C1C1C" mr="10px" mt="6px">
              ****
            </Text>
            <Text color="#1C1C1C" mr="10px" mt="6px">
              ****
            </Text>
            <Text color="#1C1C1C" mr="10px" mt="6px">
              ****
            </Text>
            <Text color="#1C1C1C" mr="10px">
              {infoPayment?.paymentMethod?.card?.last4}
            </Text>
          </Flex>
        </Flex>
        <Flex mb="10px">
          <CustomButton pd="0px" mt="-10px">
            <Flex color={secondaryColor}>
              <EditIcon />
              <Text ml="10px" color={secondaryColor} mr="10px" mt="6px">
                Editar metódo de pago
              </Text>
            </Flex>
          </CustomButton>
        </Flex>
        <Flex
          style={{
            border: "1px solid #d1d1d1",
            padding: 10,
            borderRadius: 5,
          }}
          direction="column"
          justify="center"
        >
          <Flex justify="space-between" mb="25px">
            <Text color="#1C1C1C">Próxima fecha de facturación</Text>
            <Text color="#1C1C1C">{infoPayment?.periodEnd?.split("T")[0]}</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text color="#1c1c1c" size="40px">
              $ {infoPayment?.due}
            </Text>
            <Text color="#1C1C1C" mt="10px">
              {infoPayment?.due > 0 ? "Adeudo" : "No tienes adeudos"}
            </Text>
          </Flex>
        </Flex>
        {infoPayment?.due > 0 && (
          <Flex justify="center">
            <CustomButton bg={secondaryColor}>
              <Text color="white">Pagar adeudo</Text>
            </CustomButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default Due;
