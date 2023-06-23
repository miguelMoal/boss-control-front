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
        w="fit-content"
        sm={`width: 100%; margin-left: 0px`}
        md={`width: 100%; margin-left: 0px`}
        ml="20px"
        mt="20px"
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
        sm={`width: 60px; height: 60px; left: 280px; top: 20px`}
        md={`width: 60px; height: 60px; left: 280px; top: 20px`}
      />
      <SquareFloat
        top={"600px"}
        left={"500px"}
        size="50px"
        opacity={4}
        animationDelay={"3s"}
        sm={`width: 150px; height: 150px; left: 300px; top: 200px`}
        md={`width: 150px; height: 150px; left: 300px; top: 200px`}
      />
      <SquareFloat
        top={"100px"}
        left={"200px"}
        size="500px"
        opacity={0.1}
        animationDelay={"7s"}
        sm={`width: 60px; height: 60px; left: 0px; top: 250px`}
        md={`width: 60px; height: 60px; left: 0px; top: 250px`}
      />
      <SquareFloat
        top={"400px"}
        left={"px"}
        size="330px"
        opacity={4}
        animationDelay={"5s"}
        sm={`width: 60px; height: 60px; left: 0px; top: 500px`}
        md={`width: 60px; height: 60px; left: 0px; top: 500px`}
      />
      {children}
    </div>
  );
};

export default LayoutBoarding;
