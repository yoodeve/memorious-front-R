import { css } from "@emotion/react";

export const layout = css`
    padding: 10px;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #f5efe6;
`;

export const searchContainer = css`
    margin: 20px 10px;
    & * {
        font-size: 15px;
    }
`;
export const selectBox = css`
    width: 100px;
    border: 1px solid #dbdbdb;
`;

export const searchInput = css`
    margin-left: 10px;
    border: 1px solid #a05b2c;
    border-radius: 5px;
    width: 200px;
    height: 30px;
    outline: none;
`;

export const searchIcon = css`
    /* margin-top: 5px; */
    padding: 8px 5px;
`;

export const categoryBox = css`
    display: flex;
    align-items: center;
    border-radius: 25px;
    margin: 20px 0 10px;
    padding: 10px;
    background-color: #6f6257;
`;

export const category = css`
    padding: 10px;
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
    max-width: 800px;
    box-shadow: 2px 2px 3px 3px rgba(111, 98, 87, 0.2);
    background-color: #fffbf5;
    overflow: hidden;
    border-style: hidden;
    & th {
        background-color: #fffbf5;
    }

    & th,
    td {
        border: 1px solid #a05b2c;
        padding: 8px;
        height: 30px;
        text-align: center;
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
    text-overflow: ellipsis; //텍스트 넘어갔을 때 ... 으로 처리
    white-space: nowrap; //줄바꿈 없애기?
`;
