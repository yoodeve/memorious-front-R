import { Modal } from "antd";
import React, { useState } from "react";

/*
todo : (1)이메일 전송 결과(t/f)값을 InviteModal에서 받아오고 이를 표시해줌
todo : (2)카카오톡 공유하기
todo : (3)모달 디자인 변경
*/

function InviteResultModal({ open, setOpen, email }) {
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
        <Modal centered title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
            <p>{email}</p>
        </Modal>
    );
}

export default InviteResultModal;
