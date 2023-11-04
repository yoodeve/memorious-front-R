import React from "react";
import { Reset } from "styled-reset";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const mainLayout = css`
    display: grid;
    place-items: center; //자기 요소의 내부 요소가 1개일 경우에만 적용가능
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

const mainContainer = css`
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

const imgBox = css`
    width: 300px;
    margin: 0 auto;
    margin-top: 70px;
    & img {
        width: 100%;
    }
`;

const introText = css`
    padding: 70px 0;
    text-align: center;
    color: #6f6257;
    & p {
        line-height: 25px;
        font-size: 18px;
    }
`;

const line = css`
    width: 400px;
    border-top: 2px solid #eee;
`;

const loginButton = css`
    margin-top: 30px;
    width: 200px;
    & img {
        margin-top: 8px;
        width: 100%;
    }
`;

function OAuth2Signin() {
    return (
        <>
            <Reset />
            <div css={mainLayout}>
                <div css={mainContainer}>
                    <div css={imgBox}>
                        <img src="/assets/images/logo.png" alt="" />
                    </div>
                    <div css={introText}>
                        <p>
                            우리를 기억하는 메모리어스, 지금 시작해보세요.
                            <br />
                            아래의 버튼을 눌러 카카오 계정 혹은 네이버 계정으로 로그인해주세요
                        </p>
                    </div>
                    <div css={line}>{"   "}</div>
                    <div css={loginButton}>
                        <img src="/assets/images/kakao_login_logo.png" alt="" />
                        <img src="/assets/images/naver_login_logo.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OAuth2Signin;
