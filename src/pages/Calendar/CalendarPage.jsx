import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
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
import MoreScheduleModal from "../../component/Calendar/Modal/MoreScheduleModal/MoreScheduleModal";
import useDynamicHeight from "../../utils/Calendar/useDynamicHeight";
import { SEmptyBox, SMainContainer, SMoreText, SScheduleBox, SScheduleText, STimeText, SdateCellBox } from "./style";

function CalendarPage() {
    const now = dayjs();
    // const queryClient = useQueryClient();
    const [currentDate, setCurrentDate] = useState(now);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [moreModalOpen, setMoreModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(now);
    const [selectedScheduleArray, setSelectedScheduleArray] = useState([]);
    const { customHeight, rowNumber } = useDynamicHeight(currentDate);
    const [scheduleData, setScheduleData] = useRecoilState(calendarRecoil);
    const [filteredData, setFilteredData] = useState([]);
    const [visibleSchedulesNum, setVisibleSchedulesNum] = useState(4);
    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
        const num = Math.floor(customHeight / 26);
        console.log(customHeight);
        console.log(num - 1);
        // 보여지는 개수는 최대출력 갯수보다 하나 적다.(...이 떠야하므로 )
        setVisibleSchedulesNum(num - 1);
    }, [customHeight]);

    const fetchData = async () => {
        try {
            const response = await instance.get(`/api/calendar/schedule/${currentDate.format("YYYY-MM")}`);
            setResponseData(response.data);
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
        if (currentDate) {
            getVisibleDates(currentDate);
            getSchedule.refetch();
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

    const handleContainerClick = (e, date) => {
        const clickedTagName = e.target.tagName;
        console.log(clickedTagName);
        // 클릭이 스케줄인지 또는 셀인지 확인
        if (clickedTagName === "UL") {
            setSelectedDate(date);
            setAddModalOpen(true);
        } else if (clickedTagName === "LI") {
            const clickedId = e.target.className.split(" ")[0];
            const clickedSchedule = responseData.find(schedule => String(schedule.scheduleId) === clickedId);
            console.log(clickedSchedule);
            setSelectedDate(date);
            setEditModalOpen(true);
        } else if (clickedTagName === "SPAN") {
            const matchingDateArray = filteredData?.find(entry => entry[0] && entry[0].date === date.format("YYYY-MM-DD"));
            setSelectedScheduleArray(matchingDateArray);
            setMoreModalOpen(true);
        }
    };

    const renderSchedules = (schedule, maxIndex) => {
        if (schedule?.isBetween) {
            return (
                <div css={SEmptyBox(schedule?.index, visibleSchedulesNum)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-1`}>
                    {schedule?.title}
                </div>
            );
        }
        if (schedule?.index <= visibleSchedulesNum) {
            return (
                <>
                    <div css={SScheduleBox(schedule?.dayDiff, schedule?.isAllDay, schedule?.labelColor, schedule?.index, visibleSchedulesNum)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-2`}>
                        {schedule?.isAllDay && schedule?.dayDiff === 0 ? null : (
                            <>
                                {!schedule?.isAllDay && schedule?.dayDiff === 0 && <Badge color={schedule?.labelColor} />}
                                {!schedule?.isAllDay && schedule?.dayDiff === 0 && <span css={STimeText}>{convertToAmPmFormat(schedule?.startTime)}</span>}
                            </>
                        )}
                        <li className={schedule?.scheduleId} css={SScheduleText(schedule?.labelColor, schedule?.isAllDay, schedule?.dayDiff)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-3`}>
                            {schedule?.title}
                        </li>
                    </div>
                </>
            );
        }
        if (schedule?.index === visibleSchedulesNum + 1) {
            return (
                <>
                    <div css={SMoreText(schedule?.index)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-4`}>
                        <span key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-5`}>{maxIndex - visibleSchedulesNum}개 더보기</span>
                    </div>
                </>
            );
        }
    };

    // 각 날짜의 cell 안을 렌더링(일정)
    const cellRender = date => {
        const formattedDate = date.format("YYYY-MM-DD");
        const matchingDateArray = filteredData?.find(entry => entry[0] && entry[0].date === formattedDate);
        if (matchingDateArray && Array.isArray(matchingDateArray)) {
            const maxIndex = matchingDateArray.length - 1;

            return (
                <div css={SdateCellBox(customHeight)} onClick={e => handleContainerClick(e, date, matchingDateArray)}>
                    <ul className="schedules">{matchingDateArray.map(schedule => renderSchedules(schedule, maxIndex))}</ul>
                </div>
            );
        }
        return <div css={SdateCellBox(customHeight)}>{/* 만약 데이터가 없어도 셀 크기를 유지함 */}</div>;
    };

    return (
        <>
            {addModalOpen ? <AddScheduleModal open={addModalOpen} setOpen={setAddModalOpen} date={selectedDate} /> : <></>}
            <EditScheduleModal open={editModalOpen} setOpen={setEditModalOpen} />
            <MoreScheduleModal open={moreModalOpen} setOpen={setMoreModalOpen} dateObject={selectedDate} schedules={selectedScheduleArray} />
            <div css={SMainContainer}>
                <StyledCalendar cellRender={cellRender} rowNumber={rowNumber} onPanelChange={onMonthChange} />
            </div>
        </>
    );
}

export default CalendarPage;
