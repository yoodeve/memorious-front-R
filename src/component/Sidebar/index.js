import React from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const sidebarContainer = css`
    position: relative;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fffbf5;
`;

const groupBoxWrapper = css`
    margin-top: 100px;
`;

const groupBox = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: baseline;
    height: fit-content;
    background-color: #f5efe6;
    padding: 20px;
    border-radius: 8px;
    &:nth-last-child(1) {
        margin-top: 20px;
    }
`;
const sideBarLabel = () => css`
    width: 200px;
    height: 40px;
    padding: 10px 0;
    border: 1px solid #6f6257;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 1.2rem;
    font-family: "Pretendard-Bold";
    color: #6f6257;
    cursor: pointer;
`;

const imageBox = css`
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("/assets/images/logo.png");
    background-size: cover;
    img {
        width: 100%;
    }
`;

function Sidebar() {
    return (
        <div css={sidebarContainer}>
            <div css={imageBox} />
            <div css={groupBoxWrapper}>
                <div css={groupBox}>
                    <div css={sideBarLabel}>캘린더</div>
                    <div css={sideBarLabel}>메모</div>
                    <div css={sideBarLabel}>게시판</div>
                    <div css={sideBarLabel}>체크리스트</div>
                </div>
                <div css={groupBox}>
                    <div css={sideBarLabel}>그래프</div>
                    <div css={sideBarLabel}>지도</div>
                </div>
            </div>
            <div>설정, 로그아웃</div>
        </div>
    );
}

export default Sidebar;
