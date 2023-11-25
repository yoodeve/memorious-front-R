import React from "react";
import renderSchedule from "../../../../utils/Calendar/renderSchedule";
import { SModal } from "./style";

function MoreScheduleModal({ open, setOpen, dateObject, schedules }) {
    const month = dateObject.get("month");
    const date = dateObject.get("date");
    const title = `${month}월 ${date}일 `;

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <SModal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
                <>{schedules.map(schedule => renderSchedule(schedule))}</>
            </SModal>
        </div>
    );
}

export default MoreScheduleModal;
