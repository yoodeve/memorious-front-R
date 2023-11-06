import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import SideBar from "../pages/SideBar/SideBar";
import GlobalStyle from "../style/Global";
import ChartRoute from "./ChartRoute";
import MemoRoute from "./MemoRoute";
import SettingRoute from "./SettingRoute";

function Routing() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SideBar />}>
                        <Route path="/calendar" element={<Main />} />
                        <Route path="/memo/*" element={<MemoRoute />} />
                        <Route path="/board" element={<>게시판</>} />
                        <Route path="/check-list" element={<>체크</>} />
                        <Route path="/chart/*" element={<ChartRoute />} />
                        <Route path="/map" element={<>맵</>} />
                        <Route path="/setting/*" element={<SettingRoute />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;
