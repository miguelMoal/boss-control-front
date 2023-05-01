//components
import { Flex, Text, Header, CustomButton } from "@/components";
//Redux
import { useSelector } from "react-redux";

const ModalRemove = ({ closeModal, action, id }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  return (
    <Flex direction="column">
      <Header>
        <Text color="white">Eliminar</Text>
      </Header>
      <Flex pd="10px" direction="column" gap="20px" align="center">
        <Text>Confirme si desea eliminar este producto</Text>
        <Flex gap="10px" justify="center">
          <CustomButton bg={error} color="white" onClick={() => closeModal()}>
            Cancelar
          </CustomButton>
          <CustomButton
            bg={primaryColor}
            color="white"
            onClick={() => action(id)}
          >
            Eliminar
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ModalRemove;
