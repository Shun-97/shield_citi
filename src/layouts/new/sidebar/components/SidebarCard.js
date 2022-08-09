import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export default function SidebarDocs() {
  const bgColor = "linear-gradient(135deg, #8AB6FF 0%, #FFCDCD 100%)";
  const borderColor = useColorModeValue("purple.500", "navy.800");

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      bg={bgColor}
      borderRadius='30px'
      me='20px'
      position='relative'>
      <Flex
        direction='column'
        mb='12px'
        align='center'
        justify='center'
        px='15px'
        pt='25px'>
        <Text
          fontSize={{ base: "lg", xl: "18px" }}
          color='black'
          fontWeight='bold'
          lineHeight='150%'
          textAlign='center'
          px='10px'
          mb='14px'>
          Send us your feedback!
        </Text>
        <Text
          fontSize='14px'
          color={"black"}
          px='10px'
          mb='14px'
          textAlign='center'>
          Help us improve the user experience of our platform.
        </Text>
      </Flex>
        <Button
          bg='whiteAlpha.400'
          _hover={{ bg: "whiteAlpha.300" }}
          _active={{ bg: "whiteAlpha.100" }}
          mb={{ sm: "16px", xl: "24px" }}
          color={"#2B3674"}
          fontWeight='bold'
          fontSize='sm'
          minW='185px'
          mx='auto'
          px='2'>
          Click here to submit a ticket
        </Button>
    </Flex>
  );
}
