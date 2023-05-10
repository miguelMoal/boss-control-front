import { Layout } from "@/components";

//HOC
import { ProtectedRoute } from "@/HOC";

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

//Icons
import { DollarIcon, EarningsIcon, AverageIcon } from "@/assets/icons";

//Connections
import {
  getInfoPeriods,
  getTotalInvestApi,
  getTopSellingApi,
} from "@/connections";

//Externals
import { useQuery } from "react-query";

const Analytics = () => {
  const { primaryColor, success } = useSelector((state) => state.theme);

  const { data: infoPeriods } = useQuery("info-periods", getInfoPeriods);
  const { data: invest } = useQuery("invest", getTotalInvestApi);
  const { data: top } = useQuery("topSelling", getTopSellingApi);

  return (
    <Layout>
      <Flex gap="10px" direction="column">
        <Flex gap="10pc">
          <CardContainer pd="20px">
            <Flex>
              <Flex color={success} direction="column" align="center">
                <Text mb="10px" color="gray">
                  inverción total
                </Text>
                <DollarIcon size="40px" />
                <Text mt="10px" size="25px" weight="bold">
                  {invest?.total}
                </Text>
              </Flex>
              <Flex color={"#008FFB"} direction="column" align="center">
                <Text mb="10px" color="gray">
                  Utilidad esperadas
                </Text>
                <EarningsIcon size="40px" />
                <Text mt="10px" size="25px" weight="bold">
                  {invest?.totalProfits}
                </Text>
              </Flex>
              <Flex color={primaryColor} direction="column" align="center">
                <Text mb="10px" color="gray">
                  Promedio / día
                </Text>
                <AverageIcon size="40px" />
                <Text mt="10px" size="25px" weight="bold">
                  48,000
                </Text>
              </Flex>
            </Flex>
          </CardContainer>
        </Flex>
        <Flex gap="10px">
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Ventas hoy</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                $ {infoPeriods?.salesToday.totalSales}
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Ventas últimos 7 días</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                $ {infoPeriods?.salesLast7Days.totalSales}
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Ventas últimos 30 días</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                $ {infoPeriods?.salesLast30Days.totalSales}
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>Ventas últimos 365 días</Text>
            <Flex align="center" justify="center">
              <Text size="25px" mt="10px" weight="bold">
                $ {infoPeriods?.salesLastYear.totalSales}
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
                data={top?.names || []}
                series={top?.quantities || []}
                height={320}
              />
            </Flex>
          </CardContainer>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ProtectedRoute(Analytics);
