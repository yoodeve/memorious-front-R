import React from "react";
/** @jsxImportSource @emotion/react */
import { SBox, SMainContainer, SScheduleText } from "./Style";
import StyledCalendar from "../../component/Calendar/StyledCalendar/StyledCalendar";
import { ScheduleData } from "./SchduleData";
import Badge from "../../component/Calendar/Badge";

function CalendarPage() {
    // 데이터 필터링
    const getFiteredData = value => {
        const dateFormat = value.format("YYYYMMDD");

        const dayAllData = ScheduleData.filter(item => item.date === dateFormat && item.isDayAll === 1);
        const nonAllDayData = ScheduleData.filter(item => item.date === dateFormat && item.isDayAll === 0);

        const allData = dayAllData.concat(nonAllDayData);
        return allData;
    };

    // Schedule 클릭시 일정추가Modal
    const handleScheduleClick = (data, e) => {
        console.log("data", data);
        console.log("e", e);
    };
    // 각 날짜의 cell 안을 정의(일정)
    const cellRender = value => {
        const schedule = getFiteredData(value);

        return (
            <ul className="events">
                {schedule.map(data => (
                    <div onClick={e => handleScheduleClick(data, e)} css={SBox}>
                        {/* 종일이 아니면 뱃지 먼저 */}
                        {data.isDayAll === 0 ? <Badge color={data.color} /> : <></>}
                        <li css={SScheduleText(data.color, data.isDayAll)} key={data.date}>
                            {data.subject}
                        </li>
                    </div>
                ))}
            </ul>
        );
    };

    return (
        <div css={SMainContainer}>
            <StyledCalendar cellRender={cellRender} />
        </div>
    );
}

export default CalendarPage;
