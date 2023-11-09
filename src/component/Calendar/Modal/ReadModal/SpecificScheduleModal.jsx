import { Modal } from "antd";
import React, { useState } from "react";

function SpecificScheduleModal(open, setOpen) {
    const [title, setTitle] = useState("초대완료/실패");

    const handleOk = () => {
        // useState 지우기 싫어서
        setTitle("초대완료");
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
