import { Text, Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import Card from "components/card/Card";

const SmallerBox = (props) => {
    return (
        <>
            <Card
                p="50px"
                w="60%"
                style={{ border: "1px solid gray", marginRight: "30px" }}
            >
                <Text as="i" mb="10px">
                    {" "}
                    {props.title}
                </Text>
                <Text as="i" mb="10px">
                    {" "}
                    {props.value}
                </Text>
            </Card>
        </>
    );
};
export default function ModelInformation(props) {
    const finalLog = props.logs[props.logs.length - 1];
    const totalGains = finalLog
        ? Math.round(finalLog["total_gained"]) +
          " or " +
          Math.round(finalLog["total_investment"]) +
          "%"
        : "...";
    return (
        <Box
            pt={{ base: "180px", md: "80px", xl: "80px" }}
            w="100%"
            p={20}
            alignItems="center"
        >
            <Grid
                mb="20px"
                gridTemplateColumns={{
                    xl: "repeat(1, 1fr)",
                    "2xl": "1fr 0.2fr",
                }}
                gap={{ base: "20px", xl: "1px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <Flex direction="column">
                        <SimpleGrid columns={{ base: 1, md: 4 }} gap="0px">
                            <SmallerBox
                                title="Initial Money: "
                                value={"$" + props.initialMoney || "..."}
                            />
                            <SmallerBox
                                title="Maximum Quantity to Buy in One Trade: "
                                value={
                                    props.maxBuy +
                                        (props.maxBuy === 1
                                            ? " unit"
                                            : " unit") || "..."
                                }
                            />
                            <SmallerBox
                                title="Maximum Quantity to Sell in One Trade: "
                                value={
                                    props.maxSell +
                                        (props.maxBuy === 1
                                            ? " unit"
                                            : " unit") || "..."
                                }
                            />
                            <SmallerBox
                                title="Total Gains"
                                value={totalGains}
                            />
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    );
}
