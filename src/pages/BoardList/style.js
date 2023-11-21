import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;
    padding: 30px;
    * {
        font-size: 16px;
        color: #6f6257;
    }
`;

export const writeAndSearchBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

export const writeBoardBox = css`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 6px;
    padding: 5px;
    height: 35px;
    color: #6f6257;
    background-color: #f5efe6;
    cursor: pointer;
    & *:first-of-type {
        margin-right: 10px;
    }
`;

export const searchContainer = css`
    display: flex;
    align-items: center;
    & * {
        font-size: 15px;
    }
    .icon-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 6px;
        cursor: pointer;
    }
`;

export const searchInput = css`
    margin-left: 10px;
    border: 1px solid #a05b2c;
    border-radius: 5px;
    width: 250px;
    height: 40px;
    outline: none;
`;

export const searchIcon = css`
    padding: 8px 5px;
`;

export const categoryBox = css`
    display: flex;
    align-items: center;
    border-radius: 40px;
    margin: 20px 0;
    padding: 10px;
    background-color: #8c8179;
    & *:not(:first-of-type) {
        margin-left: 10px;
    }
`;

export const category = css`
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 15px;
    background-color: #fffbf5;
    cursor: pointer;
`;

export const table = css`
    margin-top: 30px;
    border-collapse: collapse;
    border-radius: 6px;
    width: 100%;
    min-width: 500px;
    box-shadow: 2px 2px 5px 0px rgba(111, 98, 87, 0.2);
    background-color: #fffbf5;
    overflow: hidden;
    border-style: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & th,
    td {
        border: 1px solid #a05b2c;
        padding: 10px;
        height: 35px;
        font-size: 16px;
        text-align: center;
    }

    & th {
        background-color: #6f6257;
        color: #fff;
    }

    & td {
        cursor: pointer;
        background-color: #fff;
    }
`;

export const boardTitle = css`
    max-width: 500px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const pageNumbers = css`
    display: flex;

    align-items: center;
    margin-top: 10px;
    width: 200px;

    & button {
        cursor: pointer;
        margin: 0px 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        border: 1px solid #dbdbdb;
    }
`;
