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
  ItemAnalitycs,
} from "@/components";

//Redux
import { useSelector } from "react-redux";

//Icons
import { DollarIcon, EarningsIcon, ObjectsIcon } from "@/assets/icons";

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
  const { btnPrimary, secondaryColor, btnWarning, error, btnSuccess, success } =
    useSelector((state) => state.theme);

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
      <Flex
        h="100vh"
        gap="10px"
        direction="column"
        style={{ overflowY: "auto", overflowX: "hidden" }}
        className="scroll"
      >
        <Flex gap="10pc">
          <CardContainer pd="20px">
            <Flex
              direction="column"
              gap="10px"
              xl={`flex-direction: row`}
              xxl={`flex-direction: row`}
              bigger={`flex-direction: row`}
            >
              <ItemAnalitycs
                textColor={"white"}
                title={"inverción total"}
                value={invest?.total}
                icon={<DollarIcon size="100%" />}
                bg={btnPrimary}
                iconBg={secondaryColor}
              />
              <ItemAnalitycs
                textColor={"white"}
                title={"Utilidad esperadas"}
                value={invest?.totalProfits}
                icon={<EarningsIcon size="100%" />}
                bg={btnWarning}
                iconBg={error}
              />
              <ItemAnalitycs
                textColor={"white"}
                title={"Variedad de productos"}
                value={totalProducts}
                icon={<ObjectsIcon size="100%" />}
                bg={btnSuccess}
                iconBg={success}
              />
            </Flex>
          </CardContainer>
        </Flex>
        <Flex gap="10px" direction="column">
          <Flex justify="center">
            <Text size="30px" weight="bold">
              Ventas
            </Text>
          </Flex>
          <Flex
            direction="column"
            xxl={`flex-direction: row`}
            bigger={`flex-direction: row`}
          >
            <Flex
              direction="column"
              xl={`flex-direction: row`}
              xxl={`flex-direction: row`}
              bigger={`flex-direction: row`}
            >
              <CardContainer
                align="center"
                h="100px"
                direction="column"
                pd="10px 15px"
              >
                <Text>
                  Hoy
                  <span style={{ size: "14px", color: success }}>
                    {" "}
                    / utilidad
                  </span>
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
              <CardContainer
                align="center"
                h="100px"
                direction="column"
                pd="10px 15px"
              >
                <Text>
                  Últimos 7 días
                  <span style={{ size: "14px", color: success }}>
                    {" "}
                    / utilidad
                  </span>
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
            </Flex>
            <Flex
              direction="column"
              xl={`flex-direction: row`}
              xxl={`flex-direction: row`}
              bigger={`flex-direction: row`}
            >
              <CardContainer
                align="center"
                h="100px"
                direction="column"
                pd="10px 15px"
              >
                <Text>
                  Últimos 30 días
                  <span style={{ size: "14px", color: success }}>
                    {" "}
                    / utilidad
                  </span>
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
              <CardContainer
                align="center"
                h="100px"
                direction="column"
                pd="10px 15px"
              >
                <Text>
                  Últimos 365 días
                  <span style={{ size: "14px", color: success }}>
                    {" "}
                    / utilidad
                  </span>
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
          </Flex>
        </Flex>
        <Flex
          gap="10px"
          direction="column"
          h="800px"
          xl={`flex-direction: row`}
          xxl={`flex-direction: row`}
          bigger={`flex-direction: row`}
          mb="10px"
        >
          <CardContainer
            direction="column"
            pd="20px"
            h="380px"
            align="center"
            xl={`width: 50%`}
            xxl={`width: 50%`}
            bigger={`width: 50%`}
            style={{ overflowX: "auto" }}
          >
            <Text size="20px">Ventas última semana</Text>
            <BarChart
              data={weeklySales?.data || []}
              categories={weeklySales?.categories || []}
              height={290}
            />
          </CardContainer>
          <CardContainer
            direction="column"
            pd="20px"
            align="center"
            xl={`width: 50%`}
            xxl={`width: 50%`}
            bigger={`width: 50%`}
          >
            <Flex direction="column" h="390px" w="100%">
              <Text size="20px">Productos más vendidos</Text>
              <Flex justify="center">
                <PieChart
                  data={top?.names || []}
                  series={top?.quantities || []}
                  height={310}
                />
              </Flex>
            </Flex>
          </CardContainer>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ProtectedRoute(Analytics);
