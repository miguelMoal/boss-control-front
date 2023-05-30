//components
import { Flex, Text, ModalConditions } from "@/components";

//Icons
import { CheckIcon } from "@/assets/icons";

//Hooks
import { useModal } from "@/hooks";

//reactRedux
import { useSelector } from "react-redux";

const InfoConditions = ({ checked, toggleCheck }) => {
  const { secondaryColor, primaryColor } = useSelector((state) => state.theme);

  const { showModal, closeModal, ModalWrapper } = useModal();

  const goConditions = () => {
    showModal(<ModalConditions closeModal={closeModal} />);
  };

  return (
    <Flex>
      <ModalWrapper />
      <Flex
        h="15px"
        w="15px"
        mr="10px"
        bg={checked ? secondaryColor : "gray"}
        style={{ borderRadius: "2px", color: "white" }}
        align="center"
        justify="center"
        onClick={() => toggleCheck(!checked)}
      >
        <CheckIcon />
      </Flex>
      <Text size="12px">
        Acepto los{" "}
        <span
          style={{
            color: `${secondaryColor}`,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => goConditions()}
        >
          términos y condiciones
        </span>{" "}
        de la politica de protección de datos.
      </Text>
    </Flex>
  );
};

export default InfoConditions;
