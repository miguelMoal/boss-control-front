import { useState } from "react";

//Components
import {
  Flex,
  Text,
  Header,
  CustomButton,
  ModalConfirmAction,
} from "@/components";
import { useToastContext } from "@/components/Toast";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useMutation } from "react-query";
import { useModal } from "@/hooks";

//Connections
import { cancelSubscriptionApi } from "@/connections";

const ModalDetailsSub = ({ infoUser, closeModal }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  const {
    showModal,
    closeModal: closeModalCancelSub,
    ModalWrapper,
  } = useModal();

  const [showInfo, setShowInfo] = useState(false);

  const addToast = useToastContext();

  const { mutate: cancelSubscription, isLoading: isLoadingCancelSub } =
    useMutation(cancelSubscriptionApi);
  const handleCancelSubscription = () => {
    showModal(
      <ModalConfirmAction
        action={() =>
          cancelSubscription("", {
            onSuccess: () => {
              addToast("La subscripción se canceló correctamente", true);
              closeModalCancelSub();
            },
            onError: () => {
              addToast("Algo falló al cancelar la subscripción", false);
            },
          })
        }
        closeModalCancelSub={closeModalCancelSub}
        isLoadingCancelSub={isLoadingCancelSub}
        text="La subscripción se suspendera de manera automática al terminar el
    período actual."
      />
    );
  };

  return (
    <Flex direction="column">
      <ModalWrapper />
      <Header>
        <Text color="white" size="18px">
          Opciones
        </Text>
      </Header>
      <Flex pd="20px" direction="column" w="400px">
        <Text>Nombre de subscriptor: {infoUser?.name}</Text>
        <Flex
          mt="15px"
          style={{ borderTop: "1px solid gray" }}
          direction="column"
        >
          <Text mt="15px" mb="10px" weight="bold">
            Descripción del producto
          </Text>
          <Text>
            El Servicio proporciona a los usuarios una plataforma en línea para
            administrar su inventario de productos. El Servicio está disponible
            a través de una suscripción mensual que se renueva automáticamente.
          </Text>
        </Flex>
        <Text mt="15px">Contactanos: boss-control@gmail.com</Text>
        <Flex mt="15px">
          <Flex direction="column">
            <Flex
              style={{ cursor: "pointer" }}
              gap="10px"
              align="center"
              mb="10px"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Text>Detalles de subscripción</Text>
              <Text style={{ transform: "rotate(90deg)" }}>{`>`}</Text>
            </Flex>
            {showInfo && (
              <>
                <Flex>
                  <Text>Precio de subscripción: $ 285 pesos MXN</Text>
                </Flex>
                <Flex>
                  <Text>Renovación: Automática</Text>
                </Flex>
                <Flex
                  style={{ cursor: "pointer" }}
                  mt="10px"
                  onClick={() => handleCancelSubscription()}
                >
                  <Text color={error}>Cancelar subscripción</Text>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="20px" justify="center" pd="20px">
        <CustomButton bg={primaryColor} onClick={() => closeModal()}>
          <Text color="white">Aceptar</Text>
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default ModalDetailsSub;
