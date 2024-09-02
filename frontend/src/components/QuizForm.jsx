import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  useColorModeValue,
  Heading,
  Text,
} from "@chakra-ui/react";

const QuizForm = ({ addQuiz }) => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""] },
  ]);
  const toast = useToast();

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", ""] }]);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      questions.some(
        (q) => !q.question.trim() || q.options.some((o) => !o.trim())
      )
    ) {
      toast({
        title: "Form Incomplete",
        description: "Please fill out all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newQuiz = { questions };
    addQuiz(newQuiz);

    toast({
      title: "Quiz Created",
      description: "Your quiz has been created successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setQuestions([{ question: "", options: ["", ""] }]);
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      borderRadius="md"
    >
      <Heading mb={6} textAlign="center">
        Create Quiz
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          {questions.map((q, qIndex) => (
            <Box key={qIndex} mt={4}>
              <FormControl id={`question-${qIndex}`} isRequired>
                <FormLabel>Question:</FormLabel>
                <Textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  placeholder="Enter question"
                  size="lg"
                  focusBorderColor="blue.500"
                  fontSize="xl" // Increased font size
                  mb={2} // Margin bottom for spacing
                />
              </FormControl>
              {q.options.map((option, oIndex) => (
                <FormControl key={oIndex} mt={2} isRequired>
                  <Text fontSize="lg" mb={1}>
                    Option {oIndex + 1}
                  </Text>
                  <Input
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Enter option ${oIndex + 1}`}
                    size="lg"
                    focusBorderColor="blue.500"
                  />
                </FormControl>
              ))}
              <Button
                mt={2}
                onClick={() => handleAddOption(qIndex)}
                colorScheme="blue"
                variant="outline"
              >
                Add Option
              </Button>
            </Box>
          ))}
          <Button
            mt={4}
            onClick={handleAddQuestion}
            colorScheme="blue"
            variant="outline"
          >
            Add Question
          </Button>
          <Button type="submit" colorScheme="blue" size="lg" mt={6} isFullWidth>
            Create Quiz
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default QuizForm;
