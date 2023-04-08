//Components
import { Flex, Text } from "@/components";

//Elements
import { NavBar, SideBar, ChildrenContainer, Content } from "./elements";

//icons
import {
  Logo,
  ProductsIcon,
  ReinvestIcon,
  AnalyticsIcon,
  AccountsIcon,
} from "@/assets/icons";

const sections = [
  { name: "Productos", icon: <ProductsIcon />, id: 1 },
  { name: "Reinvertir", icon: <ReinvestIcon />, id: 2 },
  { name: "Analitica", icon: <AnalyticsIcon />, id: 3 },
  { name: "Cuentas", icon: <AccountsIcon />, id: 4 },
];

const Layout = ({ children }) => {
  return (
    <Flex h="100vh" w="100vw" pd="0px" direction="column">
      <NavBar />
      <Content>
        <SideBar>
          <Flex h="150px" pd="0px" direction="column" align="center">
            <Logo />
            <Text size="25px" weight="bold" color="#f1f1f1" mt="10px">
              Boss Control
            </Text>
          </Flex>
          <Flex direction="column" pd="20px" justify="space-between">
            {sections.map((section) => (
              <Flex align="center" color="#f1f1f1" key={section.id} pd="10px">
                {section.icon}
                <Text ml="10px" color="#f1f1f1">
                  {section.name}
                </Text>
              </Flex>
            ))}
          </Flex>
        </SideBar>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Content>
    </Flex>
  );
};

export default Layout;
