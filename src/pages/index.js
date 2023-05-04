//components
import {
  CustomButton,
  CustomInput,
  Flex,
  Text,
  ModalRegister,
} from "@/components";
import { useSelector } from "react-redux";
//Hooks
import { useModal, useForm } from "@/hooks";
import { useRouter } from "next/router";

export default function Home() {
  const { primaryColor, warning } = useSelector((state) => state.theme);

  const router = useRouter();

  const goRegister = () => {
    // showModal(<ModalRegister />);
    router.replace("/register");
  };

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center" bg={primaryColor}>
      <Flex
        pd="10px"
        gap="70px"
        bg="white"
        h="350px"
        w="400px"
        direction="column"
        justify="center"
      >
        <Text size="20px">Iniciar Sesión</Text>
        <Flex direction="column" align="center" gap="20px">
          <CustomInput
            placeholder="CorreoElectronico"
            border="1px solid gray"
            w="100%"
            name="email"
          />
          <CustomInput
            placeholder="Contraseña"
            border="1px solid gray"
            w="100%"
            name="Password"
          />
          <CustomButton color="white" bg={primaryColor}>
            Iniciar
          </CustomButton>
        </Flex>
        <Flex justify="center" align="center" gap="10px">
          <Text size="14px">¿Aun no tienes cuenta?</Text>
          <Text color={primaryColor} onClick={() => goRegister()}>
            Registrate
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
