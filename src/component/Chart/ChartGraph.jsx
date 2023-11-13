import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import FbsChart from "./FbsChart";
import { instance } from "../../config";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";
// import StepChart from "./StepChart";
// import PulseChart from "./PulseChart";

function ChartGraph() {
    const userList = useRecoilValue(rcUserOnChartArray);
    const getChartData = () => {
        instance.post("/api/chart/graph", { userList: [...userList], startDate: dayjs("2023-11-09") });
    };
    useEffect(() => {
        getChartData();
    }, [userList]);
    return (
        <>
            <FbsChart />
            {/* <StepChart /> */}
            {/* <PulseChart /> */}
        </>
    );
}

export default ChartGraph;
