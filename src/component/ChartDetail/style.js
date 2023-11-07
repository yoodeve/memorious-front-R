import { css } from "@emotion/react";

export const chartTableWrap = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    place-items: center;
    margin: 0 auto;
    h1 {
        font-size: 34px;
        text-align: center;
        font-family: "Pretendard-SemiBold";
    }
`;

export const firstRowDateInput = css`
    width: 80px;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid #666;
`;

export const firstRowInput = css`
    text-align: center;
    width: 60px;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid #666;
`;
