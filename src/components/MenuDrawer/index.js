//Components
import { Flex, Text } from "@/components";
import { useRouter } from "next/router";

//Redux
import { useSelector } from "react-redux";

//Icons
import { Logo, CloseIcon } from "@/assets/icons";

const MenuDrawer = ({ isOpen = true, sections, selectSection, closeMenu }) => {
  const { primaryColor, secondaryColor } = useSelector(({ theme }) => theme);

  const router = useRouter();

  const handleSelectSection = (section) => {
    selectSection(section);
    closeMenu();
  };

  return (
    <Flex
      h="100vh"
      style={{
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: !isOpen ? "-100vw" : 0,
        transition: "all ease-in-out",
        transitionDuration: "0.3s",
        background: "rgba(0,0,0,0.7)",
      }}
    >
      <Flex bg={primaryColor} direction="column" h="100%" w="300px" pd="20px">
        <Flex justify="space-between">
          <Flex align="center" direction="column">
            <Logo />
            <Text size="20px" weight="bold" mt="5px">
              Boss-Control
            </Text>
          </Flex>
          <Flex w="fit-content" color="white" onClick={() => closeMenu()}>
            <CloseIcon />
          </Flex>
        </Flex>
        <Flex direction="column" h="100%" mt="15px">
          {sections.map((section) => (
            <Flex
              align="center"
              color="#f1f1f1"
              key={section.id}
              onClick={() => handleSelectSection(section)}
              w="120px"
              h="50px"
            >
              {section.icon}
              <Text
                ml="10px"
                color={router.asPath == section.path && secondaryColor}
              >
                {section.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MenuDrawer;
