import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
const ElementData = [
    {
        id: 1,
        title: "Dashboard",
        to: "/dashboard"
    },
    {
        id: 2,
        title: "Create Form",
        to: "/form"
    }
]
const Home = () => {

    return (
        <VStack gap="20px" mt="45px">
            {
                ElementData.map(item => (
                    <Box key={item.id} backgroundColor="blue.800" textAlign="center" px="20px" py="15px" borderRadius="5px" fontSize="18px" textColor="white">
                        <Link to={item.to}>
                          {item.title}
        </Link>
                    </Box>
                ))
            }




        </VStack>
    )
}

export default Home
