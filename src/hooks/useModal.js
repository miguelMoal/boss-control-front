import { useState } from "react";
import { Modal } from "@/components";

function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  const ModalWrapper = () => {
    if (!modalOpen) {
      return null;
    }

    return <Modal isModalOpen={true}>{modalContent}</Modal>;
  };

  return { showModal, closeModal, ModalWrapper };
}

export default useModal;
