import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const EvolutionStratergyStockChart = (props) => {
    // console.log(props);
    const limit = 252; //increase number of dataPoints by increasing this
    var y = 1000;
    var data = [];
    var dataSeries = { type: "spline" };
    var dataPoints = [];
    for (var i = 0; i < limit; i += 1) {
        y += Math.round(Math.random() * 10 - 5);

        if ([10, 18, 50, 98, 156, 189, 241].includes(i)) {
            dataPoints.push({
                x: i,
                y: y,
                indexLabel: "▲",
                indexLabelFontColor: "green",
            });
        } else if ([12, 20, 56, 42, 125, 162, 210, 223].includes(i)) {
            dataPoints.push({
                x: i,
                y: y,
                indexLabel: "▼",
                indexLabelFontColor: "red",
            });
        } else {
            dataPoints.push({ x: i, y: y });
        }
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);

    // console.log(data);
    if (props.close.length) {
        data = [];
        dataSeries = { type: "spline" };
        dataPoints = [];

        props.close.forEach((price, index) => {
            if (props.statesBuy.includes(index)) {
                dataPoints.push({
                    x: index,
                    y: price,
                    indexLabel: "▲",
                    indexLabelFontColor: "green",
                });
            } else if (props.statesSell.includes(index)) {
                dataPoints.push({
                    x: index,
                    y: price,
                    indexLabel: "▼",
                    indexLabelFontColor: "red",
                });
            } else {
                dataPoints.push({ x: index, y: price });
            }
        });
        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);
    }

    const options = {
        title: {
            text: "days vs closing price",
        },
        animationEnabled: true,
        exportEnabled: true,
        charts: [
            {
                axisX: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                    },
                },
                axisY: {
                    crosshair: {
                        enabled: true,
                    },
                    prefix: "$",
                },
                // toolTip: {
                //     shared: true,
                // },
                data: [...data],
            },
        ],
        rangeSelector: {
            inputFields: {
                startValue: 10,
                endValue: 250,
                valueFormatString: "###0",
            },

            buttons: [
                {
                    label: "10",
                    range: 10,
                    rangeType: "number",
                },
                {
                    label: "100",
                    range: 100,
                    rangeType: "number",
                },
                {
                    label: "500",
                    range: 500,
                    rangeType: "number",
                },
                {
                    label: "All",
                    rangeType: "all",
                },
            ],
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
                <CanvasJSStockChart
                    containerProps={containerProps}
                    options={options}
                />
            </div>
        </div>
    );
};

export default EvolutionStratergyStockChart;
