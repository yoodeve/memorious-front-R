import { Button } from "antd";
import React from "react";

function ChartDetailAddBtn({ type, color }) {
    return <Button type={color}>{type === "add" ? "추가" : "수정"}</Button>;
}

export default ChartDetailAddBtn;
