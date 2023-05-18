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
  ItemHistory,
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

  const historiesSearch = histories?.msg.filter((p) =>
    p.date?.includes(formData?.search || "")
  );

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
          {historiesSearch?.map((history, index) => (
            <ItemHistory history={history} key={history.date + index} />
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
