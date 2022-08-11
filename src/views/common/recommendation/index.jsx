// Chakra imports
import {
    Box,
    useColorModeValue,
    Text,
    Flex,
    Spacer,
    FormLabel,
    Select,
    Switch
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { useEffect } from "react";


export default function Recommendation() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );


    const [typeTop, settypeTop] = React.useState("Most");
    const [dataList, setDataList] = React.useState([]);
    const [industry, setIndustry] = React.useState("");
    const [allData, setAllData] = React.useState([]);

    useEffect(() => {
        fetch("/db/industry_output.json")
            .then(res => res.json())
            .then((data) => {
                setAllData(data)
                setDataList(data.sort((a, b) => b.profileScore < a.profileScore ? 1 : -1))
            })
    }, [])



    const changeSwitch = (e) => {
        let switching = typeTop
        switching === "Most" ? settypeTop("Top") : settypeTop("Most");
        if (switching === "Top") {
            setDataList(dataList.sort((a, b) => b.profileScore < a.profileScore ? 1 : -1))
        } else {
            setDataList(dataList.sort((a, b) => b.total < a.total ? 1 : -1))
        }
    }

    const changeIndustry = (e) => {
        setIndustry(e.target.value)
    }
    

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Flex flexDirection='column' mx='3rem'>
                <Flex
                    direction='row-reverse'
                    me='20px'
                    ms="2rem"
                    mt="2rem"
                    mb="2rem">

                    <FormLabel htmlFor='isChecked'>Top Performing</FormLabel>
                    <Switch mx="1rem" id='isChecked' onChange={(e) => changeSwitch(e)} />
                    <FormLabel htmlFor='isChecked'>Most Relevant</FormLabel>

                    <Spacer />
                    <Select onChange={(e) => changeIndustry(e)} variant='filled' placeholder='Filter by industry' w='200px' >
                        <option value='Transport'>Transport</option>
                        <option value='OilAndGas'>OilAndGas</option>
                        <option value='Technology'>Technology</option>
                        <option value='AerospaceAndDefence'>AerospaceAndDefence</option>
                        <option value='Food'>Food</option>
                    </Select>
                </Flex>

                <Flex flexDirection={'row'} overflowX='scroll'>
                    <Flex>
                        <Text w='8rem' mx='1.5rem' textAlign={'center'}>Industry</Text>
                        <Text w='10rem' mx='1.5rem'>Company Name</Text>
                    </Flex>
                    <Spacer />
                    <Flex>
                        <Text w='7rem' mx='1.5rem' textAlign={'center'}>Environmental</Text>
                        <Text w='5.5rem' mx='1.5rem' textAlign={'center'}>Governance</Text>
                        <Text w='7rem' mx='1.5rem' textAlign={'center'}>Social</Text>
                        <Text w='7rem' mx='1.5rem' textAlign={'center'}>Performance</Text>
                    </Flex>
                </Flex>

                {(industry === "" 
                ?dataList
                :dataList.filter(item => item.industry === industry)
                ).map((data, key) => {
                    return (
                        <Card
                            my='0.5rem'
                            key={key}>
                            <Flex flexDirection={'row'}>
                                <Flex>
                                    <Text w='8rem' mx='1.5rem' textAlign={'center'}>{data.industry}</Text>
                                    <Text w='10rem' ml='2.5rem'>{data.name}</Text>
                                </Flex>
                                <Spacer />
                                <Flex>
                                    <Text w='7rem' mx='1rem' textAlign={'center'}>{data.env}</Text>
                                    <Text w='7rem' mx='1rem' textAlign={'center'}>{data.gov}</Text>
                                    <Text w='7rem' mx='1rem' textAlign={'center'}>{data.soc}</Text>
                                    <Text w='7rem' mx='1rem' textAlign={'center'}>{data.total}</Text>
                                </Flex>
                            </Flex>
                        </Card>
                    )
                })}
            </Flex>
        </Box >
    );
}
