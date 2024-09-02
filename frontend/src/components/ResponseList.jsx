import React from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

const ResponseList = ({ responses }) => {
  return (
    <Box mt={10}>
      <Heading size="md" mb={4}>
        Responses
      </Heading>
      <List spacing={3}>
        {responses.map((response, index) => (
          <ListItem key={index}>
            <Text>
              Question {index + 1}: {response.question}
            </Text>
            <Text>Response: {response.answer}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ResponseList;
