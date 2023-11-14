import React from "react";
import { chartTableWrap } from "./style";
/** @jsxImportSource @emotion/react */

function ChartTableContainer({ children }) {
    return <div css={chartTableWrap}>{children}</div>;
}

export default ChartTableContainer;
