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
              To use the <strong>{message}</strong> feature, you need to upgrade to the <strong>ActivePro</strong> plan!
            </p>
            <p>
              The <strong>ActivePro</strong> plan unlocks powerful learning tools that help you improve your English faster:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Detailed feedback and suggestions for your writing</li>
              <li>Unlimited access to exercises and learning resources</li>
              <li>Track your learning progress over time</li>
              <li>Customize your learning experience to match your level and goals</li>
            </ul>
            <p className="mt-4">
              You can try a demo payment at:{" "}
              <strong className="hover:text-primary text-blue-700">
                <a href="https://sandbox.vnpayment.vn/apis/vnpay-demo/" target="_blank" rel="noopener noreferrer">
                  https://sandbox.vnpayment.vn/apis/vnpay-demo/
                </a>
              </strong>
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