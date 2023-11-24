import { css } from "@emotion/react";

export const boardDetailBox = css`
    width: 100%;
    min-width: 800px;
    height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const boardDetailContainer = css`
    width: calc(100% - 40px);
    min-width: 800px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px;
    background-color: #fffbf5;
    border-radius: 6px;
    border: 1px solid #6f6257;
    .detail-header-left {
        width: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .border-left-box {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #6f6357;
    }
    span {
        color: #666;
        font-size: 1.2rem;
        width: max-content;
        padding: 10px;
        &.board-id {
        }
        &.title {
            flex-grow: 1;
        }
        &.nickname {
        }
        &.date {
            width: 250px !important;
        }
        pre {
            width: 100%;
            min-width: 800px;
            height: 900px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }
    }
`;
export const contentWrapper = css`
    width: calc(100% - 40px);
    height: 100%;
    padding: 40px;
    border-radius: 6px;
    border: 1px solid #6f6357;
    margin: 20px;
    pre {
        h1 {
            line-height: 2rem;
            font-size: 2rem;
        }
        p {
            line-height: 1.1rem;
            font-size: 1.1rem;
            width: 100%;
        }
    }
`;
