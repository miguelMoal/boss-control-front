//Redux
import { useSelector } from "react-redux";
//components
import { Text, Flex, CustomButton, CustomInput } from "@/components";
//Hooks
import { useForm } from "@/hooks";
//connections
import { sendTicketApi } from "@/connections";
//externals
import { useMutation, useQueryClient } from "react-query";

const ModalSaleProduct = ({ closeModal, total, ticket, cleanTicket }) => {
  const { handleChange, formData } = useForm();
  const { mutate: saleTicket } = useMutation(sendTicketApi);

  const { error, success } = useSelector((state) => state.theme);
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries("products");
        cleanTicket();
        closeModal();
      },
    });
  };

  return (
    <Flex pd="20px" mt="20px" align="center" direction="column">
      <Flex align="center" gap="10px" direction="column">
        <Text size="20px" weight="bold">
          Total Neto:${total}
        </Text>
        <CustomInput
          placeholder="Efectivo"
          border="1px solid gray"
          w="33%"
          name="cash"
          onChange={handleChange}
        />
        <Text size="20px" weight="bold">
          Cambio:{getTotalSale()}
        </Text>
      </Flex>

      <Flex mt="20px" justify="center" gap="10px">
        <CustomButton color="white" bg={error} onClick={() => closeModal()}>
          Cancelar
        </CustomButton>
        <CustomButton bg={success} onClick={() => sendTicket()}>
          Vender
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default ModalSaleProduct;
