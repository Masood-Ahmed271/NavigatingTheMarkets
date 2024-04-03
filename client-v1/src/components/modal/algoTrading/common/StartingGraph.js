import React, { useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { data } from "./data.js";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = () => {

    useEffect(() => {
        console.log(data);
    })

    const generateDataPoints = () => {
        const dps = [];
        for (let i = 0; i < data.length; i++) {
            dps.push({ x: new Date(data[i]['Date']), y: data[i]["Close"] });
        }
        return dps;
    };

    const options = {
        theme: "light2",
        title: {
            text: "FB Stock Visualization",
        },
        subtitles: [
            {
                text: "Close Price vs Date",
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
                        name: "FB Stock Data",
                        title: "FB Stock Data",
                        showInLegend: true,
                        color: "#3576a8",
                        yValueFormatString: "$##0.00",
                        xValueFormatString: "MMM DD YYYY",
                        dataPoints: generateDataPoints(),
                    },
                ],
            },
        ],
        // navigator: {
        //     slider: {
        //         minimum: new Date(data[0]['Date']),
        //         maximum: new Date(data[-1]['Date']),
        //     },
        // },
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
