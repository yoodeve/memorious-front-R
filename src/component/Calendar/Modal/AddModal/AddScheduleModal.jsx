import React, { useState } from "react";
import { Input } from "antd";
import { SModal } from "./style";
function AddScheduleModal({ open, setOpen, date }) {
    console.log("date in addModal", date);

    const defaultScheduleInput = {
        scheduleTitle: "",
        labelColor: "",
        startDate: "",
        endDate: "",
        isDayAll: 1,
        startTime: "",
        endTime: "",
        attendee: "",
        location: "",
        cycle: "",
        description: "",
    };

    const [scheduleInput, setScheduleInput] = useState(defaultScheduleInput);

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleTitleOnchange = e => {
        setScheduleInput({
            ...scheduleInput,
            scheduleTitle: e.target.value,
        });
    };
    return (
        <>
            <SModal centered title="일정 추가하기" open={open} onOk={handleOk} onCancel={handleCancel} date={date}>
                {/* <div>{dateFormat}</div> */}
                <Input onChange={e => handleTitleOnchange} value={scheduleInput.ScheduleTitle} placeholder="제목을 입력해주세요.(필수)" size="large" />
                {/* <Select></Select> */}
                {/* <ColorPicker /> */}
                {/* <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" /> */}
                {/* <RangePicker defaultValue={[dayjs("2015/01/01", dateFormat), dayjs("2015/01/01", dateFormat)]} format={dateFormat} /> */}
            </SModal>
        </>
    );
}

export default AddScheduleModal;
