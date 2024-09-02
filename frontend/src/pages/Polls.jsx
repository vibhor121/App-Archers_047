import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  IconButton,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { DeleteIcon, EmailIcon } from "@chakra-ui/icons";
import PollForm from "../components/PollForm";
import emailjs from "emailjs-com"; // Import emailjs for sending emails

// Function to get a random color from the colors array
const getRandomColor = () => {
  const colors = [
    "red.200",
    "green.200",
    "blue.200",
    "yellow.200",
    "purple.200",
    "pink.200",
    "orange.200",
    "teal.200",
    "cyan.200",
    "gray.200",
    "indigo.200",
    "lime.200",
    "amber.200",
    "emerald.200",
    "rose.200",
    "fuchsia.200",
    "violet.200",
    "sky.200",
    "slate.200",
    "warmGray.200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedSection, setSelectedSection] = useState("userPolls");

  useEffect(() => {
    // Load polls from local storage when the component mounts
    const savedPolls = JSON.parse(localStorage.getItem("polls")) || [];
    setPolls(savedPolls);
  }, []);

  const savePollsToLocalStorage = (polls) => {
    localStorage.setItem("polls", JSON.stringify(polls));
  };

  const addPoll = (newPoll) => {
    const updatedPolls = [...polls, { ...newPoll, color: getRandomColor() }];
    setPolls(updatedPolls);
    savePollsToLocalStorage(updatedPolls);
    setSelectedSection("userPolls");
  };

  const deletePoll = (index) => {
    const updatedPolls = polls.filter((_, i) => i !== index);
    setPolls(updatedPolls);
    savePollsToLocalStorage(updatedPolls);
  };

  const sendPoll = (poll) => {
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          to_email: "recipient@example.com", // Replace with recipient's email
          subject: "New Poll Created",
          message: `Poll Question: ${
            poll.question
          }\nOptions: ${poll.options.join(", ")}`,
        },
        "YOUR_USER_ID"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "createPoll":
        return <PollForm addPoll={addPoll} />;
      default:
        return (
          <Flex wrap="wrap" gap={4} justify="center">
            {polls.length > 0 ? (
              polls.map((poll, index) => (
                <Box
                  key={index}
                  p={4}
                  bg={poll.color}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  flexBasis="calc(20% - 16px)" // Ensures 5 cards per row with gap
                  maxW="200px"
                >
                  {/* Icon Buttons at the Top */}
                  <Flex justify="flex-end">
                    <IconButton
                      icon={<DeleteIcon boxSize={5} />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePoll(index)}
                      p={2} // Add padding
                      m={1} // Add margin
                      aria-label="Delete Poll"
                    />
                    <IconButton
                      icon={<EmailIcon boxSize={5} />}
                      colorScheme="blue"
                      variant="ghost"
                      size="sm"
                      onClick={() => sendPoll(poll)}
                      p={2} // Add padding
                      m={1} // Add margin
                      aria-label="Send Poll via Email"
                    />
                  </Flex>

                  {/* Poll Content */}
                  <Flex
                    direction="column"
                    justify="space-between"
                    align="start"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      {poll.question}
                    </Text>
                    <RadioGroup>
                      <VStack align="start" spacing={2}>
                        {poll.options.map((option, idx) => (
                          <Radio key={idx} value={option}>
                            {option}
                          </Radio>
                        ))}
                      </VStack>
                    </RadioGroup>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No polls available. Create a poll to get started!</Text>
            )}
          </Flex>
        );
    }
  };

  return (
    <Flex>
      {/* Sidebar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        height="100vh" // Full height of the viewport
        width="250px" // Sidebar width to match quizzes
        bg="blue.700" // Background color
        color="white" // Text color
        p={4} // Padding inside the sidebar
      >
        <VStack spacing={4} align="stretch">
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setSelectedSection("userPolls")}
          >
            User Polls
          </Button>
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setSelectedSection("createPoll")}
          >
            Create Poll
          </Button>
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setSelectedSection("analytics")}
          >
            Analytics
          </Button>
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setSelectedSection("tutorial")}
          >
            Tutorial
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" ml="250px" p={6} mt={10}>
        {renderContent()}
      </Box>
    </Flex>
  );
};

export default Polls;
