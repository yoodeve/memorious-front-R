import React from "react";
import { Route, Routes } from "react-router-dom";
import Mypage from "../pages/Mypage/Mypage";

function SettingRoute() {
    return (
        <Routes>
            <Route path="myfamily" element={<></>} />
            <Route path="mypage" element={<Mypage />} />
        </Routes>
    );
}

export default SettingRoute;
