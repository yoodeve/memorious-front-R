import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import Badge from "../../component/Calendar/Modal/Badge/Badge";
import AddScheduleModal from "../../component/Calendar/Modal/AddModal/AddScheduleModal";
import EditScheduleModal from "../../component/Calendar/Modal/EditModal/EditScheduleModal";
import StyledCalendar from "../../component/Calendar/Styled/StyledCalendar/StyledCalendar";
import { SEmptyBox, SMainContainer, SScheduleBox, SScheduleText, STimeText, SdateCellBox } from "./style";
import { instance } from "../../config";

function CalendarPage() {
    const now = dayjs();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(now);
    const [customHeight, setCustomHeight] = useState(133);
    const [rowNumber, setRowNumber] = useState(5);
    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/api/calendar/schedule/${now.format("YYYY-MM")}`);
                setResponseData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // 시간 변환
    const convertToAmPmFormat = timeString => {
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
    };

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

    const sortResponseData = (a, b) => {
        // isAllDay가 true이면서 startDate와 endDate의 차이가 가장 큰 객체를 가장 앞으로 이동
        if (a.isAllDay && b.isAllDay) {
            const diffA = dayjs(a.endDate).diff(a.startDate);
            const diffB = dayjs(b.endDate).diff(b.startDate);
            return diffB - diffA;
        }

        // isAllDay가 true이면 a를 더 앞으로 이동
        if (a.isAllDay) {
            return -1;
        }

        // isAllDay가 true이면 b를 더 앞으로 이동
        if (b.isAllDay) {
            return 1;
        }

        // isAllDay가 false이고 startTime이 가장 이른 시간
        const startTimeA = dayjs(`${a.startDate} ${a.startTime}`);
        const startTimeB = dayjs(`${b.startDate} ${b.startTime}`);

        return startTimeA.diff(startTimeB);
    };

    const getWeekRange = date => {
        // 해당 주의 일요일
        const startOfWeek = dayjs(date).startOf("week");
        // 해당 주의 토요일
        const endOfWeek = dayjs(date).endOf("week");

        return { startOfWeek, endOfWeek };
    };

    // 여러날의 일정은 주단위로 나눠줌
    const preprocessData = schedule => {
        let startDate = dayjs(schedule.startDate);
        const endDate = dayjs(schedule.endDate);
        const weeklySchedules = [];
        let nthIndex = 1;

        if (schedule.startDate !== schedule.endDate) {
            while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
                const { startOfWeek, endOfWeek } = getWeekRange(startDate);

                // 주의 시작일이 해당 일정의 시작일 이전이면 시작일을 해당 일정의 시작일로 설정
                const adjustedStartOfWeek = startDate.isAfter(startOfWeek) ? startDate : startOfWeek;
                // 주의 종료일이 해당 일정의 종료일 이후이면 종료일을 해당 일정의 종료일로 설정
                const adjustedEndOfWeek = endDate.isBefore(endOfWeek) ? endDate : endOfWeek;

                const dayDiff = adjustedEndOfWeek.diff(adjustedStartOfWeek, "day") + 1;
                weeklySchedules.push({
                    ...schedule,
                    startDate: adjustedStartOfWeek.format("YYYY-MM-DD"),
                    endDate: adjustedEndOfWeek.format("YYYY-MM-DD"),
                    dayDiff,
                    nthIndex,
                });

                // startDate를 다음주의 첫 날로 변경
                startDate = startOfWeek.add(1, "week");
                nthIndex += 1;
            }
        } else {
            // 당일 일정들
            weeklySchedules.push({ ...schedule, dayDiff: 0 });
        }
        return weeklySchedules;
    };

    // 각각의 셀에 알맞은 일정을 표시하도록 데이터를 가공
    const getfilteredData = date => {
        const filteredData = [];
        const returnData = [];
        // const dateFormat = date.format("YYYY-MM-DD");

        const sortedData = responseData.sort(sortResponseData); // 순서 정렬

        sortedData.forEach(schedule => {
            filteredData.push(...preprocessData(schedule));
        });

        const findbetweenSchedule = data => {
            data.forEach(schedule => {
                const scheduleStart = dayjs(schedule.startDate);
                const scheduleEnd = dayjs(schedule.endDate);
                // 시작날짜와 종료날짜가 다른 것 중
                if (schedule.startDate !== schedule.endDate) {
                    // 시작날짜가 같으면 먼저 push
                    if (date.isSame(scheduleStart)) {
                        returnData.push({ ...schedule, isBetween: false });
                        // 시작 시작날짜를 넘고, 종료날짜보다 작거나 같은경우 is
                    } else if (date.isAfter(scheduleStart) && (date.isBefore(scheduleEnd) || date.isSame(scheduleEnd))) {
                        returnData.push({ ...schedule, isBetween: true, title: " " });
                    }
                } else if (schedule.dayDiff === 0 && !schedule.isAllDay) {
                    // startDate가 현재 날짜와 같은 경우
                    returnData.push({ ...schedule, isBetween: false });
                }
            });
        };

        findbetweenSchedule(filteredData);
        console.log(date.format("MM-DD"));
        console.log("returnData", returnData);
        return returnData;
    };

    // 각 날짜의 cell 안을 렌더링(일정)
    const cellRender = date => {
        const filteredSchedule = getfilteredData(date);
        return (
            <div css={SdateCellBox(customHeight)} onClick={() => handleAddSchedule(date)}>
                <ul className="schedules">
                    {filteredSchedule.map(schedule =>
                        schedule.isBetween ? (
                            <div css={SEmptyBox}> {schedule.title} </div>
                        ) : (
                            <>
                                <div onClick={e => handleScheduleClick(e, date)} css={SScheduleBox(schedule?.dayDiff)} key={`${schedule?.id}-${schedule?.nthIndex}`}>
                                    {/* 종일이 아닐 때의 스타일 추가 */}
                                    {schedule?.isAllDay && schedule?.dayDiff === 0 ? null : (
                                        <>
                                            {!schedule?.isAllDay && schedule?.dayDiff !== 0 && <Badge color={schedule?.labelColor} />}
                                            {!schedule?.isAllDay && <span css={STimeText}>{convertToAmPmFormat(schedule?.startTime)}</span>}
                                        </>
                                    )}
                                    <li css={SScheduleText(schedule?.labelColor, schedule?.isAllDay, schedule?.dayDiff)} key={`${schedule?.id}-${schedule?.nthIndex}`}>
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

    // 화면 비율에따라 5행 / 6행 다르게 표시
    useEffect(() => {
        const updateDynamicHeight = () => {
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            let calculatedHeight;
            const viewportRatio = viewportWidth / viewportHeight;

            // 세로비율이 16:10만큼 커지면 행+
            if (viewportRatio <= 1.9) {
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
