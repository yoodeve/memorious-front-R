import React from "react";
import { SCalendar } from "./style";
import Header from "../Header/Header";

function StyledCalendar({ cellRender }) {
    return <SCalendar cellRender={cellRender} headerRender={Header} />;
}

export default StyledCalendar;
