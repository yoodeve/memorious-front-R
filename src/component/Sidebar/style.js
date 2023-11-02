import { css } from "@emotion/react";

export const sidebarContainer = css`
    position: relative;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fffbf5;
`;

export const groupBoxWrapper = css`
    margin-top: 100px;
`;

export const groupBox = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: baseline;
    height: fit-content;
    background-color: #f5efe6;
    border-radius: 8px;
    &.bottom-box {
        margin-top: 10px;
    }
    .group-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .group-box:nth-of-type(4)::after {
        content: "";
        display: block;
        width: 90%;
        height: 1px;
        background-color: #6f6257;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const sideBarLabel = css`
    width: 200px;
    height: 40px;
    padding: 10px 0;
    border: 1px solid #6f6257;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 1.2rem;
    font-family: "Pretendard-Bold";
    color: #6f6257;
    cursor: pointer;
    &.filled {
        background-color: #6f6257;
        color: #f5efe6;
        border-radius: 6px;
    }
`;

export const imageBox = css`
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
export const bottomSettingMenuBox = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    * {
        color: #6f6257;
        font-size: 11px;
    }
    .my-label {
        margin-left: 20px;
    }
    .right-titles {
        width: 60px;
        margin-right: 20px;
        display: flex;
        justify-content: space-between;
    }
`;
