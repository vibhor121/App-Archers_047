import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Text } from "@chakra-ui/react";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch polls from the backend API
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/polls"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <Box mt={10}>
      <List spacing={3}>
        {polls.map((poll) => (
          <ListItem key={poll.id}>
            <Text>{poll.title}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PollList;
