//components
import { Flex, Text, CustomButton, CustomInput } from "@/components";

const ModalRegister = () => {
  return (
    <Flex>
      <CustomInput
        placeholder="Nombre"
        border="1px solid gray"
        w="100%"
        name="name"
      />
      <CustomInput
        placeholder="CorreoElectronico"
        border="1px solid gray"
        w="100%"
        name="email"
      />
      <CustomInput
        placeholder="Contraseña"
        border="1px solid gray"
        w="100%"
        name="password"
      />
      <CustomInput
        placeholder="Repetir Contraseña"
        border="1px solid gray"
        w="100%"
        name="repeatpassword"
      />
      <CustomButton>Registrar</CustomButton>
    </Flex>
  );
};

export default ModalRegister;
