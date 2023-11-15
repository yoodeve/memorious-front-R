import { css } from "@emotion/react";

export const SHeaderContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 10px;
`;

export const SFlex = css`
    display: flex;
    align-items: center;

    & > button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const STodayBtn = css`
    width: 60px;
    height: 40px;
    margin-right: 20px;
`;

export const SMonthbtn = css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0px;
    background-color: transparent;

    & > span {
        font-family: "Pretendard-ExtraBold";
        font-size: 1.2rem;
    }
`;
export const SheaderDisplay = css`
    font-size: 28px;
    margin: 0px 10px;
`;

export const SAddBtn = css`
    height: 40px;
    margin-left: 20px;
    font-size: 24px;
    & > span {
        font-size: 16px;
    }
`;
