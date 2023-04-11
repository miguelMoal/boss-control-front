import { Flex, CustomInput } from "@/components";
//icons
import { SearchIcon } from "@/assets/icons";

const Search = ({ handleChange }) => {
  return (
    <Flex bg="#ebebeb" w="300px" align="center">
      <SearchIcon />
      <CustomInput
        onChange={handleChange}
        w="260px"
        placeholder="Buscar..."
        name="search"
      />
    </Flex>
  );
};

export default Search;
