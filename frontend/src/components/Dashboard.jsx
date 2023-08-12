import React from 'react'
import { Card,CardBody, CardFooter,Stack,Button,Heading,Divider,Text,ButtonGroup,HStack } from '@chakra-ui/react'
import {Link} from "react-router-dom"
import { useCopyToClipboard } from "usehooks-ts"
const Dashboard = () => {
    const [, copy] = useCopyToClipboard()
    const handleCopy = async (text) => {
          copy(text)
}
    return (
        <HStack alignItems="center" justifyContent="center" gap="30px" flexWrap="wrap" mt='6'>
 
      <Card maxW='sm'>
        <CardBody>
        
          <Stack mt='6' spacing='3'>
            <Heading size='md'>The Mercor Qestion</Heading>
            <Text fontWeight="bold">
              Total Response: <lable>30</lable>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
                <Link to="/dashboard/users">
                view users
                </Link>
            
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
        </HStack>

       
    )
}

export default Dashboard
