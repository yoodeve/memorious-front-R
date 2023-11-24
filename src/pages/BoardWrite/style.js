import { css } from "@emotion/react";

export const layout = css`
    margin: 0 auto;
    border-radius: 6px;
    padding: 20px;
    width: 90%;
    height: 700px;
    background-color: #f5efe6;
    & * {
        font-size: 14px;
        color: #6f6257;
    }

    .quill-container {
        width: 100%;
        height: 450px;
        border-radius: 6px;
    }
`;

export const Container = css``;

export const categoryContainer = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`;

export const selectBox = css`
    width: 150px;
    height: 40px;
`;

export const addCategory = css`
    margin-left: 10px;
    background-color: #fff;
    border-radius: 6px;
    width: 100px;
    height: 35px;
    outline: none;
    border: none;
    cursor: pointer;
`;

export const titleInput = css`
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 6px;
    padding: 10px;
    width: 100%;
    height: 40px;
    outline: none;
    &:focus {
        /* border: 1px solid #6f6257; */
        box-shadow: 0 0 3px 1px #6f6257dd;
    }
`;

export const buttonContainer = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 60px;
    width: 100%;
`;

export const writeBoardButton = css`
    border-radius: 6px;
    border: none;
    padding: 10px 15px;
    outline: none;
    font-size: 16px;
    color: #fffbf5;
    background-color: #6f6257;
    cursor: pointer;
`;
