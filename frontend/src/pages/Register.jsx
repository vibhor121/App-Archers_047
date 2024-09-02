import React from "react";
import { Box } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <Box maxW="2xl" mx="auto" mt={10}>
      <RegisterForm />
    </Box>
  );
};

export default Register;
