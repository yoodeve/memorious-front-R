import { css } from "@emotion/react";
import React from "react";
/** @jsxImportSource @emotion/react */

const notFound = css`
    width: 100%;
    height: 100vh;
    position: relative;
    h1 {
        color: #666;
        cursor: pointer;
        position: absolute;
        top: 35%;
        right: 50%;
        font-size: 4rem;
        transform: translateX(50%);
        transition: transform 1s ease;
        &:hover {
            transform: rotateY(360deg);
        }
    }
`;

function NotFound() {
    return (
        <div css={notFound}>
            <h1>404 Not Found</h1>
        </div>
    );
}

export default NotFound;
