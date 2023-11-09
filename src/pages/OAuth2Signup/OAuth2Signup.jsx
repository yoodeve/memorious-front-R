/* eslint-disable*/
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import { mainContainer, mainLayout } from "../OAuth2Signin/Style";
import * as S from "./Style";
import { instance } from "../../config";

function OAuth2Signup() {
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();

    const user = {
        email: "",
        nickname: "",
        oauth2Id: searchParams.get("oauth2Id"),
        provider: searchParams.get("provider"),
    };

    const [signupUser, setSignupUser] = useState(user);

    const handleInputChange = e => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignupSubmit = async () => {
        try {
            console.log(signupUser);
            const response = await instance.post("/api/auth/oauth2/signup", signupUser);
        } catch (error) {
            console.error(error.response);
        }
        // await instance.post("/api/auth/oauth2/signin", signupUser); 
        // localStorage.setItem("accessToken", `Bearer ${response.data}`);
        alert("회원가입 성공");
        window.location.reload();
    };

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
