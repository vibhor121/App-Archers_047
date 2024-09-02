import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  VStack,
  IconButton,
  useBreakpointValue,
  useMediaQuery,
  Heading,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const CardCarousel = () => {
  const cards = [
    {
      title: "Effective, user-friendly",
      content:
        "Polify makes creating polls and quizzes so easy and engaging. Our team loves the flexibility and the user-friendly interface. It's a game-changer for gathering feedback!",
      name: "Prateek Shukla",
      position: "HUMAN RESOURCES MANAGER",
      company: "EMBASSY SUITES ORLANDO",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/prateek_6232b84d8b.jpeg",
    },
    {
      title: "Highly Recomonded",
      content:
        "We've been using Polify for our company quizzes and it's been a huge hit. The platform is intuitive and the analytics are extremely helpful for measuring engagement.",
      name: "Nrupul Dev",
      position: "Communication Director",
      company: "MasaiCon",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Nrupul_d3fe3b289a.jpg",
    },
    {
      title: "It Works Beautifully",
      content:
        "Polify has transformed how we conduct employee surveys. The process is smooth and the results are insightful. Employees appreciate the ease of use and the quick response time.",
      name: "Yogesh Bhat",
      position: "Chief Marketing Officer",
      company: "Vanity Fair",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Yogesh_52e31f5560.jpg",
    },
    {
      title: "Easy to Use",
      content:
        "We've used Polify for a range of activities from training quizzes to customer surveys. The tool is versatile and efficient, making it easy to gather and analyze responses.",
      name: "Aman Vats",
      position: "vice president",
      company: "Big Tech",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/aman_fbbc8625a4.jpg",
    },
    {
      title: "Effective, user-friendly",
      content:
        "Polify makes creating polls and quizzes so easy and engaging. Our team loves the flexibility and the user-friendly interface. It's a game-changer for gathering feedback!",
      name: "Prateek Shukla",
      position: "HUMAN RESOURCES MANAGER",
      company: "EMBASSY SUITES ORLANDO",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/prateek_6232b84d8b.jpeg",
    },
    {
      title: "Highly Recomonded",
      content:
        "We've been using Polify for our company quizzes and it's been a huge hit. The platform is intuitive and the analytics are extremely helpful for measuring engagement.",
      name: "Nrupul Dev",
      position: "Communication Director",
      company: "MasaiCon",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Nrupul_d3fe3b289a.jpg",
    },
    {
      title: "It Works Beautifully",
      content:
        "Polify has transformed how we conduct employee surveys. The process is smooth and the results are insightful. Employees appreciate the ease of use and the quick response time.",
      name: "Yogesh Bhat",
      position: "Chief Marketing Officer",
      company: "Vanity Fair",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Yogesh_52e31f5560.jpg",
    },

    {
      title: "Effective, user-friendly",
      content:
        "Polify makes creating polls and quizzes so easy and engaging. Our team loves the flexibility and the user-friendly interface. It's a game-changer for gathering feedback!",
      name: "Prateek Shukla",
      position: "HUMAN RESOURCES MANAGER",
      company: "EMBASSY SUITES ORLANDO",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/prateek_6232b84d8b.jpeg",
    },
    {
      title: "Highly Recomonded",
      content:
        "We've been using Polify for our company quizzes and it's been a huge hit. The platform is intuitive and the analytics are extremely helpful for measuring engagement.",
      name: "Nrupul Dev",
      position: "Communication Director",
      company: "MasaiCon",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Nrupul_d3fe3b289a.jpg",
    },
    {
      title: "It Works Beautifully",
      content:
        "Polify has transformed how we conduct employee surveys. The process is smooth and the results are insightful. Employees appreciate the ease of use and the quick response time.",
      name: "Yogesh Bhat",
      position: "Chief Marketing Officer",
      company: "Vanity Fair",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Yogesh_52e31f5560.jpg",
    },
    {
      title: "Effective, user-friendly",
      content:
        "Polify makes creating polls and quizzes so easy and engaging. Our team loves the flexibility and the user-friendly interface. It's a game-changer for gathering feedback!",
      name: "Prateek Shukla",
      position: "HUMAN RESOURCES MANAGER",
      company: "EMBASSY SUITES ORLANDO",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/prateek_6232b84d8b.jpeg",
    },
    {
      title: "Highly Recomonded",
      content:
        "We've been using Polify for our company quizzes and it's been a huge hit. The platform is intuitive and the analytics are extremely helpful for measuring engagement.",
      name: "Nrupul Dev",
      position: "Communication Director",
      company: "MasaiCon",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Nrupul_d3fe3b289a.jpg",
    },
    {
      title: "It Works Beautifully",
      content:
        "Polify has transformed how we conduct employee surveys. The process is smooth and the results are insightful. Employees appreciate the ease of use and the quick response time.",
      name: "Yogesh Bhat",
      position: "Chief Marketing Officer",
      company: "Vanity Fair",
      avatar:
        "https://masai-website-images.s3.ap-south-1.amazonaws.com/Yogesh_52e31f5560.jpg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(cards.length);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [isTablet] = useMediaQuery("(max-width: 768px)");

  const cardWidth = useBreakpointValue({
    base: "85vw",
    sm: "70vw",
    md: "50vw",
    lg: "400px",
  });
  const cardSpacing = useBreakpointValue({ base: 10, md: 20 });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const titleFontSize = useBreakpointValue({ base: "xl", md: "2xl" });

  // Clone cards for infinite effect
  const extendedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    if (containerRef.current) {
      const newTranslateX = -(
        currentIndex *
        (parseFloat(cardWidth) + cardSpacing)
      );
      setTranslateX(newTranslateX);
    }
  }, [currentIndex, cardWidth, cardSpacing]);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex >= cards.length * 2) {
        setCurrentIndex(cards.length);
      } else if (currentIndex < cards.length) {
        setCurrentIndex(cards.length * 2 - 1);
      }
    };

    const container = containerRef.current;
    container.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      container.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [currentIndex, cards.length]);

  return (
    <Box my="50px">
      <Heading textAlign="center" color="golden">
        Our Customers Reviews
      </Heading>

      <Flex
        justify="center"
        align="center"
        mx="auto"
        w="1200px"
        p={2}
        position="relative"
        overflow="hidden"
      >
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={prevCard}
          position="absolute"
          left={2}
          zIndex={2}
          aria-label="Previous card"
          size={isMobile ? "sm" : "md"}
        />

        <Box
          ref={containerRef}
          w={`calc(${extendedCards.length} * (${cardWidth} + ${cardSpacing}px))`}
          display="flex"
          transition="transform 0.3s ease"
          transform={`translateX(${translateX}px)`}
          willChange="transform"
        >
          {extendedCards.map((card, index) => (
            <Box
              key={index}
              w={cardWidth}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              p={isMobile ? 3 : isTablet ? 4 : 6}
              mr={`${cardSpacing}px`}
              flexShrink={0}
            >
              <VStack spacing={3} align="stretch">
                <Text
                  fontSize={titleFontSize}
                  fontWeight="bold"
                  color="orange.500"
                >
                  "{card.title}"
                </Text>
                <Text fontSize={fontSize}>{card.content}</Text>
                <Flex align="center">
                  <Image
                    borderRadius="full"
                    boxSize={isMobile ? "40px" : "50px"}
                    src={card.avatar}
                    alt={card.name}
                    mr={3}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize={fontSize}>
                      {card.name}
                    </Text>
                    <Text fontSize={isMobile ? "xs" : "sm"} color="gray.500">
                      {card.position}
                    </Text>
                    <Text fontSize={isMobile ? "xs" : "sm"} color="gray.500">
                      {card.company}
                    </Text>
                  </VStack>
                </Flex>
              </VStack>
            </Box>
          ))}
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={nextCard}
          position="absolute"
          right={2}
          zIndex={2}
          aria-label="Next card"
          size={isMobile ? "sm" : "md"}
        />
      </Flex>
    </Box>
  );
};

export default CardCarousel;
