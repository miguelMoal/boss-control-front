import { useState } from "react";

//elements
import {
  DropdownContainer,
  DropdownButton,
  DropdownContent,
  DropdownItem,
} from "./elements";

//Components
import { Text, Flex } from "@/components";

const DropDown = ({ title, options, handleActions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer tabIndex={0} onBlur={() => setIsOpen(false)}>
      <DropdownButton onClick={toggleDropdown}>
        <Flex gap="15px">
          <Text color="white">{title}</Text>
          <Text
            color="white"
            weight="bold"
            style={{ transform: "rotate(90deg)" }}
          >
            {`>`}
          </Text>
        </Flex>
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {options.map((opt) => (
          <DropdownItem onClick={(e) => handleActions(e, opt.value)}>
            {opt.name}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};
export default DropDown;
