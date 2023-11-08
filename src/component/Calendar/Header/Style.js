import { css } from "@emotion/react";

export const SHeaderContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 30px;
`;

export const SHeaderLeft = css`
    display: flex;
    align-items: center;
`;
export const STodayBtn = css`
    width: 60px;
    height: 40px;
    margin-right: 20px;
`;
export const Sbtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0px;
    margin-right: 20px;
    background-color: transparent;

    & > span {
        font-family: "Pretendard-ExtraBold";
        font-size: 1.2rem;
    }
    :hover {
        background-color: #f9f9f9;
    }
`;

export const SheaderDisplay = css`
    font-size: 26px;
`;
