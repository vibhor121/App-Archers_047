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
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, EmailIcon } from "@chakra-ui/icons"; // Imported EmailIcon
import QuizForm from "../components/QuizForm";
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

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedSection, setSelectedSection] = useState("userQuizzes");

  useEffect(() => {
    // Load quizzes from local storage when the component mounts
    const savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(savedQuizzes);
  }, []);

  const saveQuizzesToLocalStorage = (quizzes) => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  };

  const addQuiz = (newQuiz) => {
    const color = getRandomColor();
    const updatedQuizzes = [...quizzes, { ...newQuiz, color: color }];
    console.log("Generated Color:", color); // Debug: Check generated color
    setQuizzes(updatedQuizzes);
    saveQuizzesToLocalStorage(updatedQuizzes);
    setSelectedSection("userQuizzes");
  };

  const deleteQuiz = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
    saveQuizzesToLocalStorage(updatedQuizzes);
  };

  const sendQuiz = (quiz) => {
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          to_email: "recipient@example.com", // Replace with recipient's email
          subject: "New Quiz Created",
          message: `Quiz Title: ${quiz.title}\nQuestions: ${quiz.questions.map(
            (q) => `${q.question} - ${q.options.join(", ")}`
          )}`,
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
      case "createQuiz":
        return <QuizForm addQuiz={addQuiz} />;
      default:
        return (
          <Flex wrap="wrap" gap={4} justify="center">
            {quizzes.length > 0 ? (
              quizzes.map((quiz, index) => (
                <Box
                  key={index}
                  p={4}
                  bg={quiz.color}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  flexBasis="calc(20% - 16px)" // Ensures 5 cards per row with gap
                  maxW="250px"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" mb={2}>
                      {quiz.title}
                    </Text>
                    <Flex>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuiz(index)}
                        mx={1}
                      />
                      <IconButton
                        icon={<EmailIcon />}
                        colorScheme="blue"
                        variant="solid"
                        size="sm"
                        onClick={() => sendQuiz(quiz)}
                        mx={1}
                      />
                    </Flex>
                  </Flex>
                  <VStack mt={2} align="start">
                    {quiz.questions.map((question, qIndex) => (
                      <Box key={qIndex} mb={4}>
                        <Text fontWeight="semibold">Question:</Text>
                        <Text>{question.question}</Text>
                        <RadioGroup>
                          {question.options.map((option, oIndex) => (
                            <Box key={oIndex} mb={2}>
                              <Radio value={option}>{option}</Radio>
                            </Box>
                          ))}
                        </RadioGroup>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              ))
            ) : (
              <Text>No quizzes available. Create a quiz to get started!</Text>
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
        width="250px" // Sidebar width
        bg={useColorModeValue("blue.700", "gray.800")} // Background color
        color="white" // Text color
        p={4} // Padding inside the sidebar
      >
        <VStack spacing={4} align="stretch">
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setSelectedSection("userQuizzes")}
          >
            User Quizzes
          </Button>
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setSelectedSection("createQuiz")}
          >
            Create Quiz
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

export default Quizzes;
