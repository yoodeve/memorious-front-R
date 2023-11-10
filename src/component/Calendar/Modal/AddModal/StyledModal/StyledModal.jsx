import React from "react";
import { Input } from "antd";
import { SModal } from "./style";

function StyledModal({ open, onOk, onCancel, date }) {
    // const dateFormat = date.format("YYYY-MM-DD");

    return (
        <SModal centered title="일정 추가하기" open={open} onOk={onOk} onCancel={onCancel} date={date}>
            {/* <div>{dateFormat}</div> */}
            <Input placeholder="제목을 입력해주세요.(필수)" size="large" />
            {/* <Select></Select> */}
            {/* <ColorPicker /> */}
            {/* <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" /> */}
            {/* <RangePicker defaultValue={[dayjs("2015/01/01", dateFormat), dayjs("2015/01/01", dateFormat)]} format={dateFormat} /> */}
        </SModal>
    );
}

export default StyledModal;
