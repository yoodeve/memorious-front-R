import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const SPanelBox = css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
`;

export const SFlexBox = css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const SRepeatBox = css`
    padding-left: 10px;
`;

export const SCycleBox = css`
    height: 25px;
`;

export const SRepeatEnd = css`
    height: 25px;
    font-size: 14px;
    font-weight: 600;
`;

export const SRepeatTypeBox = css`
    display: flex;
    height: 25px;
    align-items: center;
`;

export const STime = css`
    border: 1px solid #d9d9d9;
    :nth-of-type(1) {
        border-right: none;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    :nth-of-type(2) {
        border-left: none;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
`;
