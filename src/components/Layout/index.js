import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  { name: "Productos", icon: <ProductsIcon />, id: 1, path: "/products" },
  { name: "Reinvertir", icon: <ReinvestIcon />, id: 2, path: "/reinvest" },
  { name: "Analitica", icon: <AnalyticsIcon />, id: 3, path: "/analytics" },
  { name: "Cuentas", icon: <AccountsIcon />, id: 4, path: "/accounts" },
];

const Layout = ({ children }) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const selectSection = (section) => {
    router.replace(section.path);
  };

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
              <Flex
                align="center"
                color="#f1f1f1"
                key={section.id}
                pd="10px"
                onClick={() => selectSection(section)}
                ml={mounted && router.asPath == section.path && "60px"}
                style={{
                  transform:
                    mounted && router.asPath == section.path && "scale(1.2)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
              >
                {section.icon}
                <Text ml="10px" color={"#f1f1f1"}>
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
