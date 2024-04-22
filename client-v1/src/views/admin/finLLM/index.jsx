import {
  Box,
  useColorModeValue,
  Select,
  Checkbox,
  Stack,
  Button,
} from "@chakra-ui/react";

import FinLLMBox from "./finLLMBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "constants";

export default function WidgetPage() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [ticker, setTicekr] = useState("");
  const [isNews, setNews] = useState(false);
  const [developments, setDevelopments] = useState("");
  const [concerns, setConcerns] = useState("");
  const [predictions, setPredictions] = useState("");
  const [summary, setSummary] = useState("");
  const [LLMNews, setLLMNews] = useState("");
  const [showNews, setShowNews] = useState(false);

  const tickers = [
    "AXP",
    "AMGN",
    "AAPL",
    "BA",
    "CAT",
    "CSCO",
    "CVX",
    "GS",
    "HD",
    // "HON",
    "IBM",
    "INTC",
    "JNJ",
    "KO",
    "JPM",
    "MCD",
    "MMM",
    "MRK",
    "MSFT",
    "NKE",
    "PG",
    "TRV",
    "UNH",
    "CRM",
    "VZ",
    "V",
    "WBA",
    "WMT",
    "DIS",
    "DOW",
  ];

  const handleOnClick = async () => {
    // Validation Checks
    if (!ticker) {
      alert("Please select a ticker");
      return;
    }

    // setIsTraining(true);
    const fd = new FormData();
    fd.append(
      "data",
      JSON.stringify({
        ticker: ticker,
        isNews: isNews,
      })
    );
    console.log("Sending Request");
    try {
      const response = await axios.post(API_ENDPOINT + "finllm", fd);
      const data = response.data;
      console.log(data);
      setDevelopments(data["positiveDevelopments"]);
      setConcerns(data["potentialConcerns"]);
      setPredictions(data["predictionAnlysis"]);
      setSummary(data["summary"]);
      setLLMNews(data["news"]);
      //   setLoading(false);
      //   setIsTraining(false);
      if (isNews) {
        setShowNews(true);
      } else {
        setShowNews(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: "50px",
          marginTop: "20px",
        }}
      >
        <Box style={{ width: "50%" }}>
          <Select
            placeholder="Select Ticker"
            onChange={(event) => setTicekr(event.target.value)}
          >
            {tickers.map((ticker, index) => (
              <option key={index} value={ticker}>
                {ticker}
              </option>
            ))}
          </Select>
        </Box>
        <Checkbox onChange={(event) => setNews(!isNews)}>
          Get Current News
        </Checkbox>
        <Button colorScheme="twitter" onClick={handleOnClick} variant="outline">
          Run LLM!
        </Button>
      </Box>
      <Box style={{ width: "90%", margin: "auto" }}>
        {showNews && (
          <FinLLMBox title="News" desc={LLMNews} style={{ width: "100px" }} />
        )}

        <Stack spacing={8} direction="row">
          <FinLLMBox title="Summary" desc={summary} />
          <FinLLMBox title="Prediction & Analysis" desc={predictions} />
        </Stack>

        <FinLLMBox title="Positive Developments" desc={developments} />
        <FinLLMBox title="Potential Concerns" desc={concerns} />
      </Box>
    </Box>
  );
}
