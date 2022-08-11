// Chakra imports
import {
    Box,
    Flex,
    useColorModeValue,
    SimpleGrid,
    Text,
    Button,
    Circle,
    Spacer,
    HStack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
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
    let history = useHistory();
    // console.log(localStorage)

    let rowDirection = "row"
    const [cardDetail, setCardDetail] = React.useState([]);
    const [AllQn, setAllQn] = React.useState([{ "Question": "", "Question_number": "", "Choices": [] }]);
    const [CurrentQn, setCurrentQn] = React.useState(0);
    const [CurrentselectedChoice, setSelectedChoice] = React.useState(0);
    const changeQn = (ESG_Question_text) => {
        setCurrentQn(ESG_Question_text)
    }
    const changeSelectedChoice = (selectedChoice, currentQn) => {
        setSelectedChoice(selectedChoice)
    }
    const quesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const mcq = ["A", "B", "C", "D", "E", "F"]
    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        // console.log(qnAnswer)
        submitQuiz(qnAnswer)
    }

    const submitQuiz = () => {
        console.log("now sending to BE")
        console.log(qnAnswer)
        fetch('http://localhost:5004/calculateEsgScore', {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                qnAnswer
            )
        }).then(res => res.json())
            .then(data => {
                localStorage.setItem("env_Score", data.data['env score'])
                localStorage.setItem("gov_Score", data.data['gov_score'])
                localStorage.setItem("soc_Score", data.data['soc score'])
                localStorage.setItem("highest_Score", data.data['highest_score'])
                // console.log(data.data)
                history.push("/admin/report");
            })

    }

    const storeChoice = (value, currentQn) => {
        // console.log(value)
        // console.log(currentQn)
        let qnArray = qnAnswer
        qnArray[currentQn]['Info'] = [value[1], value[2]];
        setQnAnswer(qnArray)
    }


    const [qnAnswer, setQnAnswer] = React.useState([{
        "Question_number": 1,
        "Info": ["S",1]
    }
        , {
        "Question_number": 2,
        "Info": ["S",1]
    }
        , {
        "Question_number": 3,
        "Info": ["E",3]
    },
    {
        "Question_number": 4,
        "Info": ["G",1]
    },
    {
        "Question_number": 5,
        "Info": ["E",3]
    },
    {
        "Question_number": 6,
        "Info": ["S",1]
    },
    {
        "Question_number": 7,
        "Info": ["G",1]
    },
    {
        "Question_number": 8,
        "Info": ["E",3]
    },
    {
        "Question_number": 9,
        "Info": ["G",1]
    }])

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
                // console.log(data)
            });

        fetch("/db/ESGQuiz.json", {
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
                width= "100%"
                my='1rem'
                mx='auto'>
                <Flex direction='column'  >
                    <HStack mx='auto' my= '2rem' justifyContent="center" >
                        {
                            quesCount.map((number, key) => {
                                let circleComponent = <Circle key={key} size='40px' color='black'>{number}</Circle>
                                if (CurrentQn + 1 === number) {
                                    circleComponent = <Circle key={key} size='40px' bg='blue' color='white'>{number}</Circle>
                                }
                                return (
                                    <div onClick={() => changeQn(number - 1) & changeSelectedChoice(0)}>
                                        {circleComponent}
                                    </div>
                                )
                            })
                        }
                    </HStack>
                    <Flex my= '4rem' direction='row'>
                        <Flex direction = 'column' w = '40%' borderRight='1px'>
                            <Text
                                color={textColorPrimary}
                                fontWeight='bold'
                                fontSize='3xl'
                                my='0.5rem'
                                mx='3rem'
                            >
                                {`Q${AllQn[CurrentQn].Question_number}`}
                            </Text>
                            <Text
                                color={textColorSecondary} fontSize='xl' mx='4rem' my='0.5rem'>
                                {`${AllQn[CurrentQn].Question}`}
                            </Text>
                        </Flex>
                        <Spacer />
                        <Flex direction = 'column' w = '50%' align-items="flex-start">
                            {
                                AllQn[CurrentQn].Choices.map((choice, key) => {
                                    // console.log(CurrentselectedChoice)
                                    let circleComponent = <Circle key={key} my= '1rem' mx = "1rem" size='40px' bg='#dfe7e3' color="white" onClick={(e) => storeChoice(choice, CurrentQn)} >{mcq[key]}</Circle>
                                    if (CurrentselectedChoice === key) {
                                        circleComponent = <Circle key={key} my= '1rem' mx = "1rem" size='40px' bg="#b3b9b6" color='white' onClick={(e) => storeChoice(choice, CurrentQn)}>{mcq[key]}</Circle>
                                    }
                                    return (
                                        <Flex alignItems='center' onClick={() => changeSelectedChoice(key)}>
                                            {circleComponent}
                                            <Text my= '1rem' mr ='5rem'>{choice[0]}</Text>
                                        </Flex>

                                    )

                                })
                            }
                        </Flex>
                    </Flex>
                </Flex>
                <Flex color={textColorSecondary} mx='auto' my='5rem' display="flex">
                        <Button onClick={handleSubmit} colorScheme='purple'> Submit Quiz </Button>
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
