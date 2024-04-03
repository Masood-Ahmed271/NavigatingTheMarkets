import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import MetaModal from "components/modal/MetaModal";

export default function MetaCard(props) {
    const { image, incorporatedName, name } = props;
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <Card p="20px">
            <Flex direction={{ base: "column" }} justify="center">
                <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
                    <Image
                        src={image}
                        w={{ base: "95%", "3xl": "100%" }}
                        h={{ base: "95%", "30xl": "100%" }}
                        borderRadius="20px"
                        style={{ margin: "auto" }}
                    />
                </Box>
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mb="auto"
                    >
                        <Flex direction="column">
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "xl",
                                    md: "lg",
                                    lg: "lg",
                                    xl: "lg",
                                    "2xl": "md",
                                    "3xl": "lg",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                            >
                                {name}
                            </Text>
                            <Text
                                color="secondaryGray.600"
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight="400"
                                me="14px"
                            >
                                {incorporatedName}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        align="start"
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mt="25px"
                    >
                        <MetaModal incorporatedName={incorporatedName} />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
