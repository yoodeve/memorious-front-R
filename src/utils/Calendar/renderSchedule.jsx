import { Badge } from "antd";
import { SModalScheduleBox, SModalScheduleText, STimeText } from "../../pages/Calendar/style";
import convertToAmPmFormat from "./convertToAmPmFormat";
/** @jsxImportSource @emotion/react */

const renderSchedule = schedule => {
    if (!schedule?.isBetween) {
        return (
            <>
                <div css={SModalScheduleBox(schedule?.dayDiff, schedule?.isAllDay, schedule?.labelColor)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-2`}>
                    {schedule?.isAllDay && schedule?.dayDiff === 0 ? null : (
                        <>
                            {!schedule?.isAllDay && schedule?.dayDiff === 0 && <Badge color={schedule?.labelColor} />}
                            {!schedule?.isAllDay && schedule?.dayDiff === 0 && <span css={STimeText}>{convertToAmPmFormat(schedule?.startTime)}</span>}
                        </>
                    )}
                    <li className={schedule?.scheduleId} css={SModalScheduleText(schedule?.dayDiff)} key={`${schedule?.scheduleId}-${schedule?.weekIndex}-${schedule?.uqKey}-3`}>
                        {schedule?.title}
                    </li>
                </div>
            </>
        );
    }
};
export default renderSchedule;
