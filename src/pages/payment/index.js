//Components
import { Flex, Text } from "@/components";

//Externals
import { PaymentElement } from "@stripe/react-stripe-js";

const Payment = () => {
  return (
    <Flex bg="#c1c1c1" h="100vh">
      <Flex>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Flex>
    </Flex>
  );
};
export default Payment;
