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
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Center,
    Spinner,
} from "@chakra-ui/react";

import React, { useState, useRef } from "react";
import axios from "axios";

import { SettingsIcon, ArrowUpIcon, RepeatIcon } from "@chakra-ui/icons";

import StockChart from "./StockChart";
import LossGraph from "./LossGraph";
import WaitingBox from "./WaitingBox";
import WaitingBox2 from "./WaitingBox2";
import InitialGraph from "./StartingGraph";
import Card from "components/card/Card";

export default function CommonModel(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const textColor = useColorModeValue("navy.700", "white");

    // States
    const [size, setSize] = useState("md");
    const [open, setIsOpen] = useState(false);
    const [batchSize, setBatchSize] = useState("8");
    const [epochs, setEpochs] = useState("50");
    const [windowSize, setWindowSize] = useState("3");
    const [trainRate, setTrainRate] = useState("0.8");
    const [dropRate, setDropRate] = useState("0.15");
    const [units, setUnits] = useState("80");
    const [csv, setCsv] = useState(null);
    const [trainDate, setTrainDate] = useState([]);
    const [validDate, setValidDate] = useState([]);
    const [trainOriginalPrice, setTrainOriginalPrice] = useState([]);
    const [validOriginalPrice, setValidOriginalPrice] = useState([]);
    const [validPredictionPrice, setValidPredictionPrice] = useState([]);
    const [trainPredictionPrice, setTrainPredictionPrice] = useState([]);
    const [modelLoss, setModelLoss] = useState([]);
    const [meanMape, setMeanMape] = useState([]);
    const [meanNormRmse, setMeanNormRmse] = useState([]);
    const [meanRmse, setMeanRmse] = useState([]);
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

    const handleBatchSizeChange = (event) => {
        setBatchSize(event.target.value);
    };

    const handleTrainRateChange = (event) => {
        setTrainRate(event.target.value);
    };

    const handleWindowSizeChange = (event) => {
        setWindowSize(event.target.value);
    };

    const handleDropRateChange = (event) => {
        setDropRate(event.target.value);
    };

    const handleEpochsChange = (event) => {
        setEpochs(event.target.value);
    };

    const handleUnitsChange = (event) => {
        setUnits(event.target.value);
    };

    const handleTrainClick = async () => {
        // Validation Checks
        if (
            !dropRate ||
            !trainRate ||
            !epochs ||
            !units ||
            !windowSize ||
            !batchSize
        ) {
            alert("Please enter valid numbers/decimals for all fields.");
            return;
        } else if (!csv) {
            alert("Please upload csv.");
            return;
        }
        // converting the inputs from string to float
        try {
            var convertedWindowSize = parseFloat(windowSize);
            var convertedTrainRate = parseFloat(trainRate);
            var convertedDropRate = parseFloat(dropRate);
            var convertedBatchSize = parseFloat(batchSize);
            var convertedLstmGruUnits = parseFloat(units);
            var convertedEpochs = parseFloat(epochs);
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
                window_size: convertedWindowSize,
                train_rate: convertedTrainRate,
                drop_rate: convertedDropRate,
                batch_size: convertedBatchSize,
                lstm_gru_units: convertedLstmGruUnits,
                epochs: convertedEpochs,
            })
        );

        console.log("Sending Request");
        try {
            const response = await axios.post(props.api, fd);

            const data = response.data;
            console.log(data);
            setTrainDate(data["date_train"]);
            setTrainOriginalPrice(data["train_original_price"]);
            setValidDate(data["date_valid"]);
            setValidOriginalPrice(data["valid_original_price"]);
            setTrainPredictionPrice(data["train_prediction_price"]);
            setValidPredictionPrice(data["valid_prediction_price"]);
            setMeanMape(data["mean_mape"]);
            setMeanNormRmse(data["mean_norm_rmse"]);
            setMeanRmse(data["mean_rmse"]);
            setModelLoss(data["model_loss"]);
            setLoading(false);
            setIsTraining(false);
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
                    visualize
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
                            <Button colorScheme="telegram" variant="solid" onClick={openForm}>
                                {" "}
                                <SettingsIcon boxSize={8} color="black" />{" "}
                                &nbsp; Settings{" "}
                            </Button>
                            <Stack direction="row">
                                <Input
                                    type="file"
                                    display="none"
                                    onChange={handleFileUpload}
                                    ref={hiddenFileInput}
                                    // accept=".csv"
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
                                    Upload CSV
                                </Button>
                                <Button
                                    leftIcon={<RepeatIcon />}
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={handleTrainClick}
                                >
                                    Train
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
                                        Window Size
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="window size"
                                        defaultValue={windowSize}
                                        onChange={handleWindowSizeChange}
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
                                        Train Rate
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="train rate"
                                        defaultValue={trainRate}
                                        onChange={handleTrainRateChange}
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
                                        Drop Rate
                                    </InputLeftAddon>
                                    <Input
                                        isDisabled={props.isDisabledDropRate}
                                        type="number"
                                        bg="#fff"
                                        placeholder="drop rate"
                                        defaultValue={dropRate}
                                        onChange={handleDropRateChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                </InputGroup>

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
                                        Batch Size
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        placeholder="batch size"
                                        defaultValue={batchSize}
                                        onChange={handleBatchSizeChange}
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
                                        Epochs
                                    </InputLeftAddon>
                                    <Input
                                        isRequired="True"
                                        placeholder="epochs"
                                        defaultValue={epochs}
                                        onChange={handleEpochsChange}
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
                                        LSTM/GRU Units
                                    </InputLeftAddon>
                                    <Input
                                        isDisabled={props.isDisabledUnits}
                                        type="number"
                                        bg="#fff"
                                        placeholder="units"
                                        defaultValue={units}
                                        onChange={handleUnitsChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                </InputGroup>
                            </Stack>
                        </Box>
                        <Box
                            w="100%"
                            style={{ marginTop: 70, marginBottom: 100 }}
                        >
                            {loading ? (
                                <InitialGraph />
                            ) : (
                                <StockChart
                                    trainOriginalPrice={trainOriginalPrice}
                                    trainStockDate={trainDate}
                                    validOriginalPrice={validOriginalPrice}
                                    validStockDate={validDate}
                                    trainPredictionPrice={trainPredictionPrice}
                                    validPredictionPrice={validPredictionPrice}
                                />
                            )}
                        </Box>
                        {loading ? (
                            <WaitingBox2 />
                        ) : (
                            // <Center w="80%" style={{ marginBottom: 100, marginLeft: 150 }}>
                            <Box p={10} style={{ marginBottom: 40, display: 'flex', alignItems: 'center' }}>
                                <Card p="50px" w='60%' style={{ border: "1px solid gray", marginRight: "30px" }}>
                                    <Text as='i' mb='10px'> Mean Norm RMSE over 10 iterations</Text>
                                    <Text as='b'>{meanNormRmse} </Text>
                                </Card>
                                <Card p="50px" w='60%' style={{ border: "1px solid gray", marginRight: "30px" }}>
                                    <Text as='i' mb='10px'> Mean RMSE over 10 iterations </Text>
                                    <Text as='b'> {meanRmse}</Text>
                                </Card>
                                <Card p="50px" w='60%' style={{ border: "1px solid gray", marginRight: "30px" }}>
                                    <Text as='i' mb='10px'> Mean Mape over 10 iterations</Text>
                                    <Text as='b'> {meanMape}</Text>
                                </Card>
                            </Box>
                            // </Center>
                        )}
                        <Flex>
                            <Box w="50%" style={{ marginRight: 100 }}>
                                <Card p="20px" style={{ border: "1px solid gray" }}>
                                    <Text >{props.description}</Text>
                                </Card>
                            </Box>
                            <Box>
                                {loading ? (
                                    <WaitingBox />
                                ) : (
                                    <LossGraph modelLoss={modelLoss} />
                                )}
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
