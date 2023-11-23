import dayjs from "dayjs";

const getWeekCount = date => {
    // 특정 날짜가 속한 달의 첫 번째 날을 구함
    const firstDayOfMonth = dayjs(date).startOf("month");

    // 특정 날짜가 속한 달의 마지막 날을 구함
    const lastDayOfMonth = dayjs(date).endOf("month");

    // 캘린더의 첫 번째 날은 첫 번째 주의 일요일
    const firstDayOfCalendar = firstDayOfMonth.startOf("week");

    // 캘린더의 마지막 날은 마지막 주의 토요일
    const lastDayOfCalendar = lastDayOfMonth.endOf("week");

    // 캘린더의 첫 번째 날부터 마지막 날까지의 dayjs 값 배열 생성
    const calendarDays = [];
    let currentDay = firstDayOfCalendar;

    while (currentDay.isBefore(lastDayOfCalendar) || currentDay.isSame(lastDayOfCalendar, "day")) {
        calendarDays.push(currentDay);
        currentDay = currentDay.add(1, "day");
    }

    // 주의 개수를 세기 위해 배열을 일주일(7일) 단위로 나눔
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
    }

    return weeks.length;
};

export default getWeekCount;
