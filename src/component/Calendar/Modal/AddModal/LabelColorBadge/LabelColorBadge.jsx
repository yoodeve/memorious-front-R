import React from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const badge = color => css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${color};
    margin: 5px 5px;
    cursor: pointer;
`;

function LabelColorBadge({ color }) {
    return (
        <div>
            <div css={badge(color)} />
        </div>
    );
}

export default LabelColorBadge;
