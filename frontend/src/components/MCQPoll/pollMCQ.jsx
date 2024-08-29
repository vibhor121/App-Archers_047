import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Select,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "../login-signup/api";

const PollCreation = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: [{ text: "" }], type: "radio" },
  ]);
  const [title, setTitle] = useState("");
  const toast = useToast();

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleTypeChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].type = event.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: "" });
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [{ text: "" }], type: "radio" },
    ]);
  };

  const removeQuestion = (qIndex) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("No access token found. Please log in.");
      return;
    }

    const pollData = {
      type: "MCQ",
      title: `${title}`,
      questions: questions.map((q) => ({
        question: q.question,
        type: q.type,
        options: q.options.map((opt) => ({ text: opt.text })),
      })),
    };

    try {
      const response = await axios.post("/polls", pollData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Poll created successfully:", response.data);
      alert("Poll created successfully!");
      setQuestions([{ question: "", options: [{ text: "" }], type: "radio" }]);
      setTitle("");
      toast({
        title: "poll created",
        description: "You have been successfully created in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.href = "/polls"; // Need to change
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(
          `Failed to create poll. Server responded with status code ${error.response.status}.`
        );
      } else {
        alert("Failed to create poll. Error setting up request.");
      }
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
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
      <Box mb={4}>
        <Input
          value={title}
          onChange={handleTitle}
          placeholder="Enter Your Poll Title"
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {questions.map((q, qIndex) => (
            <Box key={qIndex} w="100%" p={4} borderWidth={1} borderRadius="lg">
              <HStack justifyContent="space-between">
                <FormControl id={`question-${qIndex}`} isRequired>
                  <FormLabel>Question {qIndex + 1}</FormLabel>
                  <Textarea
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    placeholder={`Enter question ${qIndex + 1}`}
                  />
                </FormControl>
                <FormControl id={`type-${qIndex}`} isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={q.type}
                    onChange={(e) => handleTypeChange(qIndex, e)}
                  >
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </Select>
                </FormControl>
                {qIndex > 0 && (
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Remove question"
                    onClick={() => removeQuestion(qIndex)}
                  />
                )}
              </HStack>
              {q.options.map((option, oIndex) => (
                <HStack key={oIndex} w="100%" mt={2}>
                  <FormControl id={`option-${qIndex}-${oIndex}`} isRequired>
                    <FormLabel>Option {oIndex + 1}</FormLabel>
                    <Input
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  </FormControl>
                  {oIndex > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Remove option"
                      onClick={() => removeOption(qIndex, oIndex)}
                    />
                  )}
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => addOption(qIndex)}
                w="100%"
                mt={2}
              >
                Add Option
              </Button>
            </Box>
          ))}
          <Button leftIcon={<AddIcon />} onClick={addQuestion} w="100%">
            Add Question
          </Button>
          <Button type="submit" colorScheme="blue" w="100%">
            Create Poll
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PollCreation;
