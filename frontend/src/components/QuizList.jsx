import React, { useState } from "react";
import { Box, List, ListItem, Text } from "@chakra-ui/react";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  return (
    <Box mt={10}>
      <List spacing={3}>
        {quizzes.length > 0 &&
          quizzes.map((quiz) => (
            <ListItem key={quiz.id}>
              <Text>{quiz.title}</Text>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default QuizList;
