//components
import { Flex, Text, CustomButton, CustomInput, Spinner } from "@/components";
import { useToastContext } from "@/components/Toast";

//react
import { useState } from "react";
//reactRedux
import { useSelector } from "react-redux";
//icons
import { EyeIcon, EyeCloseIcon } from "@/assets/icons";
//Hooks
import { useModal, useForm } from "@/hooks";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
//conections
import { registerApi } from "@/connections";

const Register = () => {
  const { primaryColor } = useSelector((state) => state.theme);
  const [type, setType] = useState("password");
  const [typeConfirmation, setTypeConfirmation] = useState("password");
  const { handleChange, formData } = useForm();
  const { mutate: register, isLoading } = useMutation(registerApi);

  const allReady =
    formData?.name &&
    formData?.email &&
    formData?.password &&
    formData?.repeatPassword &&
    formData?.phone;

  const router = useRouter();
  const addToast = useToastContext();

  const _register = () => {
    if (allReady) {
      register(
        { ...formData, role: "ADMIN_ROLE" },
        {
          onSuccess: (data) => {
            addToast("Se registro correctamente");
            router.replace("/");
          },
          onError: (error) => {
            console.log(error);
            addToast("Algo salió mal");
          },
        }
      );
    }
  };

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      bg={primaryColor}
      align="center"
      justify="center"
    >
      <Flex
        direction="column"
        align="center"
        w="300px"
        h="400px"
        bg="white"
        pd="10px"
        gap="20px"
      >
        <Flex>
          <Text weight="bold" size="20px">
            Registro
          </Text>
        </Flex>
        <CustomInput
          placeholder="Nombre"
          border="1px solid gray"
          w="100%"
          name="name"
          onChange={handleChange}
        />
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
            type={type}
            name="password"
            onChange={handleChange}
          />
          {type == "password" ? (
            <Flex w="fit-content" onClick={() => setType("text")}>
              <EyeIcon />
            </Flex>
          ) : (
            <Flex w="fit-content" onClick={() => setType("password")}>
              <EyeCloseIcon />
            </Flex>
          )}
        </Flex>
        <Flex
          align="center"
          justify="center"
          style={{ border: "1px solid gray", borderRadius: "5px" }}
        >
          <CustomInput
            placeholder="Repetir Contraseña"
            w="100%"
            type={typeConfirmation}
            name="repeatPassword"
            onChange={handleChange}
          />
          {typeConfirmation == "password" ? (
            <Flex w="fit-content" onClick={() => setTypeConfirmation("text")}>
              <EyeIcon />
            </Flex>
          ) : (
            <Flex
              w="fit-content"
              onClick={() => setTypeConfirmation("password")}
            >
              <EyeCloseIcon />
            </Flex>
          )}
        </Flex>
        <CustomInput
          placeholder="Telefono"
          border="1px solid gray"
          w="100%"
          name="phone"
          onChange={handleChange}
        />
        <CustomButton
          onClick={() => _register()}
          color="white"
          bg={primaryColor}
        >
          {isLoading && <Spinner color="white" mr="10px" />}
          Registrar
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default Register;
