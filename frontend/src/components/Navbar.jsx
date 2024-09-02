import React from "react";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import img from "../assets/Logo-removebg-preview.png";

const Navbar = () => {
  return (
    <Box
      bg="primary"
      px={4}
      position="sticky"
      top={0}
      zIndex={1000}
      width="100%"
      height="80px"
    >
      <Flex h="full" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" ml={4}>
          <Image
            src={img}
            alt="Logo"
            boxSize="60px" // Set the height and width of the image
            objectFit="cover"
            mr={1} // Space between image and text
          />
          <Box color="white" fontSize="xl">
            <h4>PentaPolling</h4>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <RouterLink to="/polls">
            <Button variant="link" color="white" mr={4} px={2}>
              Polls
            </Button>
          </RouterLink>
          <RouterLink to="/quizzes">
            <Button variant="link" color="white" mr={4} px={2}>
              Quizzes
            </Button>
          </RouterLink>
          <RouterLink to="/login">
            <Button variant="link" color="white" mr={4} px={2}>
              Login
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button variant="link" color="white" px={2}>
              Register
            </Button>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
