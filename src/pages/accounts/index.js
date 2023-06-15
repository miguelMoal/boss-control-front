//HOC
import { ProtectedRoute } from "@/HOC";

import {
  Layout,
  CustomButton,
  Flex,
  Search,
  ModalCreateUser,
  HandleStatus,
  TableAccounts,
} from "@/components";

//Redux
import { useSelector } from "react-redux";

//Hooks
import { useForm, useModal } from "@/hooks";

//Connections
import { getSubUsersApi } from "@/connections";

//Externals
import { useQuery } from "react-query";

const Accounts = () => {
  const { btnPrimary } = useSelector((state) => state.theme);

  const { handleChange, formData } = useForm();

  const { showModal, closeModal, ModalWrapper } = useModal();

  const { data: subUsers, status } = useQuery(["subUsers"], getSubUsersApi);

  const handleCreateUser = () => {
    showModal(<ModalCreateUser closeModal={closeModal} />);
  };

  const usersFiltered = subUsers?.filter((user) =>
    user.name.toLowerCase()?.includes(formData?.search?.toLowerCase() || "")
  );

  return (
    <Layout>
      <ModalWrapper />
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} sm={`width: calc(100vw - 170px)`} />
        <CustomButton
          bg={btnPrimary}
          color="white"
          onClick={() => handleCreateUser()}
        >
          Crear usuario
        </CustomButton>
      </Flex>
      <HandleStatus status={status} data={usersFiltered}>
        <TableAccounts usersFiltered={usersFiltered} />
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(Accounts);
