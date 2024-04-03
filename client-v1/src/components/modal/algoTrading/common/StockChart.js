import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = (props) => {
    const [trainDate, setTrainDate] = useState([]);
    const [trainOriginalPrice, setTrainOriginalPrice] = useState([]);
    const [validDate, setValidDate] = useState([]);
    const [validOriginalPrice, setValidOriginalPrice] = useState([]);
    const [validPredictionPrice, setValidPredictionPrice] = useState([]);
    const [trainPredictionPrice, setTrainPredictionPrice] = useState([]);

    useEffect(() => {
        setTrainDate(props.trainStockDate);
        setTrainOriginalPrice(props.trainOriginalPrice);
        setValidDate(props.validStockDate);
        setValidOriginalPrice(props.validOriginalPrice);
        setValidPredictionPrice(props.validPredictionPrice);
        setTrainPredictionPrice(props.trainPredictionPrice);
        generateDataPointsTrain();
        generateDataPointsValid();
        generateDataPointsTrainPred();
        generateDataPointsValidPred();
    }, [
        trainDate,
        trainOriginalPrice,
        validDate,
        validOriginalPrice,
        validPredictionPrice,
        trainPredictionPrice,
    ]);

    const generateDataPointsTrain = () => {
        const dps = [];
        for (let i = 0; i < trainDate.length; i++) {
            dps.push({ x: new Date(trainDate[i]), y: trainOriginalPrice[i] });
        }
        return dps;
    };

    const generateDataPointsValid = () => {
        const dps = [];
        for (let i = 0; i < validDate.length; i++) {
            dps.push({ x: new Date(validDate[i]), y: validOriginalPrice[i] });
        }
        return dps;
    };

    const generateDataPointsTrainPred = () => {
        const dps = [];
        for (let i = 0; i < trainDate.length; i++) {
            dps.push({ x: new Date(trainDate[i]), y: trainPredictionPrice[i] });
        }
        return dps;
    };

    const generateDataPointsValidPred = () => {
        const dps = [];
        for (let i = 0; i < validDate.length; i++) {
            dps.push({ x: new Date(validDate[i]), y: validPredictionPrice[i] });
        }
        return dps;
    };

    const options = {
        theme: "light2",
        title: {
            text: "Stock Trend Comparison",
        },
        subtitles: [
            {
                text: "Close Price-Date Trend",
            },
        ],
        animationEnabled: true,
        exportEnabled: true,
        charts: [
            {
                axisX: {
                    labelAngle: -50,
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                        valueFormatString: "MMM DD YYYY",
                    },
                },
                axisY: {
                    title: "Closing Price (in Dollars)",
                    valueFormatString: "$##0.00",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                        labelFormatter: function (e) {
                            return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                        },
                    },
                },
                data: [
                    {
                        type: "spline",
                        name: "Train original",
                        title: "Train original",
                        showInLegend: true,
                        color: "#3576a8",
                        yValueFormatString: "$##0.00",
                        xValueFormatString: "MMM DD YYYY",
                        dataPoints: generateDataPointsTrain(),
                    },
                    {
                        type: "spline",
                        name: "Validation original",
                        title: "Validation original",
                        showInLegend: true,
                        color: "#000000",
                        yValueFormatString: "$##0.00",
                        xValueFormatString: "MMM DD YYYY",
                        dataPoints: generateDataPointsValid(),
                    },
                    {
                        type: "spline",
                        name: "Train Prediction",
                        title: "Train Prediction",
                        showInLegend: true,
                        color: "#3cb043",
                        yValueFormatString: "$##0.00",
                        xValueFormatString: "MMM DD YYYY",
                        dataPoints: generateDataPointsTrainPred(),
                    },
                    {
                        type: "spline",
                        name: "Valid Prediction",
                        title: "Valid Prediction",
                        showInLegend: true,
                        color: "#ff0000",
                        yValueFormatString: "$##0.00",
                        xValueFormatString: "MMM DD YYYY",
                        dataPoints: generateDataPointsValidPred(),
                    },
                ],
            },
        ],
        navigator: {
            slider: {
                minimum: new Date(trainDate[0]),
                maximum: new Date(trainDate[-1]),
            },
        },
    };

    const containerProps = {
        width: "100%",
        height: "450px",
        margin: "auto",
    };

    return (
        <div>
            <div>
                <CanvasJSStockChart containerProps={containerProps} options={options} />
            </div>
        </div>
    );
};

export default StockChart;
