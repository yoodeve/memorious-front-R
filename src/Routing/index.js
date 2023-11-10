import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import SideBar from "../pages/SideBar/SideBar";
import GlobalStyle from "../style/Global";
import BoardList from "../pages/BoardList/BoardList";

function Routing() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SideBar />}>
                        <Route path="/calendar" element={<Main />} />
                        <Route path="/memo" element={<>메모</>} />
                        <Route path="/board" element={<BoardList />} />
                        <Route path="/check-list" element={<>체크</>} />
                        <Route path="/chart" element={<>차트</>} />
                        <Route path="/map" element={<>맵</>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;
