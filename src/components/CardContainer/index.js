import styled from "styled-components";

//Components
import { Flex } from "@/components";

const CardContainer = styled(Flex)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: ${({ pd }) => pd || "0px"};
`;
export default CardContainer;
