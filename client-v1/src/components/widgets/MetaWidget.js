import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, memo } from "react";

function MetaWidget() {
    const container = useRef();
    const script = document.createElement("script");
    useEffect(() => {
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "symbols": [
            [
              "Meta",
              "META|1D"
            ]
          ],
          "chartOnly": false,
          "width": 800,
          "height": 500,
          "locale": "en",
          "colorTheme": "light",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
        container.current.appendChild(script);
    }, [script, container]);

    return (
        <Box py="15px">
            <Flex
                my="auto"
                h="100%"
                align={{ base: "center", xl: "start" }}
                justify={{ base: "center", xl: "center" }}
            >
                <div className="tradingview-widget-container" ref={container}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </Flex>
        </Box>
    );
}

export default memo(MetaWidget);
