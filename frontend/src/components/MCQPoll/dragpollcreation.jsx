import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "../login-signup/api"; // Ensure this path is correct

const CreatePollDrag = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      useSlider: true,
      options: Array.from({ length: 10 }, (_, i) => ({ text: `${i + 1}` })),
    },
  ]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleUseSliderChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].useSlider = !newQuestions[index].useSlider;
    if (newQuestions[index].useSlider) {
      newQuestions[index].options = Array.from({ length: 10 }, (_, i) => ({
        text: `${i + 1}`,
      }));
    } else {
      newQuestions[index].options = [];
    }
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        useSlider: true,
        options: Array.from({ length: 10 }, (_, i) => ({ text: `${i + 1}` })),
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        type: "Scaling",
        title,
        questions,
      };

      const response = await axios.post("/Scalepolls", payload);
      console.log("Poll created:", response.data);
      alert("Poll Created");
      setTitle("");
      setQuestions([
        {
          question: "",
          useSlider: true,
          options: Array.from({ length: 10 }, (_, i) => ({ text: `${0 + 1}` })),
        },
      ]);

      setTimeout(() => {
        window.location.href = "/polls";
      }, 1000);
    } catch (error) {
      console.error(
        "Error creating poll:",
        error.response?.data || error.message || error
      );
    }
  };

  return (
    <Box
      w="600px"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="xl" mb={4}>
        Create a Poll
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Poll Title"
          value={title}
          onChange={handleTitleChange}
        />
        {questions.map((question, index) => (
          <Box key={index} w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Textarea
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e)}
            />
            {question.useSlider ? (
              <Button
                mt={2}
                colorScheme="blue"
                onClick={() => handleUseSliderChange(index)}
              >
                Use Text Options
              </Button>
            ) : (
              <>
                <InputGroup mt={2}>
                  <InputLeftElement children={<Box>Options:</Box>} />
                  <Input
                    placeholder="Enter options separated by commas"
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].options = e.target.value
                        .split(",")
                        .map((text) => ({ text: text.trim() }));
                      setQuestions(newQuestions);
                    }}
                  />
                </InputGroup>
                <Button
                  mt={2}
                  colorScheme="gray"
                  onClick={() => handleUseSliderChange(index)}
                >
                  Use Slider
                </Button>
              </>
            )}
            <Button
              mt={2}
              colorScheme="red"
              onClick={() => handleRemoveQuestion(index)}
            >
              Remove Question
            </Button>
          </Box>
        ))}
        <Button mt={4} colorScheme="blue" onClick={handleAddQuestion}>
          Add Question
        </Button>
      </VStack>
      <Button mt={4} colorScheme="green" onClick={handleSubmit}>
        Create Poll
      </Button>
    </Box>
  );
};

export default CreatePollDrag;
