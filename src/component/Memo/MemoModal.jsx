import React from "react";
import { ModalContainer } from "./style";

function MemoModal({ setOpen, open, type }) {
    const setClose = () => {
        setOpen(false);
    };

    /**
     * @todo 유정 : antd modal mask영역 조절
     */
    if (type === "add") {
        return (
            <ModalContainer centered onOk={setClose} onCancel={setClose} open={open}>
                추가모달
            </ModalContainer>
        );
    }
    return <ModalContainer open={open}>수정모달</ModalContainer>;
}

export default MemoModal;
