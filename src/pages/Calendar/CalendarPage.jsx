import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import EditScheduleModal from "../../component/Calendar/Modal/EditModal/EditScheduleModal";
import StyledCalendar from "../../component/Calendar/StyledCalendar/StyledCalendar";
import Badge from "../../component/Calendar/Badge";
import { ScheduleData } from "./SchduleData";
import AddScheduleModal from "../../component/Calendar/Modal/AddModal/AddScheduleModal";
import { SBox, SMainContainer, SScheduleText, SdateCell } from "./style";

function CalendarPage() {
    const now = dayjs();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(now);

    // // 일정 클릭시 수정 Modal
    const handleScheduleClick = (e, data) => {
        console.log("일정클릭시 넘어오는 값", data);
        e.stopPropagation();
        setEditModalOpen(true);
    };

    // 셀 클릭시 해당 날짜에 일정 추가 Modal
    const handleAddSchedule = date => {
        console.log("date in CalendarPage", date);
        setAddModalOpen(true);
        setSelectedDate(date);
    };

    // 데이터 필터링
    const getFiteredData = value => {
        const dateFormat = value.format("YYYY-MM-DD");

        const dayAllData = ScheduleData.filter(item => item.date === dateFormat && item.isDayAll === 1);
        const nonAllDayData = ScheduleData.filter(item => item.date === dateFormat && item.isDayAll === 0);

        const allData = dayAllData.concat(nonAllDayData);
        return allData;
    };

    // 각 날짜의 cell 안을 렌더링(일정)
    const cellRender = value => {
        const schedule = getFiteredData(value);
        return (
            <div css={SdateCell} onClick={() => handleAddSchedule(value)}>
                <ul className="events">
                    {schedule.map(data => (
                        <div onClick={e => handleScheduleClick(e, value)} css={SBox}>
                            {/* 종일이 아니면 뱃지 먼저 */}
                            {data.isDayAll === 0 ? <Badge color={data.color} /> : <></>}
                            <li css={SScheduleText(data.color, data.isDayAll)} key={data.subject}>
                                {data.subject}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <>
            {addModalOpen ? <AddScheduleModal open={addModalOpen} setOpen={setAddModalOpen} date={selectedDate} /> : <></>}
            <EditScheduleModal open={editModalOpen} setOpen={setEditModalOpen} />
            <div css={SMainContainer}>
                <StyledCalendar cellRender={cellRender} />
            </div>
        </>
    );
}

export default CalendarPage;
