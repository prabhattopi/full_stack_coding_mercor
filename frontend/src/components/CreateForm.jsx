import React, { useState } from 'react';
import useForm from "../hooks/useForm"
import {CREATE_QUESTION,CREATE_TITLE,ADD_QUESTION,REMOVE_QUESTION} from "../context/formActionType"
import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {Link, useNavigate} from "react-router-dom"
const CreateForm = () => {
  const toast = useToast();
  const {state,dispatch,createForm}=useForm()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    await createForm()
  
  };
  const handleFilter=(item)=>{
     dispatch({type:REMOVE_QUESTION,payload:item})
  }
  const handlePost=()=>{
    dispatch({type:ADD_QUESTION,payload:state.question})
    dispatch({type:CREATE_QUESTION,payload:""})
    
  }
  return (
    <Box
      className="flex items-center justify-center my-5"
      maxW="screen-lg"
      w="90%"
      mx={{ base: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
      mt="30px"
      p={4}
      bg="white"
      shadow="md"
      rounded="lg"
      flexDirection="row"
      alignItems="flex-start"
    >
      <Box flex="1" pr={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Create Item
        </Text>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User */}
          <Box>
            <label htmlFor="user" className="block w-20 text-sm font-medium">
              Title
            </label>
            <Input
              type="text"
              id="user"
              value={state.title}
              onChange={(e) => dispatch({type:CREATE_TITLE,payload:e.target.value})}
            />
          </Box>
          {
              state.questionArray?.map((items)=>(
                  <Box display="flex" alignItems="center" mt="10px" mb="10px" gap="20px" key={items}>
                      {items}
                      <Button size="sm" fontSize="10x" p={2} borderRadius="50%" backgroundColor="red.400" onClick={()=>handleFilter(items)}>X</Button>
                      </Box>
              ))

          }
          <Box mb="10px" mt="10px">
              <Box mb="10px">
              <label htmlFor="description" className="block w-20 text-sm font-medium">
              Type your question :
            </label>
            <Button
            size="sm"
            p={2}
         isDisabled={!state.question}
          backgroundColor={state.question ? 'blue.300' : 'gray'}
          onClick={handlePost}
          ml="30px"
        >
          Add Question
        </Button>
              </Box>
        
            <Textarea
              id="description"
              value={state.question}
              onChange={(e) => {
                 dispatch({type:CREATE_QUESTION,payload:e.target.value})
                 
                }
              }
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Button
              type="submit"
              px={4}
              py={2}
              textTransform="uppercase"
              fontWeight="medium"
              rounded="md"
              colorScheme="blue"
              isLoading={state.loading}
              loadingText="Submitting"
              isDisabled={state.loading}
              mr={2}
              mt={4}
              
            >
              Submit
            </Button>
           
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateForm;
