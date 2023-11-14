import { css } from "@emotion/react";

export const layout = css`
    padding: 10px;
    width: 100%;
    height: 100%;
    padding: 30px;
    background-color: #f5efe6;
    * {
        font-size: 16px;
    }
`;

export const writeAndSearchBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 10px;
`;

export const writeBoardBox = css`
    display: flex;
    align-items: center;
    border: 1px solid #6f6257;
    border-radius: 10px;
    padding: 5px;
    width: 100px;
    height: 40px;
    background-color: #fffbf5;
    cursor: pointer;
    & *:not(:nth-child(1)) {
        margin-left: 10px;
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

export const selectBox = css`
    width: 100px;
    border: none;
    .select-box {
        border: 1px solid #a05b2c;
        border-radius: 5px;
    }
`;

export const searchInput = css`
    margin-left: 10px;
    border: 1px solid #a05b2c;
    border-radius: 5px;
    width: 200px;
    height: 40px;
    outline: none;
`;

export const searchIcon = css`
    padding: 8px 5px;
`;

export const categoryBox = css`
    display: flex;
    align-items: center;
    border-radius: 25px;
    margin: 20px 0;
    padding: 15px;
    width: 100%;
    min-width: 500px;
    background-color: #8c8179;
`;

export const category = css`
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #fffbf5;
    cursor: pointer;
    &:not(:first-of-type) {
        margin-left: 10px;
    }
`;

export const table = css`
    margin-top: 30px;
    border-collapse: collapse;
    border-radius: 10px;
    width: 100%;
    min-width: 500px;
    box-shadow: 2px 2px 5px 0px rgba(111, 98, 87, 0.2);
    background-color: #fffbf5;
    overflow: hidden;
    border-style: hidden;

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

        &:last-child {
            width: 10%;
        }
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
