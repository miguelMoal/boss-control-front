import { Flex, Text, CustomButton } from "@/components";

//icons
import { RemoveIcon } from "@/assets/icons";

//conections
import { deleteProductApi } from "@/connections";

//externals
import { useMutation, useQueryClient } from "react-query";

const ItemProduct = ({ product }) => {
  const { mutate: deleteProduct } = useMutation(deleteProductApi);

  const queryClient = useQueryClient();

  const handleDelete = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    });
  };

  return (
    <Flex
      mt="5px"
      align="center"
      h="55px"
      style={{ borderBottom: "1px solid gray" }}
    >
      <Flex w="10px" h="100%" bg="green" mr="5px"></Flex>
      <Text w="15%">{product.name}</Text>
      <Text w="15%">{product.brand}</Text>
      <Text w="15%">{product.available}</Text>
      <Text w="20%">{product.priceSale}</Text>
      <Flex w="35%">
        <CustomButton bg="red" color="white">
          Sin stock
        </CustomButton>
        <CustomButton borderColor="green" ml="10px">
          Vender
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
