//components
import { Flex, Text, CustomButton } from "@/components";
//Redux
import { useSelector } from "react-redux";

const ModalErrorSale = ({ closeModal }) => {
  const { error } = useSelector((state) => state.theme);

  return (
    <Flex align="center" gap="10px" direction="column" pd="20px">
      <Text>se requiere que todos los productos tengan cantidad</Text>
      <CustomButton
        color={error}
        borderColor={error}
        onClick={() => closeModal()}
      >
        Cerrar
      </CustomButton>
    </Flex>
  );
};

export default ModalErrorSale;
