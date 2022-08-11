// Chakra imports
import {
    Box,
    useColorModeValue,
    Icon,
    SimpleGrid,
    Button,
    Text,
    Image,
    Link
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
import { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";


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
    const [imageURL, setImageURL] = React.useState("4.png");
    const [isExisting, setIsExisting] = React.useState(localStorage.role === "existing");
    const changeView = (imageName) => {
        setImageURL(imageName)
    }
    const [ESG, setESG] = React.useState([]);
    const [portfilo, setPortfilo] = React.useState([]);
    const [favoriteESG, setFavoriteESG] = useState("Environmental");
    const [treePng, setTreehugger] = useState("4.png");
    const [peoplePng, setPeoplePng] = useState("5.png");
    const [goverancePng, setGoverancePng] = useState("6.png");
    const id = localStorage.id

    
    console.log(localStorage)
    useEffect(() => {
        setFavoriteESG(localStorage.highest_Score)
        if (localStorage.highest_Score === "Environmental") {
            setTreehugger("1.png")
            setImageURL("1.png")
        }
        else if (localStorage.highest_Score === "Social") {
            setPeoplePng("2.png")
            setImageURL("2.png")
        }
        else if (localStorage.highest_Score === "Governance") {
            setGoverancePng("3.png")
            setImageURL("3.png")
        }
        

        fetch(`http://localhost:5198/scoring`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
               {"cid": id}
            )
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.equity)
                setESG(data.data.equity);
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
                if (localStorage.riskAppetiteScore <= 30) {
                    setPortfilo(data[2]);
                } else if (localStorage.riskAppetiteScore <= 60) {
                    setPortfilo(data[1]);
                } else {
                    setPortfilo(data[0]);
                }
            });
    }, []);

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
                    Your current portfilo has a ESG Risk of:
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
                            value={`${ESG.env}`}
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
                <div onClick={() => changeView(treePng)}>
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
                        value={`${localStorage.env_Score}%`}
                    />
                </div>
                <div onClick={() => changeView(peoplePng)}>
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
                        value={`${localStorage.soc_Score}%`}
                    />
                </div>
                <div onClick={() => changeView(goverancePng)}>
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
                        value={`${localStorage.gov_Score}%`}
                    />
                </div>

            </SimpleGrid>
            <Card w='40rem' my='3rem' mx='auto' alignItems="center">
                <Image src={`/reportImage/${imageURL}`} mx='auto' h='30rem'></Image>
                <Link
                    as = {ReachLink} 
                    to = '/admin/recommendation'>
                    <Button my='2rem' mx='auto' size='lg' leftIcon={<MdManageSearch />} colorScheme='purple'>Show my recommendation</Button>
                </Link>

            </Card>

        </Box>
    );
}
