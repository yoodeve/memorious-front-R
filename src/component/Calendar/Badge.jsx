import React from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const badge = color => css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${color};
    margin: 0px 2px 0px 3px;
`;

function Badge({ color }) {
    return (
        <div>
            <div css={badge(color)} />
        </div>
    );
}

export default Badge;
