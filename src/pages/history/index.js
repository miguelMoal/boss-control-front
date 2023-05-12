//
import { useState, useRef, useEffect } from "react";

//components
import {
  Layout,
  Search,
  Flex,
  Text,
  HandleStatus,
  CustomButton,
  Spinner,
} from "@/components";
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

  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data: histories, status } = useQuery({
    queryKey: ["histories", page],
    queryFn: () => historyApi({ page, perPage: 10 }),
    keepPreviousData: true,
  });

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (
        container &&
        container.scrollTop + container.clientHeight >= container.scrollHeight
      ) {
        loadMoreHistories();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", onScroll);
      }
    };
  }, [histories, isFetchingMore]);

  const loadMoreHistories = () => {
    setIsFetchingMore(true);
    queryClient.fetchMore({
      queryKey: ["histories", page + 1],
      queryFn: () => historyApi({ page: page + 1, perPage: 10 }),
      keepPreviousData: true,
      onSuccess: (newData) => {
        setIsFetchingMore(false);
        setPage(page + 1);
      },
    });
  };

  const containerRef = useRef(null);

  const handleLessPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePlusPage = () => {
    if (page < histories?.totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} />
      </Flex>
      <HandleStatus status={status} data={histories?.msg}>
        <Flex
          direction="column"
          h="calc(100% - 100px)"
          pd="0px"
          style={{ overflowY: "auto" }}
          className="scroll"
        >
          {histories?.msg.map((history, index) => (
            <>
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
                      <Text
                        weight="bold"
                        w="33.3%"
                        style={{ textAlign: "end" }}
                      >
                        $ {prod.amount}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              {index === histories.msg.length - 1 && isFetchingMore && (
                <Spinner size="lg" color={success} />
              )}
            </>
          ))}
        </Flex>
        <Flex justify="flex-end" mt="10px">
          <Flex gap="15px" w="fit-content">
            <CustomButton bg={primaryColor} onClick={() => handleLessPage()}>
              <Text color="white">{`<`}</Text>
            </CustomButton>
            <Flex w="fit-content" align="center" h="40px">
              <Text>
                Página {histories?.currentPage} de {histories?.totalPages}
              </Text>
            </Flex>
            <CustomButton bg={primaryColor} onClick={() => handlePlusPage()}>
              <Text color="white">{`>`}</Text>
            </CustomButton>
          </Flex>
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(History);
