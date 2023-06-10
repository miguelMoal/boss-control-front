//Components
import { Flex, ItemTicket, Header, Text, CustomButton } from "@/components";

//Redux
import { useSelector } from "react-redux";

const ModalTicket = ({
  ticket,
  deleteProductTicket,
  updateToSale,
  closeModal,
  cleanTicket,
}) => {
  const { btnDanger, btnSuccess, btnDefault } = useSelector(
    ({ theme }) => theme
  );

  const handleResetTicket = () => {
    cleanTicket();
    closeModal();
  };

  return (
    <Flex
      w="500px"
      sm={`width: 95vw`}
      style={{ borderRadius: 5 }}
      direction="column"
    >
      <Header>
        <Text>Ticket</Text>
      </Header>
      <Flex
        h="300px"
        direction="column"
        style={{ overflowY: "auto" }}
        pd="10px"
      >
        {ticket.map((product) => (
          <ItemTicket
            deleteProductTicket={deleteProductTicket}
            product={product}
            updateToSale={updateToSale}
          />
        ))}
      </Flex>
      <Flex direction="column" w="100%" pd="10px" gap="20px">
        <Flex gap="20px">
          <CustomButton
            bg={btnDanger}
            style={{ width: "100%" }}
            onClick={() => closeModal()}
          >
            <Flex justify="center">
              <Text>Cancelar</Text>
            </Flex>
          </CustomButton>
          <CustomButton
            bg={btnDefault}
            style={{ width: "100%" }}
            onClick={() => handleResetTicket()}
          >
            <Flex justify="center">
              <Text>Limpiar ticket</Text>
            </Flex>
          </CustomButton>
        </Flex>
        <CustomButton bg={btnSuccess} style={{ width: "100%" }}>
          <Flex justify="center">
            <Text>Confirmar venta</Text>
          </Flex>
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default ModalTicket;
