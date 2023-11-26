const convertTo24HourFormat = timeString => {
    const [hours] = timeString.split(":");

    const formattedTime = `${hours}시`;

    return formattedTime;
};

export default convertTo24HourFormat;
