//Components
import {
  Flex,
  ItemTicket,
  Header,
  Text,
  CustomButton,
  Spinner,
} from "@/components";
import { useToastContext } from "@/components/Toast";

//Redux
import { useSelector } from "react-redux";

//connections
import { sendTicketApi } from "@/connections";

//externals
import { useMutation, useQueryClient } from "react-query";

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

  const { mutate: saleTicket, isLoading } = useMutation(sendTicketApi);

  const handleResetTicket = () => {
    cleanTicket();
    closeModal();
  };

  const addToast = useToastContext();
  const queryClient = useQueryClient();

  const sendTicket = () => {
    const newTicket = ticket.map((product) => {
      return { productId: product._id, quantity: Number(product.toSale) };
    });
    const body = { products: newTicket };
    saleTicket(body, {
      onSuccess: () => {
        addToast("La venta se realizó correctamente", true);
        queryClient.invalidateQueries("products");
        queryClient.setQueryData("products", (oldData) => {
          const newData = oldData.map((p) => {
            const pInTicket = ticket.find((_p) => _p._id == p._id);
            if (pInTicket) {
              return {
                ...p,
                available: Number(p.available) - Number(pInTicket.toSale),
              };
            } else {
              return p;
            }
          });
          return newData;
        });
        cleanTicket();
        !isLoading && closeModal();
      },
      onError: () => {
        addToast("Ocurrió un error al tratar de vender", false);
      },
    });
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
        <CustomButton
          bg={btnSuccess}
          style={{ width: "100%" }}
          onClick={() => sendTicket()}
        >
          <Flex justify="center">
            {isLoading && <Spinner color="white" size="25" mr="15px" />}
            <Text>Confirmar venta</Text>
          </Flex>
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default ModalTicket;
