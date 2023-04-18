import { Flex, Text, CustomButton, ModalEditUser } from "@/components";

//Redux
import { useSelector } from "react-redux";

//hooks
import { useModal } from "@/hooks";

//Icons
import { UserIcon, RemoveIcon } from "@/assets/icons";

const translatePermissions = {
  add: "Añadir",
  edit: "Editar",
  delete: "Eliminar",
};

const ItemUser = ({ user }) => {
  const { primaryColor, warning } = useSelector((state) => state.theme);

  const { showModal, closeModal, ModalWrapper } = useModal();

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

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: "1px solid gray", minHeight: "55px" }}
    >
      <ModalWrapper />
      <Flex w="20%" align="center" color={primaryColor}>
        <UserIcon size="35px" />
        <Text ml="15px">{user.name}</Text>
      </Flex>
      <Text w="25%">{user.email}</Text>
      <Flex w="25%" gap="20px">
        {showPermissions()}
      </Flex>
      <Flex w="30%" gap="20px">
        <CustomButton
          borderColor={warning}
          onClick={() => handleShowModalEdit()}
        >
          Editar Permisos
        </CustomButton>
        <CustomButton w="fit-content">
          <RemoveIcon />
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default ItemUser;
