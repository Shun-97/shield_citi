// Chakra imports
import {
    Box,
    Flex,
    useColorModeValue,
    SimpleGrid,
    Text,
    Spacer,
    Circle,
    Button,
    HStack
} from "@chakra-ui/react";

// Assets
import { useHistory } from "react-router-dom";


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
        console.log(qnAnswer)
        submitQuiz(qnAnswer)
    }
    let history = useHistory();


    const submitQuiz = () =>{
        console.log("now sending to BE")
        console.log(qnAnswer)
        fetch('http://localhost:5003/calculateRiskAppetite', {
            // mode: 'no-cors',
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
               qnAnswer
            )
        }).then(res=>res.json())
        .then(data =>{
            console.log(data.data.riskAppetiteScore)
            localStorage.setItem("riskAppetiteScore", data.data.riskAppetiteScore)
            history.push("/admin/quiz");
        })

    }

    const storeChoice = (value,currentQn) => {
        // console.log(value)
        // console.log(currentQn)
        let qnArray = qnAnswer
        qnArray[currentQn]['Selected'] = value[1];
        setQnAnswer(qnArray)
    }


    const [qnAnswer, setQnAnswer] = React.useState(
    [
        {
        "Question_number": 1,
        "Selected": 1,
        "Max":6
    }
        , {
        "Question_number": 2,
        "Selected": 1,
        "Max":6
    }
        , {
        "Question_number": 3,
        "Selected": 1,
        "Max":4
    },
    {
        "Question_number": 4,
        "Selected": 1,
        "Max":5
    },
    {
        "Question_number": 5,
        "Selected": 1,
        "Max":4
    },
    {
        "Question_number": 6,
        "Selected": 1,
        "Max":4
    },
    {
        "Question_number": 7,
        "Selected": 1,
        "Max":3
    },
    {
        "Question_number": 8,
        "Selected": 1,
        "Max":2
    },
    {
        "Question_number": 9,
        "Selected": ["Technology","Oil and Gas","Biotechnology"],
        "Max":5
    }])

    useEffect(() => {
        fetch("/db/KYC_Questions.json", {
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
                        <Flex direction = 'column' w = '50%' borderRight='1px'>
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
                        <Flex direction = 'column' w = '40%' align-items="flex-start">
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
                                            <Text my= '1rem' mr ='3rem'>{choice[0]}</Text>
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
