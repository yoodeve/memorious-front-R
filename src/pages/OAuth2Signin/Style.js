import { css } from "@emotion/react";

export const mainLayout = css`
    display: grid;
    place-items: center; //자기 요소의 내부 요소가 1개일 경우에만 적용가능
    width: 70%;
    min-width: 700px;
    min-height: 100vh;
    margin: 0 auto;
    background-color: #fffbf5;
    box-shadow:
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px;
    * {
        box-sizing: border-box;
        font-family: "Pretendard-Medium";
        font-size: 14px;
    }
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* margin: 0 auto; */
    border-radius: 10px;
    width: 600px;
    height: 600px;
    background-color: #fff;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const imgBox = css`
    width: 300px;
    margin: 0 auto;
    margin-top: 70px;
    & img {
        width: 100%;
    }
`;

export const introText = css`
    padding: 70px 0;
    text-align: center;
    color: #6f6257;
    & p {
        line-height: 25px;
        font-size: 18px;
    }
`;

export const line = css`
    width: 400px;
    border-top: 2px solid #eee;
`;

export const loginButtonBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
`;

export const loginButton = css`
    width: 195px;
    cursor: pointer;
    margin-top: 4px;
    border: none;
    background: none;
    padding: 0px;

    & img {
        width: 100%;
        margin: 0;
    }
`;
