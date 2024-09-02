import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

const ResponseForm = ({ questions, onSubmit }) => {
  const [responses, setResponses] = useState(questions.map(() => ""));

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(responses);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <FormControl key={index} mt={4}>
          <FormLabel>{question.question}</FormLabel>
          <RadioGroup
            onChange={(value) => handleResponseChange(index, value)}
            value={responses[index]}
          >
            <Stack direction="column">
              {question.options.map((option, oIndex) => (
                <Radio key={oIndex} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      ))}
      <Button type="submit" colorScheme="blue" mt={4}>
        Submit
      </Button>
    </Box>
  );
};

export default ResponseForm;
