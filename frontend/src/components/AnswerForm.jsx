import React from 'react'
import { Card, CardHeader, CardBody, CardFooter,Heading,Stack,StackDivider,Box,Text,Input,Button } from '@chakra-ui/react'
const AnswerForm = () => {
    const handleChange=()=>{

    }

    return (
<Card mx="30px" my="40px" px="20px">
  <CardHeader>
    <Heading size='md'>The Mercor Question</Heading>
  </CardHeader>

  <CardBody>
      <form >
    <Stack spacing='8'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Q1. What is your name?
        </Heading>
        <Input
        value=""
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
        border="none"
        borderBottom="1px"
        outline="none"
    
      />
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Q1. What is your name?
        </Heading>
        <Input
        value=""
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
        border="none"
        borderBottom="1px"
        outline="none"
    
      />
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Q1. What is your name?
        </Heading>
        <Input
        value=""
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
        border="none"
        borderBottom="1px"
        outline="none"
    
      />
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Q1. What is your name?
        </Heading>
        <Input
        value=""
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
        border="none"
        borderBottom="1px"
        outline="none"
    
      />
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Q1. What is your name?
        </Heading>
        <Input
        value=""
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
        border="none"
        borderBottom="1px"
        outline="none"
    
      />
      </Box>
    </Stack>
    <Button type="submit" sizes="sm" mt="20px" backgroundColor="blue.600" color="white">Submit</Button>
    </form>
  </CardBody>
</Card>
    )
}

export default AnswerForm
