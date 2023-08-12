import React from 'react'
import { Card, CardBody, CardFooter, Stack, Button, Heading, Divider, Text, ButtonGroup, HStack } from '@chakra-ui/react'
import { Link} from "react-router-dom"
import { useCopyToClipboard } from "usehooks-ts"
import { BiCopy } from "react-icons/bi"
import { toast } from 'react-toastify';
import useForm from "../hooks/useForm"
const Dashboard = () => {
    const [, copy] = useCopyToClipboard()
    const { state } = useForm()

    const handleCopy = async (text) => {
        let url=window.location.origin+"/question/"+text
        console.log(url)
        copy(url)
        toast.success("copy successfull", {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar: false, // Hide the progress bar
        });
    }
    return (
        <HStack alignItems="center" justifyContent="center" gap="30px" flexWrap="wrap" mt='6'>
            {
                state.forms?.map(item => (
                    <Card maxW='sm' key={item._id}>
                        <CardBody>

                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{item.title}</Heading>
                                <Text fontWeight="bold">
                                    Total Response: <lable>{item.responses.length}</lable>
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='blue'>
                                    <Link to={`/dashboard/users/${item.uniqueLink}`}>
                                        view users
                </Link>

                                </Button>
                                <Button onClick={() => handleCopy(item.uniqueLink)} variant='solid' colorScheme='blue'>

                                    <BiCopy size={30} />


                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))
            }


        </HStack>


    )
}

export default Dashboard
