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

    useEffect(() => {
        fetchData();
        getVisibleDates(now);
    }, []);

    useEffect(() => {
        console.log("정렬 + 전처리 완료 Data", scheduleData);
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

    // 각각의 셀에 알맞은 일정을 표시하도록 데이터를 가공
    const getfilteredData = date => {
        const returnData = [];
        const thisDateString = date.format("YYYY-MM-DD");
        let i = 0;
        scheduleData.forEach(schedule => {
            const scheduleStart = dayjs(schedule.startDate);
            const scheduleEnd = dayjs(schedule.endDate);

            /* 각각의 데이터셀에서 출력할 데이터만 선별함 */
            // 1순위 : 당일 일정이 아니고, 시작날짜가 셀의 날짜와 같은것
            if (schedule.dayDiff !== 0 && schedule.startDate === thisDateString) {
                i += 1;
                returnData.push({ ...schedule, isBetween: false, index: i });
                // 2순위 : 당일 일정x, 시작날짜와 같지 않음 + 종료날짜 이전
            } else if (schedule.dayDiff !== 0 && date.isAfter(scheduleStart) && (date.isBefore(scheduleEnd) || date.isSame(scheduleEnd, "day"))) {
                i += 1;
                returnData.push({ ...schedule, isBetween: true, title: " z", index: i });
                // 3순위 : 당일 일정이고, 시작날짜가 셀의날짜와 같음
            } else if (schedule.dayDiff === 0 && schedule.startDate === thisDateString) {
                i += 1;
                returnData.push({ ...schedule, isBetween: false, index: i });
            }
        });

        return returnData;
    };

    // 각 날짜의 cell 안을 렌더링(일정)
    const cellRender = date => {
        // console.log(date.format("MM-DD"));
        // console.log("result", getfilteredData(date));
        const filteredSchedule = getfilteredData(date);
        return (
            <div css={SdateCellBox(customHeight)} onClick={() => handleAddSchedule(date)}>
                <ul className="schedules">
                    {filteredSchedule.map(schedule =>
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
