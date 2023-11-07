import React from "react";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";
import { Reset } from "styled-reset";
import Sidebar from "../../component/Sidebar";
/** @jsxImportSource @emotion/react */

const mainContainer = css`
    display: flex;
    justify-content: flex-start;
    max-width: 1100px;
    width: 70%;
    min-height: 100vh;
    margin: 0 auto;
    box-shadow:
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px;
    * {
        box-sizing: border-box;
        font-family: "Pretendard-Medium";
        font-size: 14px;
    }
`;

const contentsContainer = css`
    width: 860px;
`;

function SideBar() {
    return (
        <>
            <Reset />
            <div css={mainContainer}>
                <Sidebar />
                <div css={contentsContainer}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default SideBar;
