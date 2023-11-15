import React from "react";
import { Route, Routes } from "react-router";
import OAuth2Signup from "../pages/OAuth2Signup/OAuth2Signup";
import OAuth2Signin from "../pages/OAuth2Signin/OAuth2Signin";
import Oauth2Redirect from "../pages/Oauth2Redirect/Oauth2Redirect";

function Oauth2Route() {
    return (
        <Routes>
            <Route path="signin" element={<OAuth2Signin />} />
            <Route path="signup" element={<OAuth2Signup />} />
            <Route path="signup/redirect" element={<Oauth2Redirect type="naver" />} />
        </Routes>
    );
}

export default Oauth2Route;
