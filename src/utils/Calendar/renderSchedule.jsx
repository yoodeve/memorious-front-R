import React from "react";
import { SModalScheduleBox, SModalScheduleText, STimeText } from "../../pages/Calendar/style";
import convertToAmPmFormat from "./convertToAmPmFormat";
/** @jsxImportSource @emotion/react */
// import Badge from "../../component/Calendar/Modal/Badge/Badge";
import Badge from "../../component/Calendar/Modal/Badge/Badge";

const renderSchedule = schedule => {
    if (schedule?.date) {
        return null;
    }
    return (
        <>
            <div css={SModalScheduleBox(schedule?.dayDiff, schedule?.isAllDay, schedule?.labelColor)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-6`}>
                {schedule?.isAllDay ? null : (
                    <React.Fragment key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-8`}>
                        {schedule?.dayDiff === 0 && <Badge color={schedule?.labelColor} />}
                        <span css={STimeText}>{convertToAmPmFormat(schedule?.startTime)}</span>
                    </React.Fragment>
                )}
                <li className={schedule?.scheduleId} css={SModalScheduleText} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-7`}>
                    {schedule?.title}
                </li>
            </div>
        </>
    );
};
export default renderSchedule;
