import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const MainContainer = css`
    margin: 36px 0px 20px 36px;
    font-size: 22px;

    & h1 {
        font-size: 42px;
        font-weight: 700;
        color: #6f6257;
    }

    & h2 {
        color: #6f6257;
        font-size: 28px;
        font-weight: 600;
    }
`;

export const infoContainer = css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding-left: 50px;

    & > div {
        margin-top: 30px;
    }
`;

export const userImgBox = css`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    overflow: hidden;
    cursor: pointer;

    & > img {
        width: 100%;
        height: 100%;
    }
`;

export const file = css`
    display: none;
`;

export const textBox = css`
    display: flex;
    margin-top: 24px;
    align-items: baseline;

    & > h2 {
        margin-right: 20px;
    }
    & > span {
        font-size: 20px;
    }
`;

export const socialTextBox = css`
    display: flex;
    align-items: center;
    margin-top: 20px;

    & > img {
        width: 36px;
        height: 36px;
        margin-left: 80px;
    }

    & span {
        padding-left: 20px;
        font-size: 20px;
    }
`;
