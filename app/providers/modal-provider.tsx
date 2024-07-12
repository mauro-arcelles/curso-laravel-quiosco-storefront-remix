import { FC } from "react";
import Modal from "react-modal";
import ModalProducto from "~/components/modal-producto";
import { useQuiosco } from "~/hooks/useQuiosco";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ModalProvider: FC = () => {
  const { modal } = useQuiosco();

  return (
    <Modal isOpen={modal} style={customStyles}>
      <ModalProducto />
    </Modal>
  );
};

export default ModalProvider;
