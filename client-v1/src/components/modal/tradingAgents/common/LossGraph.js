import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import Card from 'components/card/Card'

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LossGraph = (props) => {
    const [modelLoss, setModelLoss] = useState([]);

    useEffect(() => {
        setModelLoss(props.modelLoss);
        generateDataPoints();
    }, [modelLoss]);

    const generateDataPoints = () => {
        const dps = [];
        var xVal = 1;
        for (let i = 0; i < modelLoss.length; i++) {
            dps.push({ x: xVal, y: modelLoss[i] });
            xVal += 1;
        }
        return dps;
    };

    const options = {
        animationEnabled: true,
        title: {
            text: "Loss Graph vs Epochs",
        },
        axisX: {
            title: "Epoch",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
            },
        },
        axisY: {
            title: "Loss",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
            },
        },
        data: [
            {
                type: "spline",
                dataPoints: generateDataPoints(),
            },
        ],
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default LossGraph;
