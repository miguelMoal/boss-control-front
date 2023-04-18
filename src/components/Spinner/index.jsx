//Elements
import { SpinnerContainer } from "./elements";

const Spinner = ({ size = "20", color, ml, mr, mt, mb }) => {
  return (
    <SpinnerContainer
      size={size}
      color={color}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
    />
  );
};
export default Spinner;
