const getVisibleDates = date => {
    const firstDay = date.startOf("month");
    const dayOfFirstDay = firstDay.day();

    const firstDayOfCal = dayOfFirstDay === 0 ? firstDay : firstDay.startOf("week");
    const lastDayOfCal = firstDayOfCal.add(41, "day");

    const calendarDays = [];
    let currentDay = firstDayOfCal;
    while (currentDay.isBefore(lastDayOfCal) || currentDay.isSame(lastDayOfCal, "day")) {
        calendarDays.push(currentDay.format("YY-MM-DD"));
        currentDay = currentDay.add(1, "day");
    }

    console.log(calendarDays);
    return calendarDays;
};

export default getVisibleDates;
