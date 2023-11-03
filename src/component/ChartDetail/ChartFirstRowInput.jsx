import React, { useState } from "react";
import { firstRowInput } from "./style";
/** @jsxImportSource @emotion/react */

function ChartTableFirstRowInput() {
    const [value, setValue] = useState(0);
    const onChange = e => {
        setValue(e.target.value);
    };
    return <input css={firstRowInput} value={value} onChange={onChange} type="text" />;
}

export default ChartTableFirstRowInput;
