import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const qaData = [
  {
    question: "Question 1",
    answer: "Answer 1",
  },
  {
    question: "Question 2",
    answer: "Answer 2",
  },
  {
    question: "Question 3",
    answer: "Answer 3",
  },
  {
    question: "Question 4",
    answer: "Answer 4",
  },
  {
    question: "Question 5",
    answer: "Answer 5",
  },
];

const ResponseModal=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQA, setCurrentQA] = useState({ question: "", answer: "" });

  const openModal = (qa) => {
    setCurrentQA(qa);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentQA({ question: "", answer: "" });
  };

  return (
    <div>
      <Button onClick={() => openModal(qaData[0])}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentQA.question}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{currentQA.answer}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ResponseModal;
