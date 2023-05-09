//components
import { Layout, Search, Flex, Text } from "@/components";
//Redux
import { useSelector } from "react-redux";
//Hooks
import { useForm, useModal } from "@/hooks";

const History = () => {
  const { primaryColor, success } = useSelector((state) => state.theme);
  const { handleChange, formData } = useForm();

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} />
      </Flex>
      <Flex
        pd="20px"
        style={{
          position: "relative",
          border: `1px solid ${primaryColor}`,
          borderRadius: "5px",
        }}
        direction="column"
        gap="20px"
        mt="30px"
      >
        <Flex
          w="fit-content"
          style={{ position: "absolute", top: "-20px" }}
          bg={primaryColor}
          pd="0px 30px"
          h="40px"
          align="center"
        >
          <Text color="white" weight="bold">
            09/05/2023 - 05:47
          </Text>
        </Flex>
        <Flex justify="space-between" mt="10px">
          <Text weight="bold">Nombre</Text>
          <Text weight="bold">Cantidad</Text>
          <Text weight="bold">Precio</Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default History;
