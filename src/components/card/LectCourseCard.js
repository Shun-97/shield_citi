// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Progress,
  Spacer
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import {Link as ReachLink} from 'react-router-dom';


export default function LectCourseCard({props}) {
  console.log(props)
  const id = props["courseid"];
  const coursename = props["coursename"];
  const description = props["description"];
  const lecttime = props["lecttime"];
  const instructor = props["instructor"];
  const classsize = props["classsize"];

    return (
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
        <Flex flexDirection='column' justify='space-between' h='100%'>
            <Flex
              justify='space-between'
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mb='auto'>
              <Flex direction='column'>
                <Text
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb='5px'
                  fontWeight='bold'
                  me='14px'>
                  {coursename}
                </Text>
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight='400'
                  me='14px'>
                  {instructor}
                </Text>
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight='400'
                  me='14px'>
                </Text>
              </Flex>
            </Flex>
            </Flex>
            <Flex
              align='start'
              justify='space-between'
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt='25px'>
              <Text fontWeight='700' fontSize='sm'>
                {description}
              </Text>
            </Flex>
            <Flex
              align='start'
              justify='space-between'
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt='25px'>
              <Text fontWeight='700' fontSize='sm'>
                Time: {lecttime}
              </Text>
              {/* <Flex 
                align='end'
                variant='enclosed'
                justify='space-between'
                mt='25px'
                ml='auto'
                > */}
                <Link
                as={ReachLink}
                  to={"lectlist/" + id + "/general"}
                  pl = '10px'>
                  <Button
                    align='end'
                    variant='darkBrand'
                    color='white'
                    fontSize='sm'
                    fontWeight='500'
                    borderRadius='70px'
                    px='24px'
                    py='5px'
                    
                    >
                    Edit
                  </Button>
                </Link>
            {/* </Flex> */}
            </Flex>
        </Flex>
      </Card>
    );
}
