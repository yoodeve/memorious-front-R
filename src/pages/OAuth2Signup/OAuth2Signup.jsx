import React from "react";
import { Reset } from "styled-reset";
import { introText, line, loginButton, loginButtonBox, mainContainer, mainLayout } from "../OAuth2Signin/style";
import { logoBox } from "./style";
/** @jsxImportSource @emotion/react */

function OAuth2Signup() {
    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    };
    const handleNaverLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    };

    return (
        <>
            <Reset />
            <div css={mainLayout}>
                <div css={mainContainer}>
                    <div css={logoBox}>
                        <img src="/assets/images/logo.png" alt="" />
                    </div>
                    <div css={introText}>
                        <p>
                            우리를 기억하는 메모리어스, 지금 시작해보세요.
                            <br />
                            아래의 버튼을 눌러 카카오 계정 혹은 네이버 계정으로 로그인해주세요
                        </p>
                    </div>
                    <div css={line} />
                    <div css={loginButtonBox}>
                        <div css={loginButton} onClick={handleKakaoLogin}>
                            <img src="/assets/images/kakao_login_logo.png" alt="" />
                        </div>
                        <div css={loginButton} onClick={handleNaverLogin}>
                            <img src="/assets/images/naver_login_logo.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OAuth2Signup;
