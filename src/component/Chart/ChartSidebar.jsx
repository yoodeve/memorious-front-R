import React from "react";
import { useRecoilState } from "recoil";
import { chartSidebarContainer } from "./style";
import ChartSidebarPeriodTab from "./ChartSidebarPeriodTab";
import { chartProfileDummyDataObj } from "./chartDummyData";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";
import ChartProfileArea from "./ChartProfileArea";
/** @jsxImportSource @emotion/react */

function ChartSidebar() {
    const [chartLabel, setChartLabel] = useRecoilState(rcUserOnChartArray);

    return (
        <div css={chartSidebarContainer}>
            <ChartSidebarPeriodTab />
            {chartProfileDummyDataObj.map((ele, i) => {
                return <ChartProfileArea index={i} setChartLabel={setChartLabel} chartLabel={chartLabel} key={ele.profileName} profileName={ele.profileName} imgSrc={ele.profileImgSrc} />;
            })}
        </div>
    );
}

export default ChartSidebar;
