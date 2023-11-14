import { css } from "@emotion/react";
import React from "react";
/** @jsxImportSource @emotion/react */

const badge = ({ color }) => css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${color};
    margin: 5px 5px;
    cursor: pointer;
`;

function LabelColorBadge({ color, onClick }) {
    return <div css={badge({ color })} onClick={onClick} />;
}

export default LabelColorBadge;
