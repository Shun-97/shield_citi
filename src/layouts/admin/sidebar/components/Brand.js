import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image, Box } from "@chakra-ui/react";

// Custom components
import { NextGenLogo } from "components/icons/Icons";
import { CitiLogo } from "assets/img/brand/Citi.png"
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <NextGenLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
        <Image src='/branding/Citi.png' alt='Citi Logo' w='10rem' my = '2rem' mx = '2rem'/>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
