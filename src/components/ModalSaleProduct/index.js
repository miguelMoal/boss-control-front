//Redux
import { useSelector } from "react-redux";
//components
import { Text, Flex, CustomButton, CustomInput, Spinner } from "@/components";
import { useToastContext } from "@/components/Toast";
//Hooks
import { useForm } from "@/hooks";
//connections
import { sendTicketApi } from "@/connections";
//externals
import { useMutation, useQueryClient } from "react-query";

const ModalSaleProduct = ({ closeModal, total, ticket, cleanTicket }) => {
  const { handleChange, formData } = useForm();
  const { mutate: saleTicket, isLoading } = useMutation(sendTicketApi);

  const { btnSuccess, btnDanger, gray } = useSelector((state) => state.theme);
  const queryClient = useQueryClient();
  const addToast = useToastContext();

  const getTotalSale = () => {
    let result = 0;
    if (formData?.cash) {
      result = Number(formData.cash || 0) - total;
    }
    return result;
  };

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
    <Flex pd="20px" mt="20px" align="center" direction="column">
      <Flex align="center" gap="10px" direction="column">
        <Text size="20px" weight="bold">
          Total Neto: ${total}
        </Text>
        <CustomInput
          placeholder="Efectivo"
          border={`1px solid ${gray}`}
          w="47%"
          name="cash"
          onChange={handleChange}
          type="number"
        />
        <Text size="20px" weight="bold">
          Cambio: ${getTotalSale()}
        </Text>
      </Flex>

      <Flex mt="20px" justify="center" gap="10px">
        <CustomButton color="white" bg={btnDanger} onClick={() => closeModal()}>
          Cancelar
        </CustomButton>
        <CustomButton
          color="white"
          bg={btnSuccess}
          onClick={() => sendTicket()}
        >
          {isLoading && <Spinner color="white" size="25" mr="15px" />} Vender
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default ModalSaleProduct;
