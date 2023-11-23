import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { useQueryClient } from "react-query";
import OAuth2Signin from "../pages/OAuth2Signin/OAuth2Signin";
import OAuth2Signup from "../pages/OAuth2Signup/OAuth2Signup";
import Oauth2Redirect from "../pages/Oauth2Redirect/Oauth2Redirect";

function Oauth2Route() {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("getPrincipal");

    // data가 존재한다면(로그인이 되어져있는 상태) 로그인 페이지에 들어가도 home으로 이동
    if (principalState?.data?.data) {
        return <Navigate to="/" />;
    }
    return (
        <Routes>
            <Route path="signin" element={<OAuth2Signin />} />
            <Route path="signup" element={<OAuth2Signup />} />
            <Route path="signin/redirect" element={<Oauth2Redirect type="naver" />} />
        </Routes>
    );
}

export default Oauth2Route;
