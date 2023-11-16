import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardList from "../pages/BoardList/BoardList";
import BoardWrite from "../pages/BoardWrite/BoardWrite";
import BoardDetail from "../pages/BoardDetail/BoardDetail";

function BoardRoute() {
    return (
        <Routes>
            <Route index element={<Navigate replace to="all/1" />} />
            <Route path="all/1" element={<BoardList />} />
            <Route path=":category/:page" element={<BoardList />} />
            <Route path=":boardId" element={<BoardDetail />} />
            {/* <Route path="/board/edit/:boardId" element={<BoardEdit />} /> */}
            <Route path="write" element={<BoardWrite />} />
        </Routes>
    );
}

export default BoardRoute;
