//react
import { useState } from "react";
//components
import { Flex, Text, CustomInput, Header, CustomButton } from "@/components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Redux
import { useSelector } from "react-redux";

const ModalGoal = () => {
  const { primaryColor, error } = useSelector((state) => state.theme);

  const [startDate, setStartDate] = useState(new Date());

  const CustomDatePickerInput = ({ value, onClick }) => (
    <Flex w="fit-content">
      <CustomButton
        bg={primaryColor}
        color="white"
        className="custom-datepicker-input"
        onClick={onClick}
      >
        {value}
      </CustomButton>
    </Flex>
  );

  return (
    <Flex direction="column">
      <Header>
        <Text color="white" size="20px">
          Meta
        </Text>
      </Header>

      <Flex pd="10px" direction="column">
        <CustomInput
          w="100%"
          placeholder="Nombre de la Meta"
          border="1px solid gray"
          name="name"
        />
        <Flex>
          <CustomInput
            w="50%"
            placeholder="ngcngc"
            border="1px solid gray"
            name="name"
          />
        </Flex>
        <Flex mt="20px">
          <Flex direction="column">
            <Text color={primaryColor} mb="5px" size="13px">
              Fecha Inicial
            </Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomDatePickerInput />}
            />
          </Flex>
          <Flex direction="column">
            <Text color={primaryColor} mb="5px" size="13px">
              Fecha Final
            </Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomDatePickerInput />}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ModalGoal;
