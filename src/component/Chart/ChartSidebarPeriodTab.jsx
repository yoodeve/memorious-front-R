import React, { useState } from "react";
import { periodLabel, periodTab } from "./style";
import { chartPeriodArray } from "./chartDummyData";
/** @jsxImportSource @emotion/react */

function ChartSidebarPeriodTab() {
    const [checked, setChecked] = useState(0);
    const onChangeRadio = index => {
        setChecked(index);
    };
    return (
        <div css={periodTab}>
            <span>기간</span>
            <div css={periodLabel}>
                {chartPeriodArray.map((e, index) => (
                    <div key={e}>
                        <input onChange={() => onChangeRadio(index)} checked={checked === index} type="radio" name="period" id={`checkbox${index}`} />
                        <label htmlFor={`checkbox${index}`}>{e}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChartSidebarPeriodTab;
