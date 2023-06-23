import { useState } from "react";
//components
import {
  CustomButton,
  CustomInput,
  Flex,
  Text,
  Spinner,
  SquareFloat,
  LayoutBoarding,
} from "@/components";
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
  const { tertiaryColor, btnPrimary, secondaryColor } = useSelector(
    (state) => state.theme
  );
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
    <LayoutBoarding>
      <Flex
        justify="center"
        mt="50px"
        pd="20px 0px"
        style={{ minHeight: "calc(100vh - 165px)" }}
      >
        <Flex
          pd="20px"
          gap="70px"
          w="400px"
          direction="column"
          justify="center"
          bg={tertiaryColor}
          style={{ borderRadius: "5px", position: "relative" }}
        >
          <Flex
            h="70px"
            w="250px"
            bg={btnPrimary}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              borderRadius: "0px 0px 100px 0px",
              backgroundSize: "210% 210%",
              backgroundPosition: "100% 0",
            }}
          ></Flex>
          <Text
            size="25px"
            weight="bold"
            style={{ position: "absolute", zIndex: 1, top: 20 }}
          >
            Iniciar Sesión
          </Text>
          <Flex direction="column" align="center" gap="20px" mt="100px">
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
                <Flex
                  w="fit-content"
                  color="white"
                  onClick={() => setType("password")}
                >
                  <EyeCloseIcon />
                </Flex>
              ) : (
                <Flex
                  mr="5px"
                  w="fit-content"
                  color="white"
                  onClick={() => setType("text")}
                >
                  <EyeIcon />
                </Flex>
              )}
            </Flex>
            <CustomButton
              color="white"
              bg={allReady ? btnPrimary : "gray"}
              onClick={() => logIn()}
            >
              {isLoading && <Spinner color="white" mr="10px" />}
              Iniciar
            </CustomButton>
          </Flex>
          <Flex justify="center" align="center" gap="10px">
            <Text size="14px">¿Aun no tienes cuenta?</Text>
            <Text
              color={secondaryColor}
              weight="bold"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => goRegister()}
            >
              Registrate
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </LayoutBoarding>
  );
}
