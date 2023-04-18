import {
  Layout,
  CustomButton,
  Flex,
  Search,
  Text,
  ItemUser,
  ModalCreateUser,
} from "@/components";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useForm, useModal } from "@/hooks";

//Connections
import { getSubUsersApi } from "@/connections";

//Externals
import { useQuery } from "react-query";

const headerUsers = [
  { name: "Nombre", id: 1, space: "20%" },
  { name: "Correo", id: 2, space: "25%" },
  { name: "Permisos", id: 3, space: "25%" },
  { name: "Acciones", id: 3, space: "30%" },
];

const Accounts = () => {
  const { primaryColor } = useSelector((state) => state.theme);

  const { handleChange, formData } = useForm();

  const { showModal, closeModal, ModalWrapper } = useModal();

  const { data: subUsers, status } = useQuery(["subUsers"], getSubUsersApi);

  const handleCreateUser = () => {
    showModal(<ModalCreateUser closeModal={closeModal} />);
  };

  return (
    <Layout>
      <ModalWrapper />
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} />
        <CustomButton
          bg={primaryColor}
          color="white"
          onClick={() => handleCreateUser()}
        >
          Crear usuario
        </CustomButton>
      </Flex>
      <Flex
        pd="10px"
        align="center"
        h="60px"
        shadow="0px 4px 8px #d9d9d9"
        bg={primaryColor}
        style={{ borderRadius: "5px" }}
      >
        {headerUsers.map((header, index) => (
          <Text
            w={header.space}
            weight="bold"
            color="white"
            key={header.name + index}
          >
            {header.name}
          </Text>
        ))}
      </Flex>
      <Flex
        className="scroll"
        direction="column"
        bg="white"
        h="calc(100% - 120px)"
        pd="0px"
        style={{ overflowY: "auto" }}
      >
        {subUsers?.map((subUser) => (
          <ItemUser user={subUser} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Accounts;
