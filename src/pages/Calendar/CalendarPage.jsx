import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
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
    const [visibleSchedulesNum, setVisibleSchedulesNum] = useState(4);

    useEffect(() => {
        const num = Math.floor((customHeight - 28) / 23.5);
        setVisibleSchedulesNum(num);
    }, [customHeight]);

    const fetchData = async () => {
        try {
            console.log("fetch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const response = await instance.get(`/api/calendar/schedule/${currentDate.format("YYYY-MM")}`);
            // 데이터를 정렬하고 전처리(주단위로 나누고, 특정 인덱스를 추가) 함.
            const processedData = response.data.sort(sortCalendarData).map(preprocessData).flat();
            setScheduleData(processedData);
        } catch (error) {
            console.log(error);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const getSchedule = useQuery(["getSchedule"], fetchData, {
        retryOnMount: true,
        refetchOnWindowFocus: false,
    });

    // 월 바뀔때 date를 바꿔줌
    const onMonthChange = date => {
        setCurrentDate(date);
        getVisibleDates(date);
        console.log("달 바꼈어유");
    };

    useEffect(() => {
        console.log("useEffect - currentDate");
        if (currentDate) {
            getVisibleDates(currentDate);
            fetchData();
        }
    }, [currentDate]);

    // 각각의 셀에 알맞은 일정을 표시하도록 데이터를 가공
    const getfilteredData = () => {
        const dateArray = getVisibleDates(currentDate);
        const returnData = dateArray.map(() => []);
        // 스케쥴 데이터를 돌면서
        scheduleData.forEach(schedule => {
            // 캘린더에 보여지는 날짜 수(42)만큼 반복
            let uqKey = 1;
            for (let i = 0; i < dateArray.length; i++) {
                const scheduleStart = dayjs(schedule.startDate);
                const scheduleEnd = dayjs(schedule.endDate);
                let index = 1;
                let isBetween = false;
                // 배열 맨 처음에는 날짜를 달아줌
                if (returnData[i].length === 0) {
                    returnData[i].push({ date: dateArray[i].format("YYYY-MM-DD") });
                }

                // i가 0이면 날짜를 참고하게되므로, 제외
                if (i > 0) {
                    // 지 배열을 돌아보면서 빈 인덱스를 찾는다.
                    for (let j = 0; j < returnData[i].length; j++) {
                        if (returnData[i].every(value => value.index !== j + 1)) {
                            // value.index가 i + 1이 아닌 경우 (비어 있는 경우)
                            index = j + 1;
                            break;
                        }
                    }
                    // 전 날 배열을 참조
                    returnData[i - 1].forEach(value => {
                        // 같은 일정이고, 같은 주에 속하면 이전날과 같은 인덱스를 유지한다.
                        if (value?.scheduleId === schedule.scheduleId && value?.weekIndex === schedule.weekIndex) {
                            index = value?.index;
                        }
                    });
                }

                // 1: (여러날 일정 먼저) 시작날짜가 같으면 보여준다
                if (schedule.dayDiff !== 0 && schedule.startDate === dateArray[i].format("YYYY-MM-DD")) {
                    returnData[i].push({ ...schedule, index, isBetween, uqKey });
                    // 2: 시작날짜를 넘었고, 종료날짜 전이면 보여지지 않아야하므로, isBetween = true
                } else if (schedule.dayDiff !== 0 && dateArray[i].isAfter(scheduleStart) && (dateArray[i].isBefore(scheduleEnd) || dateArray[i].isSame(scheduleEnd, "day"))) {
                    isBetween = true;
                    if (dateArray[i].isSame(scheduleEnd, "day")) {
                        returnData[i].push({ ...schedule, index, isBetween, uqKey });
                    } else {
                        returnData[i].push({ ...schedule, index, isBetween, uqKey });
                    }
                    // 3: 하루짜리 일정을 표시해준다.
                } else if (schedule.dayDiff === 0 && schedule.startDate === dateArray[i].format("YYYY-MM-DD")) {
                    returnData[i].push({ ...schedule, index, isBetween, uqKey });
                }
                uqKey += 1;
            }
        });
        setFilteredData(returnData);
    };

    useEffect(() => {
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
        console.log("date", matchingDateArray);
        if (matchingDateArray && Array.isArray(matchingDateArray)) {
            return (
                <div css={SdateCellBox(customHeight)} onClick={() => handleAddSchedule(date)} key={formattedDate}>
                    <ul className="schedules">
                        {matchingDateArray.map(schedule =>
                            schedule?.isBetween ? (
                                <div css={SEmptyBox} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-1`}>
                                    {schedule?.title}
                                </div>
                            ) : (
                                <>
                                    <div onClick={e => handleScheduleClick(e, date)} css={SScheduleBox(schedule?.dayDiff, schedule?.isAllDay, schedule?.labelColor, schedule?.index, visibleSchedulesNum)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-2`}>
                                        {/* 종일이 아닐 때의 스타일 추가 */}
                                        {schedule?.isAllDay && schedule?.dayDiff === 0 ? null : (
                                            <>
                                                {!schedule?.isAllDay && schedule?.dayDiff === 0 && <Badge color={schedule?.labelColor} />}
                                                {!schedule?.isAllDay && schedule?.dayDiff === 0 && <span css={STimeText}>{convertToAmPmFormat(schedule?.startTime)}</span>}
                                            </>
                                        )}
                                        <li css={SScheduleText(schedule?.labelColor, schedule?.isAllDay, schedule?.dayDiff)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-3`}>
                                            {schedule?.title}
                                        </li>
                                        <div css={SScheduleText} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-4`}>
                                            {schedule?.index > visibleSchedulesNum ? "" : null}
                                        </div>
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
                {/* 만약 데이터가 없어도 셀 크기를 유지함 */}
            </div>
        );
    };

    return (
        <>
            {addModalOpen ? <AddScheduleModal open={addModalOpen} setOpen={setAddModalOpen} date={selectedDate} /> : <></>}
            <EditScheduleModal open={editModalOpen} setOpen={setEditModalOpen} />
            <div css={SMainContainer}>
                <StyledCalendar cellRender={cellRender} rowNumber={rowNumber} onPanelChange={onMonthChange} />
            </div>
        </>
    );
}

export default CalendarPage;
