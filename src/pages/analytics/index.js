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
import {
  DollarIcon,
  EarningsIcon,
  AverageIcon,
  ObjectsIcon,
} from "@/assets/icons";

//Connections
import {
  getInfoPeriods,
  getTotalInvestApi,
  getTopSellingApi,
  getTotalProductsApi,
  getWeeklySalesApi,
} from "@/connections";

//Externals
import { useQuery } from "react-query";

const Analytics = () => {
  const { primaryColor, success } = useSelector((state) => state.theme);

  const { data: infoPeriods } = useQuery("info-periods", getInfoPeriods);
  const { data: invest } = useQuery("invest", getTotalInvestApi);
  const { data: top } = useQuery("topSelling", getTopSellingApi);
  const { data: weeklySales } = useQuery("weeklySales", getWeeklySalesApi);
  const { data: totalProducts } = useQuery(
    "totalProducts",
    getTotalProductsApi
  );

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
                  Variedad de productos
                </Text>
                <ObjectsIcon size="40px" />
                <Text mt="10px" size="25px" weight="bold">
                  {totalProducts}
                </Text>
              </Flex>
            </Flex>
          </CardContainer>
        </Flex>
        <Flex gap="10px">
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>
              Ventas hoy
              <span style={{ size: "14px", color: success }}> / utilidad</span>
            </Text>
            <Flex align="center" justify="center">
              <Text size="22px" mt="10px" weight="bold">
                $ {infoPeriods?.salesToday.totalSales}
                <span style={{ size: "12px", color: success }}>
                  {" "}
                  / ${" "}
                  {infoPeriods?.salesToday.totalSales ||
                    0 - infoPeriods?.salesToday.totalPrice ||
                    0}
                </span>
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>
              Ventas últimos 7 días
              <span style={{ size: "14px", color: success }}> / utilidad</span>
            </Text>
            <Flex align="center" justify="center">
              <Text size="22px" mt="10px" weight="bold">
                $ {infoPeriods?.salesLast7Days.totalSales}
                <span style={{ size: "14px", color: success }}>
                  {" "}
                  / ${" "}
                  {infoPeriods?.salesLast7Days.totalSales ||
                    0 - infoPeriods?.salesLast7Days.totalPrice ||
                    0}
                </span>
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>
              Ventas últimos 30 días
              <span style={{ size: "14px", color: success }}> / utilidad</span>
            </Text>
            <Flex align="center" justify="center">
              <Text size="22px" mt="10px" weight="bold">
                $ {infoPeriods?.salesLast30Days.totalSales}
                <span style={{ size: "14px", color: success }}>
                  {" "}
                  / ${" "}
                  {infoPeriods?.salesLast30Days.totalSales ||
                    0 - infoPeriods?.salesLast30Days.totalPrice ||
                    0}
                </span>
              </Text>
            </Flex>
          </CardContainer>
          <CardContainer h="100px" direction="column" pd="10px 15px">
            <Text>
              Ventas últimos 365 días
              <span style={{ size: "14px", color: success }}> / utilidad</span>
            </Text>
            <Flex align="center" justify="center">
              <Text size="22px" mt="10px" weight="bold">
                $ {infoPeriods?.salesLastYear.totalSales}
                <span style={{ size: "14px", color: success }}>
                  {" "}
                  / ${" "}
                  {infoPeriods?.salesLastYear.totalSales ||
                    0 - infoPeriods?.salesLastYear.totalPrice ||
                    0}
                </span>
              </Text>
            </Flex>
          </CardContainer>
        </Flex>
        <Flex gap="10px">
          <CardContainer direction="column" pd="20px" h="380px">
            <Text size="20px">Ventas última semana</Text>
            <BarChart
              data={weeklySales?.data || []}
              categories={weeklySales?.categories || []}
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
