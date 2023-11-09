import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateFamily from "../pages/CreateFamily/CreateFamily";

function AccountRoute() {
    // useEffect(() => {
    // accessToken 이 있는지 체크
    // });
    return (
        <Routes>
            {/* 방 생성 */}
            <Route path="/create/family" element={<CreateFamily />} />
            {/* 홈으로 */}
            <Route path="mypage" element={<></>} />
        </Routes>
    );
}

export default AccountRoute;
