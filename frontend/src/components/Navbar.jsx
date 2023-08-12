import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react';
import useAuth from "../hooks/useAuth"
const Navbar = () => {
    const {logout}=useAuth()
    return (
        <Box
      position="sticky"
      top={0}
      zIndex="sticky"
      backgroundColor="gray.800"
      p={4}
      display="flex" 
      justifyContent="space-between"
      alignItems="center"
      px={4}

    >
     <Text color="white" fontWeight="bold" fontSize="35px">Mercor Form</Text>
     <Button onClick={()=>logout()}>Logout</Button>
    </Box>
    )
}

export default Navbar
