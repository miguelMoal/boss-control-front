import { Flex, Text, CustomButton, ModalEditUser, Spinner } from "@/components";

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

const ItemUser = ({ user }) => {
  const { secondaryColor, warning, error, tertiaryColor, success } =
    useSelector((state) => state.theme);

  const { showModal, closeModal, ModalWrapper } = useModal();

  const { mutate: deleSubUser, isLoading: loadingDeleteUser } =
    useMutation(deleteSubUserApi);

  const queryClient = useQueryClient();

  const handleShowModalEdit = () => {
    showModal(<ModalEditUser user={user} closeModal={closeModal} />);
  };

  const showPermissions = () => {
    const permissions = user.permissions.filter((p) => p.active);
    const namePermissions = permissions.map((p, index) => {
      if (index > 0) return `/ ${translatePermissions[p.name]}`;
      return translatePermissions[p.name];
    });
    return namePermissions.join(" ");
  };

  const handleDelete = () => {
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
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: `1px solid ${tertiaryColor}`, minHeight: "55px" }}
    >
      <ModalWrapper />
      <Flex w="20%" align="center" color={success}>
        <UserIcon size="35px" />
        <Text ml="15px">{user.name}</Text>
      </Flex>
      <Text w="25%">{user.email}</Text>
      <Flex color="white" w="25%" gap="20px">
        {showPermissions()}
      </Flex>
      <Flex w="30%" gap="20px">
        <CustomButton color={warning} onClick={() => handleShowModalEdit()}>
          <EditIcon />
        </CustomButton>
        <CustomButton
          color={error}
          w="fit-content"
          pd="0px"
          onClick={() => handleDelete()}
        >
          {loadingDeleteUser ? <Spinner color={error} /> : <RemoveIcon />}
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default ItemUser;
