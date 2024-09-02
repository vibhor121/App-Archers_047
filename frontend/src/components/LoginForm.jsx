import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc"; // Import Google icon for button

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement login logic here
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      shadow="lg"
      bg={useColorModeValue("white", "gray.700")}
    >
      <Heading mb={6} size="lg">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          <Button variant="outline" colorScheme="blue">
            Forgot Password
          </Button>
          <Button
            leftIcon={<FcGoogle />}
            variant="outline"
            colorScheme="blue"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
