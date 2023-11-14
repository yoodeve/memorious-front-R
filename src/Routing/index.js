import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../pages/SideBar/SideBar";
import GlobalStyle from "../style/Global";
import BoardList from "../pages/BoardList/BoardList";
import CalendarPage from "../pages/Calendar/CalendarPage";
import ChartRoute from "./ChartRoute";
import MemoRoute from "./MemoRoute";
import SettingRoute from "./SettingRoute";
import CreateFamily from "../pages/CreateFamily/CreateFamily";
import Oauth2Route from "./Oauth2Route";

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
                        <Route path="board" element={<>게시판</>} />
                        <Route path="check-list" element={<>체크</>} />
                        <Route path="chart/*" element={<ChartRoute />} />
                        <Route path="map" element={<>맵</>} />
                        <Route path="setting/*" element={<SettingRoute />} />
                    </Route>
                    <Route path="/auth/oauth2/*" element={<Oauth2Route />} />
                    <Route path="/create/family" element={<CreateFamily />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;
