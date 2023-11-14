import { css } from "@emotion/react";

export const logoBox = css`
    width: 150px;
    margin: 0 auto;
    margin-top: 30px;
    & img {
        width: 100%;
    }
`;

export const signupText = css`
    padding: 30px 0;
    text-align: center;
    color: #6f6257;
    & p {
        line-height: 25px;
        font-size: 22px;
    }
`;

export const signupContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 370px;
    height: 200px;
    background-color: #fffbf5;
`;

export const inputContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    width: 300px;
    & div {
        font-size: 18px;
        color: #6f6257;
    }
`;

export const inputBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #a05b2c;
    border-radius: 5px;
    height: 40px;
    width: 220px;
    font-size: 18px;
    color: #6f6257;
    outline: none;
`;

export const signupButton = css`
    cursor: pointer;
    margin-top: 50px;
    border: none;
    border-radius: 10px;
    width: 330px;
    height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #6f6257;
`;
