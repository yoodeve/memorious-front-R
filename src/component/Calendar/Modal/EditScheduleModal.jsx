import { Modal } from "antd";
import React, { useState } from "react";

function EditScheduleModal(open, setOpen) {
    const [title, setTitle] = useState("수정모달");

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

export default EditScheduleModal;
