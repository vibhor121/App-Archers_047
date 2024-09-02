import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  useToast,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const PollForm = ({ addPoll }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const toast = useToast();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || options.some((option) => !option.trim())) {
      toast({
        title: "Form Incomplete",
        description: "Please fill out all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newPoll = { question, options };
    addPoll(newPoll);

    toast({
      title: "Poll Created",
      description: "Your poll has been created successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setQuestion("");
    setOptions(["", ""]);
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
        Create Poll
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl id="question" isRequired>
            <FormLabel>Question</FormLabel>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your poll question here"
              size="lg"
              focusBorderColor="blue.500"
            />
          </FormControl>
          {options.map((option, index) => (
            <FormControl key={index} isRequired>
              <FormLabel>Option {index + 1}</FormLabel>
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter option ${index + 1}`}
                size="lg"
                focusBorderColor="blue.500"
              />
            </FormControl>
          ))}
          <Flex justify="center">
            <IconButton
              icon={<AddIcon />}
              onClick={handleAddOption}
              colorScheme="blue"
              aria-label="Add Option"
              variant="outline"
              isRound
            />
          </Flex>
          <Button type="submit" colorScheme="blue" size="lg" mt={4} isFullWidth>
            Create Poll
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PollForm;
