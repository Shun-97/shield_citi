// Chakra imports
import {
    Box,
    Flex,
    useColorModeValue,
    SimpleGrid,
    Text,
    Image,
    Circle,
    Square,
    HStack
} from "@chakra-ui/react";

// Assets


// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { useEffect } from "react";

export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    let rowDirection = "row"
    const [cardDetail, setCardDetail] = React.useState([]);
    const [AllQn, setAllQn] = React.useState([{ "Question": "", "Question_number": "", "Choices": [] }]);
    const [CurrentQn, setCurrentQn] = React.useState(0);
        // data = undefin <-
        // data = [{}]
        // assignment is fixed, use state is not
        // AllQn = undefin
    const changeQn = (ESG_Question_text) => {
        setCurrentQn(ESG_Question_text)
    }
    const quesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    useEffect(() => {
        fetch("/db/ESG_Questions.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllQn(data);
                console.log(data)
            });

        fetch("/db/Quiz.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCardDetail(data);
                // console.log(data.filter(course => course.id === id)[0])
            });
    }, []);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Card boxShadow={cardShadow}
                my='1rem'
                mx='2rem'>
                <Flex direction='column'  >
                        <HStack mx = 'auto' justifyContent= "center" >
                            {
                                quesCount.map((number, key) => {
                                    let circleComponent = <Circle key = {key} size='40px' color='black'>{number}</Circle>
                                    if (CurrentQn+1 === number) {
                                        circleComponent = <Circle  key = {key} size='40px' bg='blue' color='white'>{number}</Circle>
                                    }
                                    
                                    return (
                                        <div onClick={() => changeQn(number - 1)}>
                                            {circleComponent}
                                        </div>
                                    )

                                })
                            }
                        </HStack>
                    <Text
                        color={textColorPrimary}
                        fontWeight='bold'
                        fontSize='3xl'
                        my='0.5rem'
                        mx='1rem'
                    >
                        {`Q${AllQn[CurrentQn].Question_number}`}
                    </Text>
                    <Text
                        color={textColorSecondary} fontSize='xl' mx='2rem' my='0.5rem'>
                        {`${AllQn[CurrentQn].Question}`}
                    </Text>

                    {/* {Choices.map()} */}
                </Flex>
            </Card>

            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                gap='1rem'
                mx='auto'
                maxW="600px"
                mb='1rem'>

            </SimpleGrid>
        </Box>
    );
}
