//components
import { Text, Flex, CustomButton, CustomInput } from "@/components";

import { useState } from "react";

const ModalEditProduct = () => {
  const [section, setSection] = useState("datos");

  return (
    <Flex direction="column">
      <Flex gap="20px">
        <Text onClick={() => setSection("datos")}>Datos del producto</Text>
        <Text onClick={() => setSection("añadir")}>Añadir al stock</Text>
      </Flex>
      <Flex>
        {section == "datos" ? <Text>Datos</Text> : <Text>Anadir</Text>}
      </Flex>
    </Flex>
  );
};

export default ModalEditProduct;
