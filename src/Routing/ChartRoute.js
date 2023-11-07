import React from "react";
import { Route, Routes } from "react-router-dom";
import ChartDetail from "../pages/ChartDetail/ChartDetail";
import ChartMain from "../pages/ChartMain/ChartMain";

function ChartRoute() {
    return (
        <Routes>
            <Route index element={<ChartMain />} />
            <Route path="detail" element={<ChartDetail />} />
        </Routes>
    );
}

export default ChartRoute;
