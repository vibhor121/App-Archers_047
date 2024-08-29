import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "../login-signup/api";
import { useEffect, useState } from "react";
import ShareModal from "./ShareModel";
import { FaShareSquare } from "react-icons/fa";
const AttendPoll = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`/polls/${pollId}`);
        console.log(response);
        const pollData = response.data[0];
        setPoll(pollData);
        initializeSelectedOptions(pollData);
      } catch (error) {
        console.error("Error fetching poll details:", error);
      }
    };

    fetchPoll();
  }, [pollId]);

  const initializeSelectedOptions = (pollData) => {
    const initialOptions = {};
    pollData.questions.forEach((question) => {
      if (question.type === "checkbox") {
        initialOptions[question._id] = [];
      } else {
        initialOptions[question._id] = null;
      }
    });
    setSelectedOptions(initialOptions);
  };

  const handleOptionChange = (questionId) => (value) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: value,
    });
  };

  const handleCheckboxChange = (questionId, optionId, isChecked) => {
    setSelectedOptions((prevState) => {
      const selectedOptionsForQuestion = prevState[questionId] || [];
      if (isChecked) {
        return {
          ...prevState,
          [questionId]: [...selectedOptionsForQuestion, optionId],
        };
      } else {
        return {
          ...prevState,
          [questionId]: selectedOptionsForQuestion.filter(
            (id) => id !== optionId
          ),
        };
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        answers: poll.questions.map((question) => {
          if (question.type === "checkbox") {
            const selectedOptionsForQuestion =
              selectedOptions[question._id] || [];
            return {
              questionId: question._id,
              questionText: question.question,
              answerId: selectedOptionsForQuestion,
              answerText: selectedOptionsForQuestion.map(
                (optionId) =>
                  question.options.find((option) => option._id === optionId)
                    .text
              ),
            };
          } else {
            return {
              questionId: question._id,
              questionText: question.question,
              answerId: selectedOptions[question._id],
              answerText: question.options.find(
                (option) => option._id === selectedOptions[question._id]
              ).text,
            };
          }
        }),
      };
      console.log("Submitting payload:", payload);

      const response = await axios.post(`/polls/${pollId}/responses`, payload);
      // console.log('Response submitted:', response.data);
      toast({
        title: "Poll submited successful.",
        description: "Thanks for Attemping Poll",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.href = "/polls";
      }, 1000);
    } catch (error) {
      console.error("Error submitting response:", error);
      console.error(
        "Error details:",
        error.response ? error.response : error.message
      );
    }
  };

  if (!poll) return <Text>Loading poll details...</Text>;

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
        {poll.title}
      </Heading>
      <Button
        onClick={handleShareClick}
        colorScheme="blue"
        mb={4}
        variant="outline"
        leftIcon={<FaShareSquare />}
        // leftIcon={<FaShareAlt />}
      >
        Share This Poll
      </Button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        url={currentUrl}
      />
      <VStack spacing={4}>
        {poll.questions.map((question, index) => (
          <Box key={index} w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Heading as="h3" size="md">
              {question.question}
            </Heading>
            {question.type === "radio" ? (
              <RadioGroup
                mt={2}
                value={selectedOptions[question._id]}
                onChange={handleOptionChange(question._id)}
              >
                {question.options.map((option, idx) => (
                  <Radio key={idx} value={option._id}>
                    {option.text}
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              <CheckboxGroup
                mt={2}
                value={selectedOptions[question._id]}
                onChange={(value) => handleOptionChange(question._id)(value)}
              >
                {question.options.map((option, idx) => (
                  <Checkbox
                    key={idx}
                    value={option._id}
                    isChecked={selectedOptions[question._id]?.includes(
                      option._id
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        question._id,
                        option._id,
                        e.target.checked
                      )
                    }
                  >
                    {option.text}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          </Box>
        ))}
      </VStack>
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Submit Response
      </Button>
    </Box>
  );
};

export default AttendPoll;
