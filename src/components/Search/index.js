import { useState } from "react";

import { Flex, CustomInput } from "@/components";
//icons
import { SearchIcon } from "@/assets/icons";

//Redux
import { useSelector } from "react-redux";

const Search = ({ handleChange }) => {
  const { secondaryColor } = useSelector(({ theme }) => theme);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Flex
      w="300px"
      align="center"
      style={{
        border: isFocused ? `1px solid ${secondaryColor}` : "1px solid #5A6066",
        borderRadius: "0.25rem",
        paddingLeft: 5,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      color={"#5A6066"}
    >
      <SearchIcon size="20px" />
      <CustomInput
        onChange={handleChange}
        w="260px"
        placeholder="Buscar..."
        name="search"
        outlineColor={secondaryColor}
      />
    </Flex>
  );
};

export default Search;
