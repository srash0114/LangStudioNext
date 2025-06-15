import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { handleSubmit } from "@/fetch-data";

interface ActiveProReminderPopupProps {
    message?: string;
}

const ActiveProReminderPopup: React.FC<ActiveProReminderPopupProps> = ({
    message = "Essay Checker",
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            ActivePro Required
          </ModalHeader>
          <ModalBody>
            <p>
              To use the <strong>{message}</strong> feature, you need to subscribe to <strong>ActivePro</strong>!
            </p>
            <p>
              The ActivePro plan allows you to unlock advanced features, including the ability to customize the interface with your brand&apos;s colors.
            </p>
            <p>
              Use this link for demo pay: <strong className="hover:text-primary text-blue-700"><a color="primary" href="https://sandbox.vnpayment.vn/apis/vnpay-demo/">https://sandbox.vnpayment.vn/apis/vnpay-demo/</a></strong>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button className="absolute left-6" color="danger" variant="light" onClick={closeModal}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={() => { handleSubmit(); }}
            >
              Subscribe to ActivePro
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ActiveProReminderPopup;