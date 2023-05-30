import { useState } from "react";
import { useSelector } from "react-redux";
import { FlexBetween } from "../Layout/elements";
import Text from "../Text";
import { BGModal, ModalBody, ModalContainer, ModalHead } from "./elements";

export default function Modal({
  children,
  title = null,
  isModalOpen = false,
  setIsModalOpen,
}) {
  const { primaryColor, background } = useSelector((state) => state.theme);

  return (
    isModalOpen && (
      <BGModal>
        <ModalContainer bg={background}>
          {title && (
            <ModalHead>
              <FlexBetween>
                <Text clave={title} color={primaryColor} type="title" />
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "0px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <Text clave="cancel" type="text" />
                </button>
              </FlexBetween>
            </ModalHead>
          )}
          <ModalBody>{children}</ModalBody>
        </ModalContainer>
      </BGModal>
    )
  );
}
