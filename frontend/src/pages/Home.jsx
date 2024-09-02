import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Link,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../Footer";
import { Accordion } from "../Accordian";
import CardCarousel from "../pages/Caraousal";
import img from "../assets/graph.jpg";

const Home = () => {
  return (
    <>
      <Box p={4}>
        <Box
          mt={"70px"}
          w={{ base: "100%", md: "1400px" }}
          mx="auto"
          borderRadius="24px"
          textAlign="center"
          backgroundImage="url('https://png.pngtree.com/thumb_back/fh260/background/20211118/pngtree-financial-technology-data-graph-image_908912.jpg')"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          height={{ base: "60vh", md: "40vh" }}
          p={4}
        >
          <Box color="white">
            <Heading fontSize={{ base: "2xl", md: "4xl" }}>
              The easiest way to make your meetings interactive
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} mt={4}>
              Engage your participants with live polls, Q&A, quizzes and word
              clouds — whether you meet in the office, online or in-between.
            </Text>
            <Button mt={4} bg="gray.500">
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      <Accordion />

      <Box p={4} mt="0px" ml="-270px">
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {features.map((feature, index) => (
            <GridItem
              key={index}
              p={4}
              borderRadius="lg"
              boxShadow="md"
              bg="white"
              backgroundColor="#faf7f0"
              _hover={{
                boxShadow: "xl",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Link as={RouterLink} to={feature.link}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  borderRadius="md"
                />
                <Text fontSize="lg" fontWeight="bold" mt={4}>
                  {feature.title}
                </Text>
                <Text mt={2} fontSize="sm" color="gray.600">
                  {feature.description}
                </Text>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <CardCarousel />

      {/* Container for full-width image */}
      <Box width="100%" mt={4} mb={4}>
        <Image src={img} alt="see" objectFit="cover" width="100%" />
      </Box>

      <Footer />
    </>
  );
};

const features = [
  {
    title: "Intuitive and Easy",
    description:
      "The attendees can join without any logins or downloads, and the setup for hosts takes only minutes.",
    image:
      "https://www.slido.com/static/slido-ico-intuitive-and-easy.8e57ab53.svg",
    link: "/intuitive-and-easy",
  },
  {
    title: "5+ Polling Options",
    description:
      "With Slido's 5 types of polls, Q&A, quizzes and surveys, you can engage your participants in a variety of ways.",
    image:
      "https://www.slido.com/static/slido-ico-5-polling-options.d9f3c44e.svg",
    link: "/5+-polling-options",
  },
  {
    title: "Get Started for Free",
    description:
      "Start with our forever-free Basic plan, or get more from Slido for only US$12.5 per month.",
    image:
      "https://www.slido.com/static/slido-ico-get-started-for-free.6aa69787.svg",
    link: "/get-started-for-free",
  },
];

export default Home;
