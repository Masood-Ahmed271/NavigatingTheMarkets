import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

import TurtleAgentLogo from "assets/img/tradingAgents/turtle_agent.png";
import TurtleAgent from "components/card/tradingAgents/TurtleAgent";
import SingleRollingAgentLogo from "assets/img/tradingAgents/single_rolling_agent.jpeg";
import SingleRollingAgent from "components/card/tradingAgents/SingleRollingAgent";
import MovingAverageAgentLogo from "assets/img/tradingAgents/moving_average_agent.png";
import MovingAverageAgent from "components/card/tradingAgents/MovingAverageAgent";
import EvolutionStratergyAgentLogo from "assets/img/tradingAgents/evolution_stratergy_agent.jpeg";
import EvolutionStratergyAgent from "components/card/tradingAgents/EvolutionStratergyAgent";

export default function TradingAgentsPage() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Grid
                mb="20px"
                gridTemplateColumns={{
                    xl: "repeat(2, 1fr)",
                    "2xl": "1fr 0.46fr",
                }}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <Flex direction="column">
                        <Flex
                            mt="45px"
                            mb="20px"
                            justifyContent="space-between"
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "start", md: "center" }}
                        >
                            <Text
                                color={textColor}
                                fontSize="2xl"
                                ms="24px"
                                fontWeight="700"
                            >
                                Explore
                            </Text>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                            <TurtleAgent
                                modelName="Turtle Agent"
                                fullModelName="Single Movement Turtle"
                                image={TurtleAgentLogo}
                            />
                            <SingleRollingAgent
                                modelName="Single Rolling Agent"
                                fullModelName="Single Movement Rolling"
                                image={SingleRollingAgentLogo}
                            />
                            <MovingAverageAgent
                                modelName="Moving Average Agent"
                                fullModelName="Weighted Moving Average"
                                image={MovingAverageAgentLogo}
                            />
                            <EvolutionStratergyAgent
                                modelName="Evolution Stratergy Agent"
                                fullModelName="Deep Learning Evolution Stratergy"
                                image={EvolutionStratergyAgentLogo}
                            />
                        </SimpleGrid>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
                ></Flex>
            </Grid>
        </Box>
    );
}
