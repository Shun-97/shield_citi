import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    FormHelperText,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    RadioGroup,
    HStack,
    Radio
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const [isMissingInput, setIsMissingInput] = useState(false);
    let errorComponent = null;

    if (isWrongPassword) {
        errorComponent = <Alert mb='2rem' status='error'>
            <AlertIcon />
            Your userid and/or password is wrong.
        </Alert>
    } else if (isMissingInput) {
        errorComponent = <Alert mb='2rem' status='error'>
            <AlertIcon />
            There are missing fields
        </Alert>
    }
    localStorage.setItem('role', 'newUser');
    localStorage.setItem('id', 3);
    const [show, setShow] = React.useState(false);
    const [SignIn, setSignIn] = useState({
        "email": "",
        "password": "",
        "name": "",
        "martialStatus": "",
        "income": "",
    })
    const handleClick = () => setShow(!show);

    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                w='100%'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "14vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Sign Up
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Fill up the following details to sign up
                    </Text>
                </Box>
                {errorComponent}

                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "420px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>
                    <Alert mb='2rem' status='info'><AlertIcon />Disclaimer: This is just a recommendation, please do your own due diligence before investing </Alert>
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Name<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='Enter your User ID'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            value = "Alex"
                            onChange={(e) => setSignIn({ ...SignIn, "userid": e.target.value })}
                        />
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'
                            >
                            Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Min. 8 characters'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                value = "InvESGis100points!"
                                onChange={(e) => setSignIn({ ...SignIn, "password": e.target.value })}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='4px'>
                                <Icon
                                    color={textColorSecondary}
                                    _hover={{ cursor: "pointer" }}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'
                            >
                            Email<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='Enter your email'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            value = "test@gmail.com"
                            onChange={(e) => setSignIn({ ...SignIn, "email": e.target.value })}
                        />
                        <FormLabel as='legend'>Martial Status</FormLabel>
                        <RadioGroup my='24px' defaultValue='Single' >
                            <HStack spacing='24px'>
                                <Radio
                                    onChange={(e) => setSignIn({ ...SignIn, "martialStatus": e.target.value })}
                                    value='Single'>Single</Radio>
                                <Radio
                                    onChange={(e) => setSignIn({ ...SignIn, "martialStatus": e.target.value })}
                                    value='Married'>Married</Radio>
                            </HStack>
                        </RadioGroup>
                        <FormLabel as='legend'>Annual Income</FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='Enter your annual income in SGD'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            value = "100000"
                            onChange={(e) => setSignIn({ ...SignIn, "income": e.target.value })}
                        />
                        <NavLink to='/admin/KYCquiz'>
                            <Button
                                my='24px'
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                w='100%'
                                h='50'
                                mb='24px'
                            >
                                Personality Quiz!
                            </Button>
                        </NavLink>
                    </FormControl>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignUp;
