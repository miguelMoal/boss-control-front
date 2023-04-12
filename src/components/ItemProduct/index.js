import {
  Flex,
  Text,
  CustomButton,
  ModalAddProduct,
  ModalEditProduct,
} from "@/components";

//icons
import { RemoveIcon } from "@/assets/icons";

//conections
import { deleteProductApi } from "@/connections";

//externals
import { useMutation, useQueryClient } from "react-query";

//redux
import { useSelector } from "react-redux";

//hooks
import { useModal } from "@/hooks";

const ItemProduct = ({ product }) => {
  const { mutate: deleteProduct } = useMutation(deleteProductApi);

  const { success, error, warning } = useSelector((store) => store.theme);

  const queryClient = useQueryClient();

  const productAvailable = Number(product.available);

  const { showModal, closeModal, ModalWrapper } = useModal();

  const handleDelete = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    });
  };

  const handleColorBar = () => {
    const halfPreference = Number(product.preferenceInStock) / 2;
    if (productAvailable > halfPreference) {
      return success;
    } else if (productAvailable > 0) {
      return warning;
    } else {
      return error;
    }
  };

  const handleButtons = () => {
    if (productAvailable == 0) {
      return (
        <CustomButton bg={error} color="white">
          Sin stock
        </CustomButton>
      );
    } else {
      return <CustomButton borderColor={success}>Vender</CustomButton>;
    }
  };

  const handleEditProduct = () => {
    showModal(<ModalEditProduct closeModal={closeModal} />);
  };

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: "1px solid gray", minHeight: "55px" }}
    >
      <ModalWrapper />
      <Flex w="10px" h="100%" bg={handleColorBar()} mr="5px"></Flex>
      <Text w="15%">{product.name}</Text>
      <Text w="15%">{product.brand}</Text>
      <Text w="15%">{product.available}</Text>
      <Text w="20%">{product.priceSale}</Text>
      <Flex w="35%">
        {handleButtons()}
        <CustomButton
          borderColor={warning}
          ml="10px"
          onClick={() => handleEditProduct()}
        >
          Editar
        </CustomButton>
        <CustomButton
          ml="10px"
          pd="0px"
          onClick={() => handleDelete(product._id)}
        >
          <RemoveIcon />
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default ItemProduct;
