/* eslint-disable */
import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { mainContainer, mainLayout } from "../OAuth2Signin/Style";
import * as S from "./Style";

function OAuth2Signup() {
    const [signupUser, setSignupUser] = useState({
        email: "",
        nickname: "",
    });

    const handleInputChange = e => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignupSubmit = () => {};

    return (
        <>
            <div css={mainLayout}>
                <div css={mainContainer}>
                    <div css={S.logoBox}>
                        <img src="/assets/images/logo.png" alt="" />
                    </div>
                    <div css={S.signupText}>
                        <p>
                            추가 정보를 입력하고
                            <br />
                            회원가입을 완료하세요.
                        </p>
                    </div>
                    <div css={S.signupContainer}>
                        <div css={S.inputContainer}>
                            <div>이메일</div>
                            <input type="email" css={S.inputBox} onChange={handleInputChange} name="email" />
                        </div>

                        <div css={S.inputContainer}>
                            <div>별명</div>
                            <input type="text" css={S.inputBox} onChange={handleInputChange} name="nickname" />
                        </div>
                    </div>
                    <button css={S.signupButton} onClick={handleSignupSubmit}>
                        가입하기
                    </button>
                </div>
            </div>
        </>
    );
}

export default OAuth2Signup;
