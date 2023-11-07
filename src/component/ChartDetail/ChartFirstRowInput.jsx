import React, { useState } from "react";
import dayjs from "dayjs";
import { firstRowInput } from "./style";
/** @jsxImportSource @emotion/react */

function ChartTableFirstRowInput({ type }) {
    const [healthInfo, setHealthInfo] = useState({
        step: 0,
        fbs: 0,
        date: dayjs().format("YYYY-MM-DD"),
        pulse: 0,
    });

    const onChange = e => {
        const { value, name } = e.target;
        setHealthInfo({
            ...healthInfo,
            [name]: value,
        });
    };

    return <input css={firstRowInput} name={type} value={healthInfo[type]} onChange={onChange} type="text" />;
}

export default ChartTableFirstRowInput;
