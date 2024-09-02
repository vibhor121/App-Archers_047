import React from "react";
import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box maxW="2xl" mx="auto" mt={10}>
      <LoginForm />
    </Box>
  );
};

export default Login;
