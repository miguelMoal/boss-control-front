//components
import {
  Flex,
  Text,
  CustomButton,
  InfoConditions,
  CustomInput,
  Spinner,
  LayoutBoarding,
} from "@/components";
import { useToastContext } from "@/components/Toast";

//react
import { useState } from "react";
//reactRedux
import { useSelector } from "react-redux";
//icons
import { EyeIcon, EyeCloseIcon } from "@/assets/icons";
//Hooks
import { useForm, useModal } from "@/hooks";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
//conections
import { registerApi } from "@/connections";
//Helpers
import { validateEmail, validatePassword, validatePhone } from "@/helpers";

const Register = () => {
  const { primaryColor, error, tertiaryColor, btnPrimary, secondaryColor } =
    useSelector((state) => state.theme);
  const [type, setType] = useState("password");
  const [typeConfirmation, setTypeConfirmation] = useState("password");
  const { handleChange, formData } = useForm();
  const { mutate: register, isLoading } = useMutation(registerApi);

  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPassword, setValidPassword] = useState(null);
  const [validRepeatPassword, setValidRepeatPassword] = useState(true);

  const [checked, setChecked] = useState(false);

  const toggleCheck = (value) => {
    setChecked(value);
  };

  const allReady =
    formData?.name &&
    formData?.email &&
    formData?.password &&
    formData?.repeatPassword &&
    formData?.phone;

  const router = useRouter();
  const addToast = useToastContext();

  const _register = () => {
    if (allReady && checked) {
      const _validEmail = validateEmail(formData.email);
      const _validPassword = validatePassword(formData.password);
      const _validPhone = validatePhone(formData.phone);
      !_validEmail ? setValidEmail(false) : setValidEmail(true);
      _validPassword
        ? setValidPassword(_validPassword)
        : setValidPassword(null);
      formData.password != formData.repeatPassword
        ? setValidRepeatPassword(false)
        : setValidRepeatPassword(true);
      !_validPhone ? setValidPhone(false) : setValidPhone(true);

      if (
        _validEmail &&
        !_validPassword &&
        _validPhone &&
        formData.password == formData.repeatPassword
      ) {
        register(
          { ...formData, role: "ADMIN_ROLE" },
          {
            onSuccess: (data) => {
              addToast("Se registro correctamente");
              router.replace("/");
            },
            onError: (error) => {
              addToast(error.response.data.msg, error.response.data.ok);
            },
          }
        );
      }
    }
  };

  const goLogin = () => {
    router.replace("/");
  };

  return (
    <LayoutBoarding>
      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Flex
          direction="column"
          w="400px"
          bg={tertiaryColor}
          pd="20px"
          gap="25px"
          style={{ position: "relative" }}
        >
          <Flex
            h="70px"
            w="250px"
            align="center"
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
          >
            <Text ml="20px" weight="bold" size="25px">
              Registro
            </Text>
          </Flex>
          <CustomInput
            placeholder="Nombre"
            border="1px solid gray"
            w="100%"
            name="name"
            onChange={handleChange}
            mt="70px"
          />
          <CustomInput
            placeholder="CorreoElectronico"
            border="1px solid gray"
            w="100%"
            name="email"
            onChange={handleChange}
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
              type={type}
              name="password"
              onChange={handleChange}
            />
            {type == "password" ? (
              <Flex
                color="white"
                w="fit-content"
                mr="5px"
                onClick={() => setType("text")}
              >
                <EyeIcon />
              </Flex>
            ) : (
              <Flex
                color="white"
                w="fit-content"
                mr="5px"
                onClick={() => setType("password")}
              >
                <EyeCloseIcon />
              </Flex>
            )}
          </Flex>
          {validPassword && (
            <Text color={error} size="13px" mt="-8px">
              {validPassword}
            </Text>
          )}
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
              <Flex
                color="white"
                w="fit-content"
                mr="5px"
                onClick={() => setTypeConfirmation("text")}
              >
                <EyeIcon />
              </Flex>
            ) : (
              <Flex
                color="white"
                w="fit-content"
                mr="5px"
                onClick={() => setTypeConfirmation("password")}
              >
                <EyeCloseIcon />
              </Flex>
            )}
          </Flex>
          {!validRepeatPassword && (
            <Text color={error} size="13px" mt="-8px">
              Las contraseñas no coinciden
            </Text>
          )}
          <CustomInput
            placeholder="Telefono"
            border="1px solid gray"
            w="100%"
            name="phone"
            onChange={handleChange}
            type="number"
          />
          {!validPhone && (
            <Text color={error} size="13px" mt="-8px">
              Teléfono inváido
            </Text>
          )}
          <InfoConditions
            checked={checked}
            toggleCheck={toggleCheck}
            colorText="white"
          />
          <Flex justify="center">
            <CustomButton
              onClick={() => _register()}
              color="white"
              bg={allReady && checked ? btnPrimary : "gray"}
            >
              {isLoading && <Spinner color="white" mr="10px" />}
              Registrar
            </CustomButton>
          </Flex>
          <Flex justify="center" align="center" gap="10px">
            <Text size="14px">¿Ya Tienes Cuenta?</Text>
            <Text
              color={secondaryColor}
              weight="bold"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => goLogin()}
            >
              Inicia Sesión
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </LayoutBoarding>
  );
};

export default Register;
