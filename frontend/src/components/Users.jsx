import React,{useEffect,useState} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td,Button } from "@chakra-ui/react";
import useForm from "../hooks/useForm"
import {useParams} from "react-router-dom"
import {RESET_SINGLE_FORM} from "../context/formActionType"
const Users = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { uniqueLink } = useParams()
    const { handleSingleForm, dispatch, state } = useForm()
    const [answerData,setAnswerData]=useState([])


    useEffect(() => {
        let isCurrent = true
        if (isCurrent) {
            handleSingleForm(uniqueLink)
        }

        return () => {
            isCurrent = false
            dispatch({ type: RESET_SINGLE_FORM })
        }
    }, [uniqueLink])

    const openModal = (qa) => {
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      
      };
    return (
        <>
        <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Response</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.singleForm.responses?.map((data, index) => (
            <Tr key={data.userId}>
              <Td>{data.useremail}</Td>
              <Td><Button onClick={()=>{
                  setIsOpen(true)
                  let answersData=data.answers?.filter(e=>e.answer)
                  setAnswerData(answersData)
            
                  }}>Responses</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {
          isOpen&&<Modal isOpen={isOpen} onClose={closeModal} size="xl">
          <ModalOverlay />
          <ModalContent>
           {
               state.singleForm?.questions.map((item,index)=>(
                   <>
                <ModalBody>Question {index+1}: {state.singleForm.questions[index]} ?</ModalBody>
                <ModalCloseButton />
                <ModalBody>
                  <p>Answer: {answerData[index].answer}</p>
                </ModalBody>
                </>
               ))

           }
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
      </>
    )
}

export default Users
