import React from "react";
import { SCalendar } from "./style";
import Header from "../Header/Header";

function StyledCalendar({ onPanelChange, cellRender, tableCss }) {
    return <SCalendar onPanelChange={onPanelChange} cellRender={cellRender} style={tableCss} headerRender={Header} />;
}

export default StyledCalendar;
