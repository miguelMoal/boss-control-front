//components
import {
  Flex,
  Text,
  CustomButton,
  InfoConditions,
  CustomInput,
  Spinner,
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
  const { primaryColor, error } = useSelector((state) => state.theme);
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
              console.log(error);
              addToast("Algo salió mal");
            },
          }
        );
      }
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
      <Flex direction="column" w="300px" bg="white" pd="10px" gap="20px">
        <Flex>
          <Text color={primaryColor} weight="bold" size="20px">
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
            <Flex w="fit-content" mr="5px" onClick={() => setType("text")}>
              <EyeIcon />
            </Flex>
          ) : (
            <Flex w="fit-content" mr="5px" onClick={() => setType("password")}>
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
              w="fit-content"
              mr="5px"
              onClick={() => setTypeConfirmation("text")}
            >
              <EyeIcon />
            </Flex>
          ) : (
            <Flex
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
        <InfoConditions checked={checked} toggleCheck={toggleCheck} />
        <Flex justify="center">
          <CustomButton
            onClick={() => _register()}
            color="white"
            bg={allReady && checked ? primaryColor : "gray"}
          >
            {isLoading && <Spinner color="white" mr="10px" />}
            Registrar
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
