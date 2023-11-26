import React from "react";
import renderSchedule from "../../../../utils/Calendar/renderSchedule";
import { SModal } from "./style";

function MoreScheduleModal({ open, setOpen, dateObject, schedules, position }) {
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
            <SModal title={title} open={open} onOk={handleOk} onCancel={handleCancel} footer={null} width={300} style={{ top: position.top - 260, left: position.left - 900 }}>
                <div>{schedules.map(schedule => renderSchedule(schedule))}</div>
            </SModal>
        </div>
    );
}

export default MoreScheduleModal;
