import React from "react";
import { Route, Routes } from "react-router-dom";
import MemoMain from "../pages/Memo/MemoMain";

function MemoRoute() {
    return (
        <Routes>
            <Route index element={<MemoMain />} />
        </Routes>
    );
}

export default MemoRoute;
