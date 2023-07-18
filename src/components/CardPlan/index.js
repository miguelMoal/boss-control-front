//Components
import { Flex, Text, CustomButton } from "@/components";

//Redux
import { useSelector } from "react-redux";

const CardPlan = ({
  data,
  title,
  action,
  colorBtn,
  textBtn,
  colorFligth,
  price,
}) => {
  const { tertiaryColor, gray, primaryColor, btnPrimary } = useSelector(
    (state) => state.theme
  );

  return (
    <Flex
      pd="20px"
      bg={tertiaryColor}
      h="70vh"
      w="380px"
      direction="column"
      radius="5px"
      style={{ position: "relative" }}
    >
      <Flex
        radius="0px 0px 15px 15px"
        style={{ position: "absolute", top: 0, right: 20 }}
        bg={colorFligth}
        w="80px"
        h="60px"
        justify="center"
        align="center"
      >
        <Text size="27px" color={tertiaryColor} weight="800">
          ${price}
        </Text>
      </Flex>
      <Flex
        justify="center"
        style={{ borderBottom: `1px solid ${primaryColor}` }}
      >
        <Text size="20px" weight="bold" mb="10px">
          {title}
        </Text>
      </Flex>
      <Flex
        direction="column"
        gap="10px"
        align="center"
        h="calc(100% - 40px)"
        justify="space-between"
      >
        <Flex direction="column" gap="10px">
          {data.map((inf) => (
            <Flex key={inf.id}>
              <Text style={{ color: "#819EDE" }}>•</Text>
              <Text style={{ color: "#A2BEFA" }} ml="10px">
                {inf.desc}
              </Text>
            </Flex>
          ))}
        </Flex>
        <CustomButton color="white" bg={colorBtn} mt="10px" onClick={action}>
          <Text>{textBtn}</Text>
        </CustomButton>
      </Flex>
    </Flex>
  );
};
export default CardPlan;
