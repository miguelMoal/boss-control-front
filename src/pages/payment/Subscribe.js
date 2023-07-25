//Components
import {
  Flex,
  Text,
  InfoConditions,
  CustomButton,
  Spinner,
  CustomInput,
} from "@/components";

//Externals
import { CardElement } from "@stripe/react-stripe-js";

//Redux
import { useSelector } from "react-redux";

const Subscribe = ({
  updateError,
  handleChange,
  formData,
  errorTregetName,
  error,
  toggleCheck,
  handleSubmit,
  checked,
  processing,
}) => {
  const { name } = useSelector(({ infoUser }) => infoUser);
  const { primaryColor, secondaryColor } = useSelector(({ theme }) => theme);

  return (
    <Flex
      w="400px"
      h="600px"
      pd="20px"
      style={{ boxShadow: "2px 2px 10px #d1d1d1" }}
      direction="column"
      align="center"
      sm={`width: 90vw`}
    >
      <Flex direction="column" align="center" h="20%">
        <Text size="20px" weight="bold" color="#1C1C1C">
          BOSS-CONTROL
        </Text>
        <Text size="12px" color="#9E9E9E">
          Subscribete a BOSS-CONTROL
        </Text>
        <Text mt="30px" size="25pxpx" color="#1c1c1c">
          129.00 MXN <span style={{ color: "#929292" }}> / MES</span>
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        <Text size="20px" color="#1C1C1C" mb="20px">
          {name || "Cliente"}
        </Text>
        <Flex direction="column">
          <Text size="20px" color="#1C1C1C" mb="10px">
            Datos de tarjeta
          </Text>
          <form
            style={{
              width: "100%",
            }}
          >
            <Flex gap="10px" mb="15px">
              <Flex direction="column">
                <CustomInput
                  placeholder="Nombre de la tarjeta..."
                  border="1px solid #d1d1d1"
                  w="100%"
                  mb="10px"
                  color="#1c1c1c"
                  onChange={handleChange}
                  name="targetName"
                  value={formData?.targetName || ""}
                />
                {errorTregetName && (
                  <Text size="12px" color={"red"}>
                    El nombre es requerido..
                  </Text>
                )}
              </Flex>
              <CustomInput
                placeholder="Email..."
                border="1px solid #d1d1d1"
                w="100%"
                mb="10px"
                name="email"
                onChange={handleChange}
                value={formData?.email || ""}
                color="#1c1c1c"
                disabled
              />
            </Flex>
            <div
              style={{
                border: "1px solid #d1d1d1",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <CardElement
                onChange={(event) => {
                  updateError(event.error ? event.error.message : null);
                }}
              />
            </div>
            {error && (
              <div style={{ fontSize: "12px", color: "red", marginTop: "5px" }}>
                {error}
              </div>
            )}
            <Flex mt="25px" w="300px">
              <InfoConditions
                toggleCheck={toggleCheck}
                checked={checked}
                colorText={primaryColor}
              />
            </Flex>
            <Flex mt="55px" justify="center">
              <CustomButton
                pd="10px 50px"
                bg={checked ? secondaryColor : "#B3B1B1"}
                onClick={handleSubmit}
              >
                {processing && <Spinner mr="15px" color="white" />}
                <Text>Subscribirme</Text>
              </CustomButton>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Subscribe;
