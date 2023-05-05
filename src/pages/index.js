import { useState } from "react";
//components
import { CustomButton, CustomInput, Flex, Text, Spinner } from "@/components";
import { useSelector } from "react-redux";
//Hooks
import { useModal, useForm } from "@/hooks";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
//icons
import { EyeIcon, EyeCloseIcon } from "@/assets/icons";
//conections
import { loginApi } from "@/connections";

//Helpers
import { saveTokenToLocalStorage } from "@/helpers";

export default function Home() {
  const [type, setType] = useState("password");
  const { primaryColor, warning } = useSelector((state) => state.theme);
  const { handleChange, formData, setInitialData } = useForm();
  const { mutate: makeLogIn, isLoading } = useMutation(loginApi);
  const router = useRouter();

  const goRegister = () => {
    router.replace("/register");
  };

  const allReady = formData?.email && formData?.password;

  const logIn = () => {
    if (allReady) {
      makeLogIn(formData, {
        onSuccess: (data) => {
          saveTokenToLocalStorage(data.token);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
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
            onChange={handleChange}
          />
          <Flex
            align="center"
            justify="center"
            style={{ border: "1px solid gray", borderRadius: "5px" }}
          >
            <CustomInput
              placeholder="Contraseña"
              w="100%"
              name="password"
              type={type}
              onChange={handleChange}
            />
            {type == "text" ? (
              <Flex w="fit-content" onClick={() => setType("password")}>
                <EyeCloseIcon />
              </Flex>
            ) : (
              <Flex w="fit-content" onClick={() => setType("text")}>
                <EyeIcon />
              </Flex>
            )}
          </Flex>
          <CustomButton color="white" bg={primaryColor} onClick={() => logIn()}>
            Iniciar
          </CustomButton>
        </Flex>
        <Flex justify="center" align="center" gap="10px">
          <Text size="14px">¿Aun no tienes cuenta?</Text>
          <Text
            color={primaryColor}
            weight="bold"
            style={{ cursor: "pointer" }}
            onClick={() => goRegister()}
          >
            {isLoading && <Spinner color="white" mr="10px" />}
            Registrate
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
