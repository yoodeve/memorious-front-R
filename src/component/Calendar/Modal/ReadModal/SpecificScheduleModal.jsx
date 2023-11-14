import { Modal } from "antd";
import React, { useState } from "react";

function SpecificScheduleModal(open, setOpen) {
    const [title, setTitle] = useState("일정 조회");

    const handleOk = () => {
        // useState 지우기 싫어서
        setTitle("일정 조회");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal centered title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
                zz
            </Modal>
        </div>
    );
}

export default SpecificScheduleModal;
