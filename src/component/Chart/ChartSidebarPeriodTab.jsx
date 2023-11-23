import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { periodLabel, periodTab } from "./style";
import { chartPeriodArray } from "./chartDummyData";
import { rcChartStartDate } from "../../store/atoms/chartAtoms";
/** @jsxImportSource @emotion/react */

function ChartSidebarPeriodTab() {
    const [checked, setChecked] = useState(0);
    const [startDate, setStartDate] = useRecoilState(rcChartStartDate);
    const onChangeRadio = (e, index) => {
        setChecked(index);
        setStartDate(e);
    };
    useEffect(() => {
        console.log(startDate);
    }, [startDate]);
    return (
        <div css={periodTab}>
            <span>기간</span>
            <div css={periodLabel}>
                {chartPeriodArray.map((e, index) => (
                    <div key={e}>
                        <input onChange={() => onChangeRadio(e, index)} checked={checked === index} type="radio" name="period" id={`checkbox${index}`} />
                        <label htmlFor={`checkbox${index}`}>{e}달</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChartSidebarPeriodTab;
