const getVisibleDates = date => {
    const firstDay = date.startOf("month");
    const dayOfFirstDay = firstDay.day();

    const firstDayOfCal = dayOfFirstDay === 0 ? firstDay : firstDay.startOf("week");
    const lastDayOfCal = firstDayOfCal.add(41, "day");

    const calendarDays = [];
    let currentDay = firstDayOfCal;
    while (currentDay.isBefore(lastDayOfCal) || currentDay.isSame(lastDayOfCal, "day")) {
        calendarDays.push(currentDay);
        currentDay = currentDay.add(1, "day");
    }

    return calendarDays;
};

export default getVisibleDates;
