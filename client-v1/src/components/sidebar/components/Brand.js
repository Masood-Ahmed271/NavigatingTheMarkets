import React from "react";

import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex align="center" direction="column">
            <Text color={logoColor} fontSize="2xl" ms="24px" fontWeight="700">
                Navigating The Markets
            </Text>
            <br></br>
            <HSeparator mb="20px" />
        </Flex>
    );
}

export default SidebarBrand;
