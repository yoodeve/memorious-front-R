import { Modal } from "antd";
import React from "react";

/*
todo : (1)이메일 전송 결과(t/f)값을 InviteModal에서 받아오고 이를 표시해줌
todo : (2)카카오톡 공유하기
todo : (3)모달 디자인 변경
*/

function InviteResultModal({ open, setOpen, email, isSuccess }) {
    const title = isSuccess ? "초대 성공" : "초대 실패";

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal centered title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
            <p>
                입력하신 {email}로 전송을 {isSuccess ? "성공" : "실패"} 하였습니다.
            </p>
        </Modal>
    );
}

export default InviteResultModal;
