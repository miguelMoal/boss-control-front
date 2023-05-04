import { useState } from "react";

//Componenets
import { Flex, Text, CustomButton, Spinner } from "@/components";

//Redux
import { useSelector } from "react-redux";

//Connections
import { updateSubUserApi } from "@/connections";

//Externals
import { useMutation, useQueryClient } from "react-query";

const ModalEditUser = ({ user, closeModal }) => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  const permissionsIndexed = user.permissions.reduce(
    (acc, el) => ({
      ...acc,
      [el.name]: el,
    }),
    {}
  );

  const queryClient = useQueryClient();

  const [permissions, setPermission] = useState({
    add: permissionsIndexed["add"].active,
    edit: permissionsIndexed["edit"].active,
    delete: permissionsIndexed["delete"].active,
  });

  const { mutate: updateUser, isLoading: loadingUpdateUser } =
    useMutation(updateSubUserApi);

  const togglePermissions = (value) => {
    if (!loadingUpdateUser) {
      setPermission({ ...permissions, [value]: !permissions[value] });
    }
  };

  const sendUser = () => {
    updateUser(
      {
        name: user.name,
        email: user.email,
        userId: user._id,
        permissions: [
          { name: "add", active: permissions.add },
          { name: "edit", active: permissions.edit },
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
  };

  return (
    <Flex direction="column">
      <Flex bg={primaryColor} h="40px" align="center">
        <Text
          color="white"
          size="20px"
          ml="15px"
        >{`Editar permisos de ${user.name}`}</Text>
      </Flex>
      <Flex direction="column" pd="20px">
        <Flex justify="center">
          <Text>Selecciona los permisos para este usuario</Text>
        </Flex>
        <Flex justify="center" gap="10px" mt="20px" mb="20px">
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
        <Flex gap="20px" justify="center">
          {!loadingUpdateUser && (
            <CustomButton color="white" bg={error} onClick={() => closeModal()}>
              Cancelar
            </CustomButton>
          )}
          <CustomButton
            bg={primaryColor}
            color="white"
            onClick={() => sendUser()}
          >
            {loadingUpdateUser && <Spinner mr="15px" color="white" />}
            Actualizar usuario
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ModalEditUser;
