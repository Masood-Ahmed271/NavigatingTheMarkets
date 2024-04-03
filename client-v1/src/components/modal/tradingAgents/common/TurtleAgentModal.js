import {
    Box,
    Button,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    Heading,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
    Stack,
    InputGroup,
    InputLeftAddon,
    Input,
    Text,
    Spinner,
} from "@chakra-ui/react";

import React, { useState, useRef } from "react";
import axios from "axios";

import { SettingsIcon, ArrowUpIcon, RepeatIcon } from "@chakra-ui/icons";

import StockChart from "./StockChart";
import LogWaitingBox from "./LogWaitingBox";
import ModelInformation from "./ModelInformation";
import Card from "components/card/Card";

export default function TurtleAgentModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const textColor = useColorModeValue("navy.700", "white");

    // States
    const [size, setSize] = useState("md");
    const [open, setIsOpen] = useState(false);
    const [initialMoney, setInitialMoney] = useState("1000");
    const [maxBuy, setMaxBuy] = useState("1");
    const [maxSell, setMaxSell] = useState("1");
    const [investmentReturns, setInvestmentReturns] = useState(0);
    const [logs, setLogs] = useState([]);
    const [statesBuy, setStatesBuy] = useState([]);
    const [statesSell, setStatesSell] = useState([]);
    const [totalGains, setTotalGains] = useState(0);
    const [close, setClose] = useState([]);
    const [csv, setCsv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTraining, setIsTraining] = useState(false);

    // Refs
    const hiddenFileInput = useRef(null);

    // Event Handlers
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleFileUpload = (event) => {
        setCsv(event.target.files[0]);
    };

    const handleSizeClick = (newSize) => {
        setSize(newSize);
        onOpen();
    };

    const openForm = () => {
        setIsOpen(!open);
    };

    const handleInitialMoneyChange = (event) => {
        setInitialMoney(event.target.value);
    };

    const handleMaxBuyChange = (event) => {
        setMaxBuy(event.target.value);
    };

    const handleMaxSellChange = (event) => {
        setMaxSell(event.target.value);
    };

    const handleTrainClick = async () => {
        // Validation Checks
        if (!initialMoney || !maxBuy || !maxSell) {
            alert("Please enter valid numbers/decimals for all fields.");
            return;
        } else if (!csv) {
            alert("Please upload an OHLCV csv!");
            return;
        }
        // converting the inputs from string to float
        try {
            var convertedInitialMoney = parseFloat(initialMoney);
            var convertedMaxBuy = parseFloat(maxBuy);
            var convertedMaxSell = parseFloat(maxSell);
        } catch (error) {
            alert("Please enter valid numbers/decimals for all fields.");
            return;
        }
        setIsTraining(true);

        const fd = new FormData();
        fd.append("file", csv);
        fd.append(
            "data",
            JSON.stringify({
                initial_money: convertedInitialMoney,
                max_buy: convertedMaxBuy,
                max_sell: convertedMaxSell,
            })
        );

        console.log("Sending Request");
        try {
            const response = await axios.post(props.api, fd);

            const data = response.data;
            console.log();
            console.log("DATA RETURNED BACK from turtle: ");
            console.log(data);
            console.log();
            setInvestmentReturns(data["invest"]);
            setLogs(data["logs"]);
            setStatesBuy(data["states_buy"]);
            setStatesSell(data["states_sell"]);
            setTotalGains(data["total_gains"]);
            setLoading(false);
            setIsTraining(false);
            setClose(data["close"]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Flex
                flexDirection="row"
                gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
            >
                <Button
                    onClick={() => handleSizeClick("full")}
                    key={"full"}
                    m={4}
                    variant="brand"
                >
                    learn more
                </Button>
            </Flex>

            <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <br />
                        <Heading
                            color={textColor}
                            fontSize="36px"
                            style={{ marginBottom: 30 }}
                        >
                            {props.fullForm}
                        </Heading>

                        <Box
                            color="black"
                            p="3"
                            bgGradient="linear(to-l, #ededed, #c9e9f6)"
                            style={{ borderTopLeftRadius: 10 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Button
                                colorScheme="telegram"
                                variant="solid"
                                onClick={openForm}
                            >
                                {" "}
                                <SettingsIcon boxSize={8} color="black" />{" "}
                                &nbsp; Tune Hyperparameters{" "}
                            </Button>
                            <Stack direction="row">
                                <Input
                                    type="file"
                                    display="none"
                                    onChange={handleFileUpload}
                                    ref={hiddenFileInput}
                                />
                                {isTraining ? (
                                    <Spinner style={{ marginRight: 50 }} />
                                ) : (
                                    ""
                                )}
                                <Button
                                    leftIcon={<ArrowUpIcon />}
                                    colorScheme="twitter"
                                    variant="solid"
                                    onClick={handleClick}
                                >
                                    Upload OHLCV CV
                                </Button>
                                <Button
                                    leftIcon={<RepeatIcon />}
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={handleTrainClick}
                                >
                                    Train using uploaded data
                                </Button>
                            </Stack>
                        </Box>
                        <Box
                            w="100%"
                            h="200px"
                            bgGradient="linear(to-l, #ededed, #c9e9f6)"
                            display={open ? "visible" : "none"}
                            style={{
                                borderBottomLeftRadius: 10,
                                marginBottom: 50,
                            }}
                        >
                            <Stack direction="column">
                                <InputGroup
                                    size="sm"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        margin: 20,
                                    }}
                                >
                                    <InputLeftAddon
                                        marginRight="10"
                                        color="white"
                                        bg="black"
                                    >
                                        Initial Money
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="initial Money"
                                        defaultValue={initialMoney}
                                        onChange={handleInitialMoneyChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                    <InputLeftAddon
                                        marginRight="10"
                                        color="white"
                                        bg="black"
                                    >
                                        Maximum Quantity to Buy in One Trade
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="maximum buy Money"
                                        defaultValue={maxBuy}
                                        onChange={handleMaxBuyChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                    <InputLeftAddon
                                        marginRight="10"
                                        color="white"
                                        bg="black"
                                    >
                                        Maximum Quantity to Sell in One Trade
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="max sell"
                                        defaultValue={maxSell}
                                        onChange={handleMaxSellChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                </InputGroup>
                            </Stack>
                        </Box>

                        <StockChart
                            investmentReturns={investmentReturns}
                            logs={logs}
                            statesBuy={statesBuy}
                            statesSell={statesSell}
                            totalGains={totalGains}
                            close={close}
                        />

                        <ModelInformation
                            initialMoney={initialMoney}
                            maxBuy={maxBuy}
                            maxSell={maxSell}
                            totalGains={totalGains}
                        />
                        <>
                            <Flex>
                                <Box w="35%" style={{ marginRight: 100 }}>
                                    <Card
                                        p="20px"
                                        style={{
                                            border: "1px solid gray",
                                        }}
                                    >
                                        <Text>{props.description}</Text>
                                    </Card>
                                </Box>
                                <Box>
                                    <LogWaitingBox logs={logs} />
                                </Box>
                            </Flex>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
