//react
import { useState } from "react";
//HOC
import { ProtectedRoute } from "@/HOC";
//Redux
import { useSelector } from "react-redux";
//components
import {
  Layout,
  Flex,
  Text,
  HandleStatus,
  Search,
  CustomButton,
  ItemTicket,
  ModalSaleProduct,
  ModalErrorSale,
  ModalTicket,
  TableProductSale,
} from "@/components";
//conections
import { getProductsApi } from "@/connections";
//Hooks
import { useForm, useModal } from "@/hooks";
//externals
import { useQuery } from "react-query";

//Icons
import { AddIcon, StopIcon } from "@/assets/icons";

const headerProductsTicket = [
  { name: "ELIM", id: 1, space: "45px", direction: "flex-start" },
  { name: "CANT", id: 2, space: "65px", direction: "flex-start" },
  { name: "DESCRIPCION", id: 3, space: "40%", direction: "flex-start" },
  { name: "PRECIO", id: 4, space: "25%", direction: "flex-end" },
  { name: "IMPORTE", id: 5, space: "25%", direction: "flex-end" },
];

const Sales = () => {
  const [ticket, setTicket] = useState([]);
  const {
    primaryColor,
    success,
    btnSuccess,
    tertiaryColor,
    error,
    btnDefault,
  } = useSelector((state) => state.theme);
  const { data: products, status } = useQuery(["products"], getProductsApi);
  const { handleChange, formData } = useForm();
  const { showModal, closeModal, ModalWrapper } = useModal();

  const productsFiltered = products?.filter((p) =>
    p.name.toLowerCase()?.includes(formData?.search?.toLowerCase() || "")
  );

  const deleteProductTicket = (product) => {
    const newData = ticket.filter((p) => p._id != product._id);
    setTicket(newData);
  };

  const handleAddToTicket = (product) => {
    const exist = ticket.some((p) => p._id == product._id);
    if (exist) {
      const newTicket = ticket.map((p) => {
        if (p._id == product._id) {
          return { ...p, toSale: Number(p.toSale) + 1 };
        } else {
          return p;
        }
      });
      setTicket(newTicket);
    } else {
      setTicket([...ticket, { ...product, toSale: 1 }]);
    }
  };

  const updateToSale = (id, value) => {
    const newTicket = ticket.map((tick) => {
      if (tick._id === id) {
        return { ...tick, toSale: value };
      } else {
        return tick;
      }
    });
    setTicket(newTicket);
  };

  const getTicketTotal = () => {
    let result = 0;
    ticket.forEach((ti) => {
      result = result + Number(ti.priceSale) * Number(ti.toSale);
    });
    return result;
  };

  const makeSale = () => {
    if (ticket.length > 0) {
      const validNumber = ticket.every((p) => p.toSale > 0);
      if (validNumber) {
        showModal(
          <ModalSaleProduct
            closeModal={closeModal}
            total={getTicketTotal()}
            ticket={ticket}
            cleanTicket={cleanTicket}
          />
        );
      } else {
        showModal(<ModalErrorSale closeModal={closeModal} />);
      }
    }
  };

  const showModalTicket = () => {
    if (ticket.length > 0) {
      const validNumber = ticket.every((p) => p.toSale > 0);
      if (validNumber) {
        showModal(
          <ModalTicket
            closeModal={closeModal}
            ticket={ticket}
            deleteProductTicket={deleteProductTicket}
            updateToSale={updateToSale}
            cleanTicket={cleanTicket}
          />
        );
      } else {
        showModal(<ModalErrorSale closeModal={closeModal} />);
      }
    }
  };

  const cleanTicket = () => {
    setTicket([]);
  };

  return (
    <Layout>
      <ModalWrapper />
      <Flex align="center" justify="space-between" mb="15px" h="40px">
        <Search handleChange={handleChange} />
        <CustomButton
          bg={ticket.length > 0 ? btnSuccess : btnDefault}
          onClick={() => showModalTicket()}
          xxl={`display: none`}
        >
          <Text>Vender</Text>
        </CustomButton>
      </Flex>
      <Text mb="10px" xxl={`display: none`}>
        {ticket.length > 0
          ? `En ticket / ${ticket.length}`
          : "No hay productos en el ticket"}
      </Text>
      <HandleStatus status={status} data={productsFiltered}>
        <Flex gap="10px" sm={`width: 100%`}>
          <TableProductSale
            productsFiltered={productsFiltered}
            handleAddToTicket={handleAddToTicket}
          />
          <Flex
            w="40%"
            direction="column"
            bg={tertiaryColor}
            display="none"
            xxl={`display: flex`}
          >
            <Flex
              pd="10px"
              align="center"
              h="60px"
              shadow={`0px 4px 8px ${tertiaryColor}`}
              bg={primaryColor}
              style={{ borderRadius: "5px" }}
            >
              <Text color="white" weight="bold">
                Ticket
              </Text>
            </Flex>
            <Flex pd="10px" mt="10px">
              {headerProductsTicket.map((head, index) => (
                <Flex
                  key={head.name + index}
                  justify={head.direction}
                  w={head.space}
                >
                  <Text size="12px">{head.name}</Text>
                </Flex>
              ))}
            </Flex>
            <Flex
              pd="10px"
              className="scroll"
              direction="column"
              h="calc(100vh - 380px)"
              style={{ overflowY: "auto" }}
              xxl={`height: calc(100vh - 360px)`}
              w="450px"
            >
              {ticket.map((product) => (
                <ItemTicket
                  deleteProductTicket={deleteProductTicket}
                  product={product}
                  updateToSale={updateToSale}
                />
              ))}
            </Flex>
            <Flex
              gap="10px"
              align="end"
              direction="column"
              justify="center"
              h="100px"
              pd="10px"
            >
              <Text weight="bold" size="25px">
                Total:$ {getTicketTotal()}
              </Text>
              <CustomButton
                color="white"
                bg={btnSuccess}
                onClick={() => makeSale()}
              >
                Vender
              </CustomButton>
            </Flex>
          </Flex>
        </Flex>
      </HandleStatus>
    </Layout>
  );
};

export default ProtectedRoute(Sales);
