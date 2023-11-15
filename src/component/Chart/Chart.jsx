import React from "react";
import { ChartContiner } from "./style";
import ChartSidebar from "./ChartSidebar";
/** @jsxImportSource @emotion/react */

function Chart({ children }) {
    return (
        <div css={ChartContiner}>
            <ChartSidebar />
            {children}
        </div>
    );
}

export default Chart;
