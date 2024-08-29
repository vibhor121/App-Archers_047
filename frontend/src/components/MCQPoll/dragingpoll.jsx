import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  Input,
} from "@chakra-ui/react";
import axios from "../login-signup/api"; // Ensure this path is correct

const RatingPollAttend = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [responses, setResponses] = useState([]);
  const [textResponses, setTextResponses] = useState([]);

  useEffect(() => {
    const fetchPoll = async () => {
      if (!pollId) {
        console.error("Poll ID is undefined");
        return;
      }
      try {
        const response = await axios.get(`/Scalepolls/${pollId}`);
        setPoll(response.data);
        setResponses(response.data.questions.map(() => 5)); // Default value for slider questions
        setTextResponses(response.data.questions.map(() => "")); // Initialize textResponses
      } catch (error) {
        console.error(
          "Error fetching poll:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleSliderChange = (questionIndex, value) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
  };

  const handleTextChange = (questionIndex, value) => {
    const newTextResponses = [...textResponses];
    newTextResponses[questionIndex] = value;
    setTextResponses(newTextResponses);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken"); // Ensure token is retrieved

    if (!token) {
      alert("You need to be logged in to submit responses.");
      return;
    }

    if (!poll) {
      console.error("Poll data is missing");
      return;
    }

    if (
      responses.length !== poll.questions.length ||
      textResponses.length !== poll.questions.length
    ) {
      console.error("Mismatch in responses and questions length");
      return;
    }

    try {
      const payload = {
        pollId,
        answers: poll.questions.map((question, index) => ({
          questionId: question._id,
          selectedOption: question.useSlider
            ? responses[index]
            : textResponses[index],
        })),
      };

      const response = await axios.post("/pollresponse", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response submitted:", response.data);
      alert("Response submitted successfully!");
    } catch (error) {
      console.error(
        "Error submitting response:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (!poll) return <Text>Loading...</Text>;

  return (
    <Box
      w="100%"
      maxW="600px"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="xl" mb={4}>
        {poll.title}
      </Heading>
      <VStack spacing={4}>
        {poll.questions.map((question, index) => (
          <Box
            key={question._id}
            w="100%"
            p={4}
            borderWidth={1}
            borderRadius="lg"
          >
            <Heading as="h4" size="md" mb={4}>
              {question.question}
            </Heading>
            {question.useSlider ? (
              <Slider
                defaultValue={5}
                min={1}
                max={10}
                step={1}
                onChange={(value) => handleSliderChange(index, value)}
                value={responses[index]}
              >
                <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                  1
                </SliderMark>
                <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
                  10
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            ) : (
              <Input
                placeholder="Enter your response"
                value={textResponses[index] || ""}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            )}
          </Box>
        ))}
        <Button mt={4} colorScheme="green" onClick={handleSubmit}>
          Submit Response
        </Button>
      </VStack>
    </Box>
  );
};

export default RatingPollAttend;
