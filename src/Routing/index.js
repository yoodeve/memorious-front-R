import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import SideBar from "../pages/SideBar/SideBar";
import GlobalStyle from "../style/Global";
import SettingRoute from "./SettingRoute";
import OAuth2Signin from "../pages/OAuth2Signin/OAuth2Signin";
import OAuth2Signup from "../pages/OAuth2Signup/OAuth2Signup";

function Routing() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SideBar />}>
                        <Route path="/calendar" element={<Main />} />
                        <Route path="/memo" element={<>메모</>} />
                        <Route path="/board" element={<>게시판</>} />
                        <Route path="/check-list" element={<>체크</>} />
                        <Route path="/chart" element={<>차트</>} />
                        <Route path="/map" element={<>맵</>} />
                        <Route path="/setting/*" element={<SettingRoute />} />
                    </Route>
                    <Route path="/signinoauth2" element={<OAuth2Signin />} />
                    <Route path="/signupoauth2" element={<OAuth2Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;
