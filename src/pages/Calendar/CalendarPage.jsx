import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import AddScheduleModal from "../../component/Calendar/Modal/AddModal/AddScheduleModal";
import Badge from "../../component/Calendar/Modal/Badge/Badge";
import EditScheduleModal from "../../component/Calendar/Modal/EditModal/EditScheduleModal";
import StyledCalendar from "../../component/Calendar/Styled/StyledCalendar/StyledCalendar";
import { instance } from "../../config";
import { calendarRecoil } from "../../store/atoms/calendarAtoms";
import convertToAmPmFormat from "../../utils/Calendar/convertToAmPmFormat";
import getVisibleDates from "../../utils/Calendar/getVisibleDates";
import preprocessData from "../../utils/Calendar/preprocessData";
import sortCalendarData from "../../utils/Calendar/sortCalendarData";
import useDynamicHeight from "../../utils/Calendar/useDynamicHeight";
import { SEmptyBox, SMainContainer, SScheduleBox, SScheduleText, STimeText, SdateCellBox } from "./style";

function CalendarPage() {
    const now = dayjs();
    const [currentDate, setCurrentDate] = useState(now);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(now);
    const { customHeight, rowNumber } = useDynamicHeight(currentDate);
    const [scheduleData, setScheduleData] = useRecoilState(calendarRecoil);
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await instance.get(`/api/calendar/schedule/${now.format("YYYY-MM")}`);
            // console.log("원본 응답데이터", response);
            // 데이터를 정렬하고 전처리(주단위로 나누고, 특정 인덱스를 추가) 함.
            const processedData = response.data.sort(sortCalendarData).map(preprocessData).flat();
            setScheduleData(processedData);
        } catch (error) {
            console.log(error);
        }
    };
    // 각각의 셀에 알맞은 일정을 표시하도록 데이터를 가공
    const getfilteredData = () => {
        const dateArray = getVisibleDates(currentDate);
        const returnData = dateArray.map(() => []);

        let index = 1;
        scheduleData.forEach(schedule => {
            for (let i = 0; i < dateArray.length; i++) {
                const scheduleStart = dayjs(schedule.startDate);
                const scheduleEnd = dayjs(schedule.endDate);
                if (returnData[i].length === 0) {
                    returnData[i].push({ date: dateArray[i].format("YYYY-MM-DD") });
                }

                if (schedule.dayDiff !== 0 && schedule.startDate === dateArray[i].format("YYYY-MM-DD")) {
                    returnData[i].push({ ...schedule, index, isBetween: false });
                } else if (schedule.dayDiff !== 0 && dateArray[i].isAfter(scheduleStart) && (dateArray[i].isBefore(scheduleEnd) || dateArray[i].isSame(scheduleEnd, "day"))) {
                    returnData[i].push({ ...schedule, index, isBetween: true });
                } else if (schedule.dayDiff === 0 && schedule.startDate === dateArray[i].format("YYYY-MM-DD")) {
                    returnData[i].push({ ...schedule, index, isBetween: false });
                }
            }
            index += 1;
        });

        console.log(returnData);
        setFilteredData(returnData);
    };

    useEffect(() => {
        fetchData();
        getVisibleDates(now);
    }, []);

    useEffect(() => {
        console.log("정렬 + 전처리 완료 Data", scheduleData);
        getfilteredData();
    }, [scheduleData]);

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
    const cellRender = date => {
        const formattedDate = date.format("YYYY-MM-DD");
        const matchingDateArray = filteredData.find(entry => entry[0] && entry[0].date === formattedDate);
        console.log("date", formattedDate);
        console.log(matchingDateArray);
        if (matchingDateArray && Array.isArray(matchingDateArray[1])) {
            console.log("true");
            return (
                <div css={SdateCellBox(customHeight)} onClick={() => handleAddSchedule(date)}>
                    <ul className="schedules">
                        {matchingDateArray.map(schedule =>
                            schedule.isBetween ? (
                                <div css={SEmptyBox}> {schedule.title} </div>
                            ) : (
                                <>
                                    <div onClick={e => handleScheduleClick(e, date)} css={SScheduleBox(schedule?.dayDiff, schedule?.isAllDay, schedule?.labelColor)} key={`${schedule?.id}-${schedule?.weekIndex}`}>
                                        {/* 종일이 아닐 때의 스타일 추가 */}
                                        {schedule?.isAllDay && schedule?.dayDiff === 0 ? null : (
                                            <>
                                                {!schedule?.isAllDay && schedule?.dayDiff === 0 && <Badge color={schedule?.labelColor} />}
                                                {!schedule?.isAllDay && schedule?.dayDiff === 0 && <span css={STimeText}>{convertToAmPmFormat(schedule?.startTime)}</span>}
                                            </>
                                        )}
                                        <li css={SScheduleText(schedule?.labelColor, schedule?.isAllDay, schedule?.dayDiff)} key={`${schedule?.id}-${schedule?.weekIndex}`}>
                                            {schedule.title}
                                        </li>
                                    </div>
                                </>
                            ),
                        )}
                    </ul>
                </div>
            );
        }
        return (
            <div css={SdateCellBox(customHeight)} onClick={() => handleAddSchedule(date)}>
                {/* Render other content if needed */}
            </div>
        );
    };

    const onPanelChange = date => {
        setCurrentDate(date);
        getVisibleDates(date);
    };

    return (
        <>
            {addModalOpen ? <AddScheduleModal open={addModalOpen} setOpen={setAddModalOpen} date={selectedDate} /> : <></>}
            <EditScheduleModal open={editModalOpen} setOpen={setEditModalOpen} />
            <div css={SMainContainer}>
                <StyledCalendar cellRender={cellRender} rowNumber={rowNumber} onPanelChange={onPanelChange} />
            </div>
        </>
    );
}

export default CalendarPage;
