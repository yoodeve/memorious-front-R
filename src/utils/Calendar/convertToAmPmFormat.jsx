const convertToAmPmFormat = timeString => {
    const [hours] = timeString.split(":");

    // const formattedTime = `${hours}시`;

    // 12시간제로 표시(데이터셀이 너무 작다)
    let period = "오전";
    let formattedHours = parseInt(hours, 10);
    if (formattedHours >= 12) {
        period = "오후";
        formattedHours -= 12;
    }
    if (formattedHours === 0) {
        formattedHours = 12;
    }
    const formattedTime = `${period} ${formattedHours}시`;

    return formattedTime;
};

export default convertToAmPmFormat;
