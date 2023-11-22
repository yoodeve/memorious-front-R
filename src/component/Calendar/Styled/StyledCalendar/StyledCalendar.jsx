import React from "react";
import { SCalendar } from "./style";
import Header from "../../Header/Header";

function StyledCalendar({ cellRender, rowNumber, onPanelChange }) {
    return <SCalendar cellRender={cellRender} headerRender={Header} rowNumber={rowNumber} onPanelChange={onPanelChange} />;
}

export default StyledCalendar;
