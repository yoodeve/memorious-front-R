import React from "react";
import { chartSidebarContainer } from "./style";
import ChartProfileArea from "./ChartProfileArea";
import ChartSidebarPeriodTab from "./ChartSidebarPeriodTab";
import { chartProfileDummyDataObj } from "./chartDummyData";
/** @jsxImportSource @emotion/react */

function ChartSidebar() {
    return (
        <div css={chartSidebarContainer}>
            <ChartSidebarPeriodTab />
            {chartProfileDummyDataObj.map(ele => {
                return <ChartProfileArea key={ele.profileName} profileName={ele.profileName} imgSrc={ele.profileImgSrc} />;
            })}
        </div>
    );
}

export default ChartSidebar;
