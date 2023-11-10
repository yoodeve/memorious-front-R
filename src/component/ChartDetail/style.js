import { css } from "@emotion/react";

export const chartTableWrap = css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    place-items: center;
    margin: 0 auto;
    width: 600px;
    height: 400px;
    h1 {
        font-size: 34px;
        text-align: center;
        font-family: "Pretendard-SemiBold";
    }
    .ant-table-tbody > tr > td {
        padding: 0.8rem;
        text-align: center;
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
    &:nth-of-type(1) {
        width: 80px;
    }
`;
