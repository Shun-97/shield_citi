// Chakra imports
import {
    Box,
    useColorModeValue,
    Icon,
    SimpleGrid,
    Button,
    Text,
    Image
} from "@chakra-ui/react";

import {
    MdBusiness,
    MdSavings,
    MdManageSearch
} from "react-icons/md";

import {
    AiFillGolden,
    AiTwotoneHeart
} from "react-icons/ai";

import {
    TbFileDollar,
    TbLeaf
} from "react-icons/tb";

import {
    RiGovernmentFill
} from "react-icons/ri";


// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { useEffect } from "react";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";


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
    const [imageURL, setImageURL] = React.useState("1.png");
    const [isExisting, setIsExisting] = React.useState(false);
    const changeView = (imageName) => {
        setImageURL(imageName)
    }
    const [ESG, setESG] = React.useState([]);
    const [portfilo, setPortfilo] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:5004/EsgScore/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setESG(data['data']);
                console.log("ESG")
                console.log(data['data'])
                // console.log(data.filter(course => course.id === id)[0])
            });

        fetch("/db/Portfilo_Output.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPortfilo(data[1]);
                console.log("Portfilo")
                console.log(data[0])
                // console.log(data.filter(course => course.id === id)[0])
            });
    }, []);

    useEffect(() => {
        console.log(imageURL)
        console.log('LOL')
    }, [imageURL])

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='3xl'
                my='0.5rem'
                mx='1rem'>
                Based on what you answered...
            </Text>

            {isExisting
                ? (<><Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='3xl'
                    my='0.5rem'
                    mx='1rem'>
                    Your current portfilo has a ESG rating of:
                </Text>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                    gap='1rem'
                    mx='auto'
                    maxW="600px"
                    mb='1rem'>
                        <MiniStatistics
                            startContent={
                                <IconBox
                                    w='56px'
                                    h='56px'
                                    bg={boxBg}
                                    icon={
                                        <Icon w='32px' h='32px' as={TbLeaf} color={brandColor} />
                                    }
                                />
                            }
                            name='Environment'
                            value ={`${ESG.env}`}
                        />
                        <MiniStatistics
                            startContent={
                                <IconBox
                                    w='56px'
                                    h='56px'
                                    bg={boxBg}
                                    icon={
                                        <Icon w='32px' h='32px' as={AiTwotoneHeart} color={brandColor} />
                                    }
                                />
                            }
                            name='Social'
                            value={`${ESG.soc}`}
                        />
                        <MiniStatistics
                            startContent={
                                <IconBox
                                    w='56px'
                                    h='56px'
                                    bg={boxBg}
                                    icon={
                                        <Icon w='32px' h='32px' as={RiGovernmentFill} color={brandColor} />
                                    }
                                />
                            }
                            name='Governance'
                            value={`${ESG.gov}`}
                        />
    
                </SimpleGrid></>)
                : <><Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='3xl'
                my='0.5rem'
                mx='1rem'>
                We recommended the following portfilo breakdown:
            </Text>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 4, "2xl": 4 }}
                    gap='2rem'
                    mx='auto'
                    maxW="800px"
                    mb='1rem'>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdBusiness} color={brandColor} />
                                }
                            />
                        }
                        name='Equity'
                        value={portfilo.Equity + "%"}
                    />
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={TbFileDollar} color={brandColor} />
                                }
                            />
                        }
                        name='Bonds'
                        value={portfilo.Bonds + "%"}
                    />
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={AiFillGolden} color={brandColor} />
                                }
                            />
                        }
                        name='Gold'
                        value={portfilo.Gold + "%"}
                    />
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdSavings} color={brandColor} />
                                }
                            />
                        }
                        name='Saving'
                        value={portfilo['Saving Plans'] + "%"}
                    />
                </SimpleGrid></>}


            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='3xl'
                my='0.5rem'
                mx='1rem'>
                Your sentiment towards ESG are:
            </Text>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                gap='1rem'
                mx='auto'
                maxW="600px"
                mb='1rem'>
                <div onClick={() => changeView("1.png")}>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={TbLeaf} color={brandColor} />
                                }
                            />
                        }
                        name='Environment'
                        value='50%'
                    />
                </div>
                <div onClick={() => changeView("2.png")}>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={AiTwotoneHeart} color={brandColor} />
                                }
                            />
                        }
                        name='Social'
                        value='40%'
                    />
                </div>
                <div onClick={() => changeView("3.png")}>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={RiGovernmentFill} color={brandColor} />
                                }
                            />
                        }
                        name='Governance'
                        value='10%'
                    />
                </div>

            </SimpleGrid>
            <Card w='40rem' my='3rem' mx='auto'>
                <Image src={`/reportImage/${imageURL}`} mx='auto' h='30rem'></Image>
                <Button my='2rem' mx='auto' size='lg' leftIcon={<MdManageSearch />} colorScheme='purple'>Show my recommendation</Button>
            </Card>

        </Box>
    );
}
