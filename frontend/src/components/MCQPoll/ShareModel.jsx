import React from "react";
import { Box, Button, Input, Text, useDisclosure } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const ShareModal = ({ isOpen, onClose, url }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    isOpen && (
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(0, 0, 0, 0.6)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
        zIndex="modal"
      >
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          position="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Text mb={4}>Share this URL:</Text>
          <Input value={url} isReadOnly mb={4} size="md" variant="outline" />
          <Button onClick={handleCopy} leftIcon={<CopyIcon />}>
            Copy URL
          </Button>
        </Box>
      </Box>
    )
  );
};

export default ShareModal;
