// Chakra imports
import {
    Box,
    Flex,
    useColorModeValue,
    Text,
    Image
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



    useEffect(() => {
        fetch("/db/Main.json", {
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
            {cardDetail.map((mainDetail) => {
                mainDetail.Position === 'Left' ? rowDirection = 'row-reverse' : rowDirection = 'row'
                return (
                    <Card boxShadow={cardShadow}
                        my='1rem'
                        mx='2rem'>
                        <Flex
                            direction={rowDirection}
                            justifyContent='space-between'>
                            <Flex direction='column' >
                                <Text
                                    color={textColorPrimary}
                                    fontWeight='bold'
                                    fontSize='3xl'
                                    my='0.5rem'
                                    mx='1rem'
                                >
                                    {mainDetail.CardHeader}
                                </Text>
                                <Text
                                    color={textColorSecondary} fontSize='xl' mx='2rem' my='0.5rem'>
                                    {mainDetail.CardBody}
                                </Text>
                            </Flex>

                            <Image
                                src={mainDetail.Image}
                                alt={mainDetail.ImageAlt}
                                w={mainDetail.ImageWidth}
                                h={mainDetail.ImageHeight} />
                        </Flex>
                    </Card>
                )
            }


            )
            }
        </Box>
    );
}
