import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
// import { useInView } from "react-intersection-observer";
import FbsChart from "./FbsChart";
import { instance } from "../../config";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";
import StepChart from "./StepChart";
import PulseChart from "./PulseChart";
import { chartContainer, chartWrapper } from "./style";
/** @jsxImportSource @emotion/react */

function ChartGraph() {
    const userList = useRecoilValue(rcUserOnChartArray);
    const fbsRef = useRef();
    const [fbsData, setFbsData] = useState([]);
    const [stepData, setStepData] = useState([]);
    const [pulseData, setPulseData] = useState([]);

    const getChartData = async () => {
        const response = await instance.post("/api/chart/graph", { userList: [...userList], startDate: dayjs("2023-11-09") });
        const fbs = userList.map(user => Object.values(response.data[user]?.fbs));
        const step = userList.map(user => Object.values(response.data[user]?.step));
        const pulse = userList.map(user => Object.values(response.data[user]?.pulse));
        setFbsData(fbs);
        setStepData(step);
        setPulseData(pulse);
    };

    useEffect(() => {
        getChartData();
    }, [userList]);

    useEffect(() => {
        console.log(fbsRef);
    }, []);

    return (
        <div css={chartContainer}>
            <div css={chartWrapper}>
                <div>
                    <FbsChart chartData={fbsData} />
                    <div ref={fbsRef} />
                </div>
                <div>
                    <StepChart chartData={stepData} />
                    <div />
                </div>
                <div>
                    <PulseChart chartData={pulseData} />
                    <div />
                </div>
            </div>
        </div>
    );
}

export default ChartGraph;
