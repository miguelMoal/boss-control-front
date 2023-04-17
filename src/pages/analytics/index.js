import { Layout } from "@/components";

//components
import {
  PieChart,
  BarChart,
  Flex,
  Text,
  CardContainer,
  CustomButton,
} from "@/components";

//Redux
import { useSelector } from "react-redux";

const Analytics = () => {
  const { primaryColor } = useSelector((state) => state.theme);

  return (
    <Layout>
      <Flex direction="column" gap="10px">
        {/* <Flex justify="space-between" w="100%" align="center" h="80px">
          <Text size="20px" weight="bold">
            Desglose semanal
          </Text>
          <Flex w="fit-content" gap="15px">
            <CustomButton bg={primaryColor} color="white">
              Semanal
            </CustomButton>
            <CustomButton borderColor={primaryColor} color={primaryColor}>
              Mensual
            </CustomButton>
            <CustomButton borderColor={primaryColor} color={primaryColor}>
              Anual
            </CustomButton>
          </Flex>
        </Flex> */}
        <Flex>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Invertido</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                $ 10,458
              </Text>
            </Flex>
          </CardContainer>
        </Flex>
        <Flex>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Ventas últimos 7 días</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                $ 5280
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Articulos vendidos</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                220
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Día con más ventas de articulos</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                Jueves
              </Text>
            </Flex>
          </CardContainer>
        </Flex>
        <Flex gap="10px">
          <CardContainer direction="column" pd="20px" h="380px">
            <Text size="20px">Ventas última semana</Text>
            <BarChart
              data={[20, 15, 10, 5, 3, 35, 1]}
              categories={[
                "Lunes",
                "Martes",
                "Miercoles",
                "Jueves",
                "Viernes",
                "Sabado",
                "Domingo",
              ]}
            />
          </CardContainer>
          <CardContainer
            direction="column"
            pd="20px"
            h="380px"
            justify="space-between"
          >
            <Text size="20px">Productos más vendidos</Text>
            <Flex mb="20px" justify="center">
              <PieChart
                data={["Apple", "Banana", "Mango", "Orange", "Papaya"]}
                series={[44, 55, 13, 43, 22]}
                height={320}
              />
            </Flex>
          </CardContainer>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Analytics;
