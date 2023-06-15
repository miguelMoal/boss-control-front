import {
  Flex,
  Text,
  CustomButton,
  ModalEditUser,
  Spinner,
  CustomTable,
} from "@/components";

//Redux
import { useSelector } from "react-redux";

//hooks
import { useModal } from "@/hooks";

//Icons
import { UserIcon, RemoveIcon, EditIcon } from "@/assets/icons";

//Connections
import { deleteSubUserApi } from "@/connections";

//Externals
import { useMutation, useQueryClient } from "react-query";

const translatePermissions = {
  add: "Añadir",
  edit: "Editar",
  delete: "Eliminar",
};

const headerUsers = [
  { name: "Nombre", id: 1, minWidth: "250px" },
  { name: "Correo", id: 2, minWidth: "220px" },
  { name: "Permisos", id: 3, minWidth: "220px" },
  { name: "Acciones", id: 5, minWidth: "120px" },
];

const TableAccounts = ({ usersFiltered }) => {
  const { warning, error, tertiaryColor, success, background } = useSelector(
    (state) => state.theme
  );

  const { showModal, closeModal, ModalWrapper } = useModal();

  const { mutate: deleSubUser, isLoading: loadingDeleteUser } =
    useMutation(deleteSubUserApi);

  const queryClient = useQueryClient();

  const handleShowModalEdit = (user) => {
    showModal(<ModalEditUser user={user} closeModal={closeModal} />);
  };

  const showPermissions = (user) => {
    const permissions = user.permissions.filter((p) => p.active);
    const namePermissions = permissions.map((p, index) => {
      if (index > 0) return `/ ${translatePermissions[p.name]}`;
      return translatePermissions[p.name];
    });
    return namePermissions.join(" ");
  };

  const handleDelete = (user) => {
    deleSubUser(user._id, {
      onSuccess: () => {
        queryClient.invalidateQueries("subUsers");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Flex
      h="calc(100vh - 160px)"
      style={{ overflow: "auto" }}
      className="scroll"
    >
      <ModalWrapper />
      <CustomTable>
        <CustomTable.Thead>
          <CustomTable.TR>
            {headerUsers?.map((header, index) => (
              <CustomTable.TH
                key={header.name + index}
                minWidth={header.minWidth}
                fixed={header.id == 5}
              >
                {header.name}
              </CustomTable.TH>
            ))}
          </CustomTable.TR>
        </CustomTable.Thead>
        <CustomTable.Tbody>
          {usersFiltered?.map((user, index) => (
            <CustomTable.TR bg={index % 2 && tertiaryColor}>
              <CustomTable.TD pin={index == 5 && "red"}>
                <Flex align="center" color={success}>
                  <UserIcon size="35px" />
                  <Text ml="15px">{user.name}</Text>
                </Flex>
              </CustomTable.TD>
              <CustomTable.TD>{user.email}</CustomTable.TD>
              <CustomTable.TD> {showPermissions(user)}</CustomTable.TD>
              <CustomTable.TD
                fixed={true}
                bg={index % 2 ? tertiaryColor : background}
              >
                <Flex gap="15px">
                  <CustomButton
                    color={warning}
                    onClick={() => handleShowModalEdit(user)}
                    pd="0px"
                  >
                    <EditIcon />
                  </CustomButton>
                  <CustomButton
                    color={error}
                    w="fit-content"
                    pd="0px"
                    onClick={() => handleDelete(user)}
                  >
                    {loadingDeleteUser ? (
                      <Spinner color={error} />
                    ) : (
                      <RemoveIcon />
                    )}
                  </CustomButton>
                </Flex>
              </CustomTable.TD>
            </CustomTable.TR>
          ))}
        </CustomTable.Tbody>
      </CustomTable>
    </Flex>
  );
};
export default TableAccounts;
