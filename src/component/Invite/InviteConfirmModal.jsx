import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function InviteConfirmModal({ open, setOpen }) {
    const navigate = useNavigate();

    const handleOk = () => {
        setOpen(false);
        navigate("/");
    };

    const handleCancel = () => {
        setOpen(false);
        navigate("/");
    };

    return (
        <div>
            <Modal centered title="가족에 소속되었습니다." open={open} setOpen={setOpen} onOk={handleOk} onCancel={handleCancel} okText="확인" cancelText="취소">
                <p>이제, 가족간의 소중한 추억을 공유하세요.</p>
            </Modal>
        </div>
    );
}

export default InviteConfirmModal;
