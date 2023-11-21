import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import Badge from "../../component/Calendar/Modal/Badge/Badge";
import AddScheduleModal from "../../component/Calendar/Modal/AddModal/AddScheduleModal";
import EditScheduleModal from "../../component/Calendar/Modal/EditModal/EditScheduleModal";
import StyledCalendar from "../../component/Calendar/Styled/StyledCalendar/StyledCalendar";
import { SMainContainer, SScheduleBox, SScheduleText, STimeText, SdateCellBox } from "./style";
import { instance } from "../../config";

function CalendarPage() {
    const now = dayjs();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(now);
    const [customHeight, setCustomHeight] = useState(133);
    const [rowNumber, setRowNumber] = useState(5);
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/api/calendar/schedule/${now.format("YYYY-MM")}`);
                setScheduleData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // 데이터 필터링
    const getFiteredData = value => {
        const dateFormat = value.format("YYYY-MM-DD");
        const dayAllData = scheduleData.filter(schedule => schedule.startDate === dateFormat && schedule.isAllDay);
        const nonAllDayData = scheduleData.filter(schedule => schedule.startDate === dateFormat && !schedule.isAllDay);

        // console.log(dayAllData);
        const allData = dayAllData.concat(nonAllDayData);
        return allData;
    };
    // 시간 변환
    function convertToAmPmFormat(timeString) {
        const [hours] = timeString.split(":");

        const formattedTime = `${hours}시`;

        // 12시간제로 표시(데이터셀이 너무 작다)

        // let period = "오전";
        // let formattedHours = parseInt(hours, 10);

        // if (formattedHours >= 12) {
        //     period = "오후";
        //     formattedHours -= 12;
        // }

        // if (formattedHours === 0) {
        //     formattedHours = 12;
        // }

        // const formattedTime = `${period} ${formattedHours}시`;

        return formattedTime;
    }

    // 특정한 '일정'을 클릭하면 추가모달과 동일한 수정모달이 나옴
    // todo : 수정버튼을 포함한 조회모달
    const handleScheduleClick = (e, data) => {
        console.log("일정 클릭시 넘어오는 값", data);
        e.stopPropagation();
        setEditModalOpen(true);
    };

    // 셀 클릭시 해당 날짜에 일정 추가 Modal
    const handleAddSchedule = date => {
        setAddModalOpen(true);
        setSelectedDate(date);
    };

    // 각 날짜의 cell 안을 렌더링(일정)
    const cellRender = value => {
        const filteredSchedule = getFiteredData(value);
        return (
            <div css={SdateCellBox(customHeight)} onClick={() => handleAddSchedule(value)}>
                <ul className="events">
                    {filteredSchedule.map(schedule => (
                        <div onClick={e => handleScheduleClick(e, value)} css={SScheduleBox} key={schedule.id}>
                            {/* 종일이 아닐 때의 스타일 추가 */}
                            {schedule.isAllDay ? null : (
                                <>
                                    <Badge color={schedule.labelColor} />
                                    <span css={STimeText}>{convertToAmPmFormat(schedule.startTime)}</span>
                                </>
                            )}
                            <li css={SScheduleText(schedule.labelColor, schedule.isAllDay)} key={schedule.id}>
                                {schedule.title}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        );
    };

    // 화면 비율에따라 5행 / 6행 다르게 표시
    useEffect(() => {
        const updateDynamicHeight = () => {
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            let calculatedHeight;
            const viewportRatio = viewportWidth / viewportHeight;

            // 세로비율이 16:10만큼 커지면 행+
            if (viewportRatio <= 2.04) {
                calculatedHeight = (viewportHeight - 265) / 6;
                setRowNumber(6);
            } else {
                calculatedHeight = (viewportHeight - 240) / 5;
                setRowNumber(5);
            }
            setCustomHeight(calculatedHeight);
        };

        // 페이지 로드 및 리사이즈 이벤트에 대한 이벤트 리스너 등록
        window.addEventListener("resize", updateDynamicHeight);
        updateDynamicHeight(); // 페이지 로드 시 초기 설정

        // 언마운트 시 이벤트 리스너 정리
        return () => {
            window.removeEventListener("resize", updateDynamicHeight);
        };
    }, []);

    return (
        <>
            {addModalOpen ? <AddScheduleModal open={addModalOpen} setOpen={setAddModalOpen} date={selectedDate} /> : <></>}
            <EditScheduleModal open={editModalOpen} setOpen={setEditModalOpen} />
            <div css={SMainContainer}>
                <StyledCalendar cellRender={cellRender} rowNumber={rowNumber} />
            </div>
        </>
    );
}

export default CalendarPage;
