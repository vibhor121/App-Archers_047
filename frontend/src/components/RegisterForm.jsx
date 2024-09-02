// src/components/RegisterForm.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        name,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGoogleRegister = () => {
    // Implement Google registration logic here
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
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {error && <Box color="red.500">{error}</Box>}
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormControl>
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
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
          <Button
            leftIcon={<FcGoogle />}
            variant="outline"
            colorScheme="blue"
            onClick={handleGoogleRegister}
          >
            Register with Google
          </Button>
          <Button type="button" colorScheme="blue" onClick={handleLoginClick}>
            Already Registered? Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
