import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
const CreateForm = () => {
  const [user, setUser] = useState('');
  const [loading,setLoading]=useState(false)
  const [description, setDescription] = useState('');
  const [questionArray,setQuestionArray]=useState([
    "what is your Name?",
    "How much you earn?"
  ])
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast({
      title: 'Item Submitted',
      description: 'Your item has been submitted successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const handleFilter=(item)=>{
      let array=questionArray.filter(e=>e!=item)
      setQuestionArray(array)
  }
  const handlePost=()=>{
    setQuestionArray([...questionArray,description])
    setDescription("")
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
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Box>
          {
              questionArray.map((items)=>(
                  <Box display="flex" alignItems="center" mt="10px" mb="10px" gap="20px" key={items}>
                      {items}
                      <Button size="sm" fontSize="10x" p={2} borderRadius="50%" backgroundColor="red.400" onClick={()=>handleFilter(items)}>X</Button>
                      </Box>
              ))

          }
          <Box mb="10px" mt="10px">
              <Box mb="10px">
              <label htmlFor="description" className="block w-20 text-sm font-medium">
              Type you question :
            </label>
            <Button
            size="sm"
            p={2}
         isDisabled={!description}
          backgroundColor={description ? 'blue.300' : 'gray'}
          onClick={handlePost}
          ml="30px"
        >
          Post Question
        </Button>
              </Box>
        
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                  setDescription(e.target.value)
                 
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
              isLoading={loading}
              loadingText="Submitting"
              isDisabled={loading}
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
