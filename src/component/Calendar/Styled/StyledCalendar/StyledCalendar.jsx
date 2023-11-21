import React from "react";
import { SCalendar } from "./style";
import Header from "../../Header/Header";

function StyledCalendar({ cellRender, rowNumber }) {
    return <SCalendar cellRender={cellRender} headerRender={Header} rowNumber={rowNumber} />;
}

export default StyledCalendar;
