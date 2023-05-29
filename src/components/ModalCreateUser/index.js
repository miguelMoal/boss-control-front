import { useState } from "react";
//Componenets
import { Flex, Text, CustomButton, CustomInput, Spinner } from "@/components";
//Redux
import { useSelector } from "react-redux";
//Hooks
import { useForm } from "@/hooks";
//Helpers
import { validateEmail, validatePassword } from "@/helpers";
//Connections
import { createSubUserApi } from "@/connections";
//Externals
import { useMutation, useQueryClient } from "react-query";
//icons
import { EyeIcon, EyeCloseIcon } from "@/assets/icons";

const ModalCreateUser = ({ closeModal }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  const { handleChange, formData } = useForm();

  const queryClient = useQueryClient();

  const { mutate: createSubUser, isLoading: loadingCreateUser } =
    useMutation(createSubUserApi);

  const [type, setType] = useState("password");
  const [typeConfirmation, setTypeConfirmation] = useState("password");

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(null);
  const [validRepeatPassword, setValidRepeatPassword] = useState(true);
  const [permissions, setPermission] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const togglePermissions = (value) => {
    if (!loadingCreateUser) {
      setPermission({ ...permissions, [value]: !permissions[value] });
    }
  };

  const allReady =
    formData?.name &&
    formData?.email &&
    formData?.password &&
    formData?.repeatPassword;

  const sendUser = () => {
    if (!allReady) return;
    const validEmail = validateEmail(formData.email);
    const validPassword = validatePassword(formData.password);
    if (!validEmail) {
      setValidEmail(false);
    } else if (validPassword) {
      setValidEmail(true);
      setValidPassword(validPassword);
    } else if (formData.password !== formData.repeatPassword) {
      setValidPassword(null);
      setValidRepeatPassword(false);
    } else {
      setValidRepeatPassword(true);
      createSubUser(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          permissions: [
            { name: "edit", active: permissions.edit },
            { name: "add", active: permissions.add },
            { name: "delete", active: permissions.delete },
          ],
        },

        {
          onSuccess: () => {
            queryClient.invalidateQueries("subUsers");
            closeModal();
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }
  };

  return (
    <Flex direction="column">
      <Flex bg={primaryColor} h="40px" align="center">
        <Text color="white" size="20px" ml="15px">
          Nuevo usuario
        </Text>
      </Flex>
      <Flex direction="column" pd="20px">
        <Flex direction="column" gap="10px" mb="20px">
          <CustomInput
            placeholder="Nombre del usuario"
            border="1px solid gray"
            w="100%"
            name="name"
            onChange={handleChange}
            value={formData?.name}
            disabled={loadingCreateUser}
          />
          <CustomInput
            placeholder="Correo"
            border="1px solid gray"
            w="100%"
            name="email"
            onChange={handleChange}
            value={formData?.email}
            disabled={loadingCreateUser}
          />
          {!validEmail && (
            <Text color={error} size="13px" mt="-8px">
              Correo invaido
            </Text>
          )}
          <Flex
            align="center"
            justify="center"
            style={{ border: "1px solid gray", borderRadius: "5px" }}
          >
            <CustomInput
              placeholder="Ingresa contraseña"
              w="100%"
              type={type}
              name="password"
              onChange={handleChange}
              value={formData?.password}
              disabled={loadingCreateUser}
            />
            {type == "password" ? (
              <Flex w="fit-content" mr="5px" onClick={() => setType("text")}>
                <EyeIcon />
              </Flex>
            ) : (
              <Flex
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
              placeholder="Repetir contraseña"
              w="100%"
              type={typeConfirmation}
              name="repeatPassword"
              onChange={handleChange}
              value={formData?.repeatPassword}
              disabled={loadingCreateUser}
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
          <Text>Selecciona los permisos para este usuario</Text>
          <Flex justify="center" gap="10px">
            <CustomButton
              onClick={() => togglePermissions("add")}
              borderColor={!permissions["add"] && primaryColor}
              bg={permissions["add"] && primaryColor}
              color={permissions["add"] && "white"}
            >
              Añadir
            </CustomButton>
            <CustomButton
              onClick={() => togglePermissions("edit")}
              borderColor={!permissions["edit"] && primaryColor}
              bg={permissions["edit"] && primaryColor}
              color={permissions["edit"] && "white"}
            >
              Editar
            </CustomButton>
            <CustomButton
              onClick={() => togglePermissions("delete")}
              borderColor={!permissions["delete"] && primaryColor}
              bg={permissions["delete"] && primaryColor}
              color={permissions["delete"] && "white"}
            >
              Eliminar
            </CustomButton>
          </Flex>
        </Flex>
        <Flex gap="20px" justify="center">
          {!loadingCreateUser && (
            <CustomButton
              borderColor={error}
              color={error}
              onClick={() => closeModal()}
            >
              Cancelar
            </CustomButton>
          )}
          <CustomButton
            bg={allReady ? primaryColor : "gray"}
            color="white"
            onClick={() => sendUser()}
          >
            {loadingCreateUser && <Spinner mr="15px" color="white" />}
            Crear usuario
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ModalCreateUser;
