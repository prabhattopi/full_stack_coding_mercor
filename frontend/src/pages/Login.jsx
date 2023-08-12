import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Text, 
  VStack 
} from "@chakra-ui/react";
import Logo from "../assets/Logo.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      margin="auto"
      className="fixed inset-0 flex flex-col items-center bg-gray-100"
      p={10}
    >
      <img src={Logo} alt="Logo" width="100px" height="100px" />
      <Box
        className="bg-white shadow-md rounded-md p-8 max-w-md w-full"
        p={6}
        maxW="md"
        w="full"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="email" fontWeight="medium">
                Email
              </FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" fontWeight="medium">
                Password
              </FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </FormControl>
            <Text color="gray.500" mb={4}>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </Text>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              rounded="md"
              _hover={{ bg: "blue.600" }}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
