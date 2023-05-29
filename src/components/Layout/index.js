import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { destroyCookie } from "nookies";

//Components
import {
  Flex,
  Text,
  ModalSubscribe,
  Modal,
  DropDown,
  ModalDetailsSub,
  CustomButton,
  ModalGoal,
} from "@/components";
//Elements
import { NavBar, SideBar, ChildrenContainer, Content } from "./elements";
//icons
import {
  Logo,
  ProductsIcon,
  ReinvestIcon,
  AnalyticsIcon,
  AccountsIcon,
  SaleIcon,
  HistoryIcon,
} from "@/assets/icons";

//Hooks
import { useQuery } from "react-query";
import { useModal } from "@/hooks";

//Connections
import { getInfoUser } from "@/connections";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import { addInfo } from "@/redux/slices/infoUser";

const sections = [
  { name: "Ventas", icon: <SaleIcon size="36px" />, id: 1, path: "/sales" },
  { name: "Productos", icon: <ProductsIcon />, id: 2, path: "/products" },
  { name: "Reinvertir", icon: <ReinvestIcon />, id: 3, path: "/reinvest" },
  { name: "Analitica", icon: <AnalyticsIcon />, id: 4, path: "/analytics" },
  { name: "Cuentas", icon: <AccountsIcon />, id: 5, path: "/accounts" },
  {
    name: "Historial",
    icon: <HistoryIcon size="36px" />,
    id: 5,
    path: "/history",
  },
];

const options = [
  { name: "Cerrar sesión", value: "close" },
  { name: "Opciones", value: "options" },
];

const Layout = ({ children }) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showModalSub, setShowModalSub] = useState(false);

  const { showModal, closeModal, ModalWrapper } = useModal();

  const infoU = useSelector(({ infoUser }) => infoUser);

  const dispatch = useDispatch();

  const { data: infoUser } = useQuery("infoUser", getInfoUser, {
    onSuccess: (data) => {
      dispatch(addInfo(data));
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const selectSection = (section) => {
    router.replace(section.path);
  };

  axios.interceptors.response.use(
    function (response) {
      setShowModalSub(false);
      return response;
    },
    function (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.msg === "invalidSubscription"
      ) {
        setShowModalSub(true);
      } else {
        setShowModalSub(false);
      }
      return Promise.reject(error);
    }
  );

  const closeSesion = () => {
    destroyCookie(null, "token");
    router.replace("/");
  };

  const handleActions = (e, val) => {
    e.stopPropagation();
    val == "options" &&
      showModal(<ModalDetailsSub infoUser={infoU} closeModal={closeModal} />);
    val == "close" && closeSesion();
  };

  const handleDate = () => {
    showModal(<ModalGoal />);
  };

  return (
    <Flex h="100vh" w="100vw" pd="0px" direction="column">
      <ModalWrapper />
      <Modal isModalOpen={showModalSub}>
        <ModalSubscribe />
      </Modal>
      <NavBar>
        <Flex w="fit-content" align="center" gap="20px">
          <DropDown
            title={infoU?.name || ""}
            options={options}
            handleActions={handleActions}
          />
        </Flex>
      </NavBar>
      <Content>
        <SideBar>
          <Flex h="110px" pd="0px" direction="column" align="center">
            <Logo />
            <Text size="25px" weight="bold" color="#f1f1f1" mt="10px">
              Boss Control
            </Text>
          </Flex>
          <Flex direction="column" pd="20px" justify="space-between">
            {sections.map((section) => (
              <Flex
                align="center"
                color="#f1f1f1"
                key={section.id}
                pd="5px"
                mb="3px"
                onClick={() => selectSection(section)}
                ml={mounted && router.asPath == section.path && "60px"}
                style={{
                  transform:
                    mounted && router.asPath == section.path && "scale(1.2)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                w="fit-content"
              >
                {section.icon}
                <Text ml="10px" color={"#f1f1f1"}>
                  {section.name}
                </Text>
              </Flex>
            ))}
          </Flex>
          <Flex bg="pink">
            <CustomButton onClick={() => handleDate()}>fecha</CustomButton>
          </Flex>
        </SideBar>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Content>
    </Flex>
  );
};

export default Layout;
