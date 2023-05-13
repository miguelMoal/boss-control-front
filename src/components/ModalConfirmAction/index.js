//Components
import { Flex, Text, CustomButton, Spinner } from "@/components";

//Redux
import { useSelector } from "react-redux";

const ModalConfirmAction = ({
  text,
  closeModalCancelSub,
  action,
  isLoadingCancelSub,
}) => {
  const { primaryColor, error } = useSelector((state) => state.theme);
  return (
    <Flex direction="column" pd="20px" w="450px">
      <Text style={{ textAlign: "center" }}>{text}</Text>
      <Flex mt="15px" justify="center" gap="20px">
        <CustomButton borderColor={error} onClick={() => action()}>
          {isLoadingCancelSub && (
            <Spinner size="25px" color={error} mr="10px" />
          )}
          <Text color={error}>Cancelar subscripción</Text>
        </CustomButton>
        {!isLoadingCancelSub && (
          <CustomButton bg={primaryColor} onClick={() => closeModalCancelSub()}>
            <Text color="white">Salir</Text>
          </CustomButton>
        )}
      </Flex>
    </Flex>
  );
};
export default ModalConfirmAction;
