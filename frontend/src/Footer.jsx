import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const FooterLink = ({ href, children }) => (
    <Link
      href={href}
      _hover={{ color: "whiteAlpha.700", textDecoration: "underline" }}
      display="block"
      mb={2}
    >
      {children}
    </Link>
  );

  const FooterSection = ({ title, children }) => {
    if (isMobile) {
      return (
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold" fontSize="lg" color="white">
                  {title}
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack align="stretch" spacing={2}>
              {children}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      );
    }
    return (
      <Stack align="flex-start">
        <Text fontWeight="bold" fontSize="lg" mb={2} color="white">
          {title}
        </Text>
        {children}
      </Stack>
    );
  };

  const content = (
    <>
      <FooterSection title="QUICK LINKS">
        <FooterLink href="#">Online Survey Tool (DIY)</FooterLink>
        <FooterLink href="#">Enterprise Survey Software</FooterLink>
        <FooterLink href="#">Customer Experience (CX) Platform</FooterLink>
        <FooterLink href="#">Employee Experience (EX) Platform</FooterLink>
        <FooterLink href="#">Customer Feedback Management</FooterLink>
        <FooterLink href="#">Automation and Integrations</FooterLink>
        <FooterLink href="#">Managed Services</FooterLink>
      </FooterSection>
      <FooterSection title="COMPANY">
        <FooterLink href="#">About Us</FooterLink>
        <FooterLink href="#">Blog</FooterLink>
        <FooterLink href="#">Careers</FooterLink>
        <FooterLink href="#">Contact Us</FooterLink>
        <FooterLink href="#">Newsroom</FooterLink>
        <FooterLink href="#">Our Customers</FooterLink>
        <FooterLink href="#">Sitemap</FooterLink>
      </FooterSection>
      <FooterSection title="RESOURCES">
        <FooterLink href="#">Help</FooterLink>
        <FooterLink href="#">Training Videos</FooterLink>
        <FooterLink href="#">Sample Surveys</FooterLink>
        <FooterLink href="#">Webinars</FooterLink>
        <FooterLink href="#">Request a Demo</FooterLink>
        <FooterLink href="#">Create Surveys</FooterLink>
        <FooterLink href="#">Quiz Maker</FooterLink>
      </FooterSection>
      <FooterSection title="CONTACT">
        <Stack direction="row" align="center" spacing={3}>
          <Icon as={MdLocationOn} boxSize={5} color="white" />
          <Text color="white">
            2291 Wood Oak Drive Suite 300 Herndon, VA 20171
          </Text>
        </Stack>
        <Stack direction="row" align="center" spacing={3}>
          <Icon as={MdPhone} boxSize={5} color="white" />
          <Text color="white">+1 (800) 646-0520</Text>
        </Stack>
        <Stack direction="row" align="center" spacing={3}>
          <Icon as={MdEmail} boxSize={5} color="white" />
          <Text color="white">support1@pollify.com</Text>
        </Stack>
        <Stack direction="row" spacing={4} mt={4}>
          <Link href="#" _hover={{ color: "teal.200" }}>
            <Icon as={FaLinkedin} boxSize={6} color="white" />
          </Link>
          <Link href="#" _hover={{ color: "teal.200" }}>
            <Icon as={FaTwitter} boxSize={6} color="white" />
          </Link>
          <Link href="#" _hover={{ color: "teal.200" }}>
            <Icon as={FaYoutube} boxSize={6} color="white" />
          </Link>
          <Link href="#" _hover={{ color: "teal.200" }}>
            <Icon as={FaFacebook} boxSize={6} color="white" />
          </Link>
          <Link href="#" _hover={{ color: "teal.200" }}>
            <Icon as={FaInstagram} boxSize={6} color="white" />
          </Link>
        </Stack>
      </FooterSection>
    </>
  );

  return (
    <Box bg="black" color="white" py={10} borderTop="5px solid primary">
      <Container maxW="container.xl">
        {isMobile ? (
          <Accordion allowMultiple>{content}</Accordion>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {content}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
