import { useState } from "react";
//components
import { CustomButton, CustomInput, Flex, Text, Spinner } from "@/components";
import { useToastContext } from "@/components/Toast";
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

//Externals
import { setCookie } from "nookies";

//Helpers
import { validateEmail } from "@/helpers";

export default function Home() {
  const [type, setType] = useState("password");
  const { primaryColor } = useSelector((state) => state.theme);
  const { handleChange, formData } = useForm();
  const { mutate: makeLogIn, isLoading } = useMutation(loginApi);
  const [validEmail, setValidEmail] = useState(true);

  const router = useRouter();
  const goRegister = () => {
    router.replace("/register");
  };

  const allReady = formData?.email && formData?.password;

  const addToast = useToastContext();

  const logIn = () => {
    if (allReady) {
      const _validEmail = validateEmail(formData.email);
      !_validEmail ? setValidEmail(false) : setValidEmail(true);
      if (_validEmail) {
        makeLogIn(formData, {
          onSuccess: (data) => {
            saveTokenToLocalStorage(data.token);
            setCookie(null, "token", data.token, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            router.replace("/sales");
          },
          onError: (error) => {
            addToast(error.response.data.msg, error.response.data.ok);
          },
        });
      }
    }
  };

  return (
    <>
      <div className="bgLogin"></div>
      <Flex
        h="100vh"
        w="100vw"
        justify="center"
        align="center"
        style={{ zIndex: 10 }}
      >
        <Flex
          pd="10px"
          gap="70px"
          h="350px"
          w="400px"
          direction="column"
          justify="center"
        >
          <Text size="20px" weight="bold" color={primaryColor}>
            Iniciar Sesión
          </Text>
          <Flex direction="column" align="center" gap="20px">
            <CustomInput
              placeholder="CorreoElectronico"
              border="1px solid gray"
              w="100%"
              name="email"
              onChange={handleChange}
              autocomplete="nope"
            />
            {!validEmail && (
              <Text color={error} size="13px" mt="-8px">
                Correo inváido
              </Text>
            )}
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
                autocomplete="nope"
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
            <CustomButton
              color="white"
              bg={primaryColor}
              onClick={() => logIn()}
            >
              {isLoading && <Spinner color="white" mr="10px" />}
              Iniciar
            </CustomButton>
          </Flex>
          <Flex justify="center" align="center" gap="10px">
            <Text size="14px">¿Aun no tienes cuenta?</Text>
            <Text
              color={primaryColor}
              weight="bold"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => goRegister()}
            >
              Registrate
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
