//components
import { Flex, Text, SquareFloat } from "@/components";
//icons
import { Logo } from "@/assets/icons";

const LayoutBoarding = ({ children }) => {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Flex
        direction="column"
        align="center"
        style={{ position: "absolute", left: "20px", top: "20px" }}
        w="fit-content"
      >
        <Logo />
        <Text size="20px" weight="bold" color="#f1f1f1" mt="10px">
          Boss Control
        </Text>
      </Flex>
      <SquareFloat top={"-200px"} />
      <SquareFloat
        top={"200px"}
        left={"1000px"}
        size="50px"
        animationDelay={"4s"}
      />
      <SquareFloat
        top={"600px"}
        left={"500px"}
        size="50px"
        opacity={4}
        animationDelay={"3s"}
      />
      <SquareFloat
        top={"100px"}
        left={"200px"}
        size="500px"
        opacity={0.1}
        animationDelay={"7s"}
      />
      <SquareFloat
        top={"400px"}
        left={"px"}
        size="330px"
        opacity={4}
        animationDelay={"5s"}
      />
      {children}
    </div>
  );
};

export default LayoutBoarding;
