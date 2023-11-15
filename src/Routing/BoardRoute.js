import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardList from "../pages/BoardList/BoardList";
import BoardWrite from "../pages/BoardWrite/BoardWrite";

function BoardRoute() {
    return (
        <Routes>
            <Route index element={<BoardList />} />
            <Route path="write" element={<BoardWrite />} />
        </Routes>
    );
}

export default BoardRoute;
