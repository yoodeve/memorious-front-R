import dayjs from "dayjs";

const getWeekRange = date => {
    // 해당 주의 일요일
    const startOfWeek = dayjs(date).startOf("week");
    // 해당 주의 토요일
    const endOfWeek = dayjs(date).endOf("week");

    return { startOfWeek, endOfWeek };
};
// 여러날의 일정은 주단위로 나눠주고, dayDiff추가
const preprocessData = schedule => {
    let startDate = dayjs(schedule.startDate);
    const endDate = dayjs(schedule.endDate);
    const weeklySchedules = [];
    let weekIndex = 1;

    // 당일이 아닌 일정들이면
    if (schedule.startDate !== schedule.endDate) {
        // 시작날짜부터 종료날짜까지
        while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
            // 시작 날이 있는 주의 첫날과 끝날
            const { startOfWeek, endOfWeek } = getWeekRange(startDate);

            // 주의 시작일이 해당 일정의 시작일 이전이면 시작일을 해당 일정의 시작일로 설정
            const adjustedStartOfWeek = startDate.isAfter(startOfWeek) ? startDate : startOfWeek;
            // 주의 종료일이 해당 일정의 종료일 이후이면 종료일을 해당 일정의 종료일로 설정
            const adjustedEndOfWeek = endDate.isBefore(endOfWeek) ? endDate : endOfWeek;

            // 며칠짜리 일정인지
            const dayDiff = adjustedEndOfWeek.diff(adjustedStartOfWeek, "day") + 1;
            weeklySchedules.push({
                ...schedule,
                startDate: adjustedStartOfWeek.format("YYYY-MM-DD"),
                endDate: adjustedEndOfWeek.format("YYYY-MM-DD"),
                dayDiff,
                weekIndex,
            });

            // startDate를 다음주의 첫 날로 변경
            startDate = startOfWeek.add(1, "week");
            weekIndex += 1;
        }
    } else {
        // 당일 일정들
        weeklySchedules.push({ ...schedule, dayDiff: 0 });
    }
    return weeklySchedules;
};

export default preprocessData;
