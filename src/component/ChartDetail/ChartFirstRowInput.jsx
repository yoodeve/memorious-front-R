import React from "react";
import { useRecoilState } from "recoil";
import { firstRowInput } from "./style";
import { rcTableData } from "../../store/atoms/chartTableAtoms";
/** @jsxImportSource @emotion/react */

function ChartTableFirstRowInput({ type }) {
    const [healthInfo, setHealthInfo] = useRecoilState(rcTableData);

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
