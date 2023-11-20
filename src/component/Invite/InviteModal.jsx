import { Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { instance } from "../../config";
import { emailOptions } from "../../constants/emailOptions";
import InviteResultModal from "./InviteResultModal";

/*
todo : 이메일 정규식 검증 및 req/resp
*/
function InviteModal({ open, setOpen }) {
    const defaultEmail = {
        local: "",
        domain: "",
        domainSelectBox: emailOptions[0].value,
    };
    const [emailInput, setEmailInput] = useState(defaultEmail);
    const [resultModalOpen, setResultModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const customDomainSelect = emailOptions[emailOptions.length - 1].value;
    const email = `${emailInput.local}@${emailInput.domainSelectBox === customDomainSelect ? emailInput.domain : emailInput.domainSelectBox}`;
    // <<< 모달창 관련 >>>
    const handleOk = async () => {
        try {
            const response = await instance.post("api/invitation/mail", { email });
            setIsSuccess(true);
            console.log("response", response);
        } catch (error) {
            setIsSuccess(false);
            console.log("error", error);
        } finally {
            setOpen(false);
            setResultModalOpen(true);
        }
    };

    // <<<모달 종료시>>>
    const handleCancel = () => {
        setOpen(false);
        setEmailInput(defaultEmail);
    };

    // <<< Input local Part관련 >>>
    const onLocalChange = e => {
        setEmailInput({
            ...emailInput,
            local: e.target.value,
        });
    };

    // << Domain 입력 부분 >>>
    const onDomainChange = e => {
        setEmailInput({
            ...emailInput,
            domain: e.target.value,
        });
        console.log(emailInput.domain);

        // 직접입력 일때만 Change를 반영함
        // if (emailInput.domainSelectBox === customDomainSelect) {
        //     setEmailInput({
        //         ...emailInput,
        //         domain: e.target.value,
        //     });
        // } else {
        //     setEmailInput({
        //         ...emailInput,
        //         domain: emailInput.domainSelectBox,
        //     });
        // }
    };

    // <<< Domain Select 부분 >>>
    const onDomainSelectBoxChange = value => {
        setEmailInput({
            ...emailInput,
            domainSelectBox: value,
        });
    };

    return (
        <>
            <Modal centered title="가족초대하기" open={open} onOk={handleOk} onCancel={handleCancel}>
                <p>초대하실 가족의 이메일을 입력해주세요.</p>
                <Input name="local" onChange={onLocalChange} value={emailInput.local} onPressEnter={handleOk} style={{ width: "40%" }} />
                @
                <Input name="domain" onChange={onDomainChange} value={emailInput.domainSelectBox === customDomainSelect ? emailInput.domain : emailInput.domainSelectBox} style={{ width: "20%" }} />
                <Select name="domainSelectBox" options={emailOptions} onChange={onDomainSelectBoxChange} value={emailInput.domainSelectBox} style={{ width: "25%" }} />
            </Modal>
            <InviteResultModal open={resultModalOpen} setOpen={setResultModalOpen} email={email} isSuccess={isSuccess} />
        </>
    );
}
export default InviteModal;
