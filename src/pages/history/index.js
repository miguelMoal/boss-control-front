//
import { useState } from "react";

//components
import { Layout, Search, Flex, Text, HandleStatus } from "@/components";
//HOC
import { ProtectedRoute } from "@/HOC";
//Redux
import { useSelector } from "react-redux";
//Hooks
import { useForm, useModal } from "@/hooks";
import { useQuery } from "react-query";
//conections
import { historyApi } from "@/connections";
//Helpers
import { transformDate } from "@/helpers";
const History = () => {
  const { primaryColor, success } = useSelector((state) => state.theme);
  const { handleChange, formData } = useForm();
  const [page, setPage] = useState(5);
  const {
    data: histories,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["histories", page],
    queryFn: () => historyApi({ page, perPage: 10 }),
    keepPreviousData: true,
  });

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} />
      </Flex>
      <HandleStatus status={status} data={histories?.msg}>
        <Flex
          direction="column"
          bg="white"
          h="calc(100% - 70px)"
          pd="0px"
          style={{ overflowY: "auto" }}
          className="scroll"
        >
          {histories?.msg.map((history) => (
            <Flex
              key={history._id}
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
                  {transformDate(history.date)}
                </Text>
              </Flex>
              <Flex direction="column">
                {history.products?.map((prod) => (
                  <Flex justify="space-between" mt="15px">
                    <Text weight="bold" w="33.3%">
                      {prod?.productId?.name}
                    </Text>
                    <Text
                      weight="bold"
                      w="33.3%"
                      style={{ textAlign: "center" }}
                    >
                      Cantidad: {prod.quantity}
                    </Text>
                    <Text weight="bold" w="33.3%" style={{ textAlign: "end" }}>
                      $ {prod.amount}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(History);
