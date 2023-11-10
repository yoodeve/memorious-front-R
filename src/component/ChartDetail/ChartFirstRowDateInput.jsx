import React from "react";
import dayjs from "dayjs";
import { firstRowDateInput } from "./style";
/** @jsxImportSource @emotion/react */

function ChartFirstRowDateInput({ value, setValue }) {
    const date = dayjs().format("YYYY-MM-DD");
    return <input css={firstRowDateInput} value={value || date} onChange={setValue} type="text" />;
}

export default ChartFirstRowDateInput;
