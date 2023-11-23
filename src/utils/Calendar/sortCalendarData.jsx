import dayjs from "dayjs";

const sortCalendarData = (a, b) => {
    // (1)시작 날짜순 정렬
    const startDiff = dayjs(a.startDate).diff(b.startDate);
    if (startDiff !== 0) {
        return startDiff;
    }

    // (2) startDate와 endDate의 차이가 가장 큰 객체를 가장 앞으로 이동
    const diffA = dayjs(a.endDate).diff(a.startDate);
    const diffB = dayjs(b.endDate).diff(b.startDate);

    if (diffA > diffB) {
        return -1;
    }
    if (diffA < diffB) {
        return 1;
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

export default sortCalendarData;
