import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { chartSidebarContainer } from "./style";
import ChartProfileArea from "./ChartProfileArea";
import ChartSidebarPeriodTab from "./ChartSidebarPeriodTab";
import { chartProfileDummyDataObj } from "./chartDummyData";
import { rcChartLabelList } from "../../store/atoms/chartAtoms";
/** @jsxImportSource @emotion/react */

function ChartSidebar() {
    const [chartLabel, setChartLabel] = useRecoilState(rcChartLabelList);

    useEffect(() => {
        console.log(chartLabel);
    }, [chartLabel]);

    return (
        <div css={chartSidebarContainer}>
            <ChartSidebarPeriodTab />
            {chartProfileDummyDataObj.map(ele => {
                return <ChartProfileArea setChartLabel={setChartLabel} chartLabel={chartLabel} key={ele.profileName} profileName={ele.profileName} imgSrc={ele.profileImgSrc} />;
            })}
        </div>
    );
}

export default ChartSidebar;
