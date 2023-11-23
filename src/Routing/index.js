import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CalendarPage from "../pages/Calendar/CalendarPage";
import CreateFamily from "../pages/CreateFamily/CreateFamily";
import NotFound from "../pages/NotFound";
import SideBar from "../pages/SideBar/SideBar";
import GlobalStyle from "../style/Global";
import ChartRoute from "./ChartRoute";
import MemoRoute from "./MemoRoute";
import Oauth2Route from "./Oauth2Route";
import SettingRoute from "./SettingRoute";
// import TokenLayout from "../component/TokenLayout";
import Invitation from "../pages/Invitation/Invitation";
import BoardRoute from "./BoardRoute";

function Routing() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route element={<SideBar />}>
                        <Route path="/" element={<Navigate replace to="calendar" />} />
                        <Route path="calendar/*" element={<CalendarPage />} />
                        <Route path="memo/*" element={<MemoRoute />} />
                        <Route path="board/*" element={<BoardRoute />} />
                        <Route path="check-list" element={<>체크</>} />
                        <Route path="chart/*" element={<ChartRoute />} />
                        <Route path="map" element={<>맵</>} />
                        <Route path="setting/*" element={<SettingRoute />} />
                        <Route path="/create/family" element={<CreateFamily />} />
                    </Route>
                    <Route path="/auth/oauth2/*" element={<Oauth2Route />} />
                    <Route path="/invitation/auth/*" element={<Invitation />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;
