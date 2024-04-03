import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

import Banner from "views/admin/widgetPage/components/Banner";

import Apple from "assets/img/logos/apple.jpg";
import Google from "assets/img/logos/google.png";
import Microsoft from "assets/img/logos/microsoft.png";
import Intel from "assets/img/logos/intel.png";
import Nvidia from "assets/img/logos/nvidia.png";
import Meta from "assets/img/logos/meta.png";
import Tesla from "assets/img/logos/tesla.png";
import Amazon from "assets/img/logos/amazon.png";

import AppleCard from "components/card/AppleCard";
import GoogleCard from "components/card/GoogleCard";
import MicrosoftCard from "components/card/MicrosoftCard";
import AmazonCard from "components/card/AmazonCard";
import TeslaCard from "components/card/TeslaCard";
import MetaCard from "components/card/MetaCard";
import NvidiaCard from "components/card/NvidiaCard";
import IntelCard from "components/card/IntelCard";

export default function WidgetPage() {
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
                    <Banner />
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
                                Discover
                            </Text>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                            <AppleCard
                                name="APPLE"
                                incorporatedName="Apple Computer, Inc."
                                image={Apple}
                            />
                            <GoogleCard
                                name="GOOGLE"
                                incorporatedName="Google Inc."
                                image={Google}
                            />
                            <MicrosoftCard
                                name="MICROSOFT"
                                incorporatedName="
                                Microsoft Corporation"
                                image={Microsoft}
                            />
                            <AmazonCard
                                name="AMAZON"
                                incorporatedName="Amazon.com Inc"
                                image={Amazon}
                            />
                            <TeslaCard
                                name="TESLA"
                                incorporatedName="Tesla Inc."
                                image={Tesla}
                            />
                            <MetaCard
                                name="META"
                                incorporatedName="Meta Platforms inc."
                                image={Meta}
                            />
                            <NvidiaCard
                                name="NVIDIA"
                                incorporatedName="NVIDIA Corp."
                                image={Nvidia}
                            />
                            <IntelCard
                                name="INTEL"
                                incorporatedName=" 
                                Intel Corporation."
                                image={Intel}
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
