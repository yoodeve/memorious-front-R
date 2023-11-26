import { Modal } from "antd";
import React, { useState } from "react";

function SpecificScheduleModal(open, setOpen) {
    const [title, setTitle] = useState("일정 조회");

    const handleOk = () => {
        setTitle("일정 조회");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal centered title={title} open={open} onOk={handleOk} onCancel={handleCancel} okText="추가" cancelText="취소">
                zz
            </Modal>
        </div>
    );
}

export default SpecificScheduleModal;
