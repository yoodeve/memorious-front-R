import React from "react";
import { Reset } from "styled-reset";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const mainContainer = css`
    display: grid;
    place-items: center; //mainContainer 내부 요소가 1개일 경우에만 적용가능
    width: 70%;
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

const testBox = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* margin: 0 auto; */
    /* border: 1px solid #dbdbdb; */
    border-radius: 10px;
    width: 400px;
    height: 450px;
    background-color: #fff;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
    & img {
        width: 60%;
        margin-top: 40px;
    }
`;

const introText = css`
    /* width: 100%; */
    margin-top: 20px;
    height: 50px;
    text-align: center;
    color: #6f6257;
`;

function OAuth2Signin() {
    return (
        <>
            <Reset />
            <div css={mainContainer}>
                <div css={testBox}>
                    <img src="/assets/images/logo.png" alt="" />
                    <div css={introText}>
                        <p>
                            우리를 기억하는 메모리어스, 지금 시작해보세요.
                            <br />
                            아래의 버튼을 눌러 카카오 계정 혹은 네이버 계정으로 로그인 해주세요
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OAuth2Signin;
