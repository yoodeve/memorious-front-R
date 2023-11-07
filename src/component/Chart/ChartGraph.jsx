/* eslint-disable no-unused-vars */
import React from "react";
import FbsChart from "./FbsChart";
import StepChart from "./StepChart";
import PulseChart from "./PulseChart";
import { chartWrapper } from "./style";

function ChartGraph() {
    return (
        <>
            <FbsChart />
            <StepChart />
            <PulseChart />
        </>
    );
}

export default ChartGraph;
