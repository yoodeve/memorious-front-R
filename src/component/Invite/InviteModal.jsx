import React, { useState } from "react";
import { Modal, Input, Select } from "antd";
import axios from "axios";
import { emailOptions } from "../../constants/emailOptions";
import InviteResultModal from "./InviteResultModal";
// import { useQueryClient } from "react-query";

/*
todo : 이메일 정규식 검증 및 req/resp
*/
function InviteModal({ open, setOpen }) {
    const defaultEmail = {
        local: "",
        domain: "",
        domainSelectBox: "naver.com",
    };
    const [emailInputValue, setEmailInputValue] = useState(defaultEmail);
    const [resultModalOpen, setResultModalOpen] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    // const queyrClient = useQueryClient();
    // const principalState = queyrClient.getQueryState("getPrincipal");
    // const principal = principalState.data.data;

    // <<< 모달창 관련 >>>
    const handleOk = async () => {
        const emailInput = `${emailInputValue.local}@${emailInputValue.domainSelectBox === "직접 입력" ? emailInputValue.domain : emailInputValue.domainSelectBox}`;
        setEmailAddress(emailInput);
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await axios.post("/invitation/mail", { emailInput }, option);
            setIsSuccess(true);
        } catch (error) {
            setIsSuccess(false);
        } finally {
            setOpen(false);
            setResultModalOpen(true);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setEmailInputValue(defaultEmail);
    };

    // <<< Input local Part관련 >>>
    const onLocalChange = e => {
        setEmailInputValue({
            ...emailInputValue,
            local: e.target.value,
        });
    };

    const onDomainChange = e => {
        if (emailInputValue.domainSelectBox === "직접 입력") {
            setEmailInputValue({
                ...emailInputValue,
                domain: e.target.value,
            });
        } else {
            setEmailInputValue({
                ...emailInputValue,
                domain: emailInputValue.domainSelectBox,
            });
        }
    };

    const onDomainSelectBoxChange = value => {
        setEmailInputValue({
            ...emailInputValue,
            domainSelectBox: value,
        });
    };

    return (
        <>
            <Modal centered title="가족초대하기" open={open} onOk={handleOk} onCancel={handleCancel}>
                <p>초대하실 가족의 이메일을 입력해주세요.</p>
                <Input name="local" onChange={onLocalChange} value={emailInputValue.local} onPressEnter={handleOk} style={{ width: "40%" }} />
                @
                <Input name="domain" onChange={onDomainChange} defaultValue={emailOptions[0].value} value={emailInputValue.domainSelectBox === "직접 입력" ? emailInputValue.domain : emailInputValue.domainSelectBox} style={{ width: "20%" }} />
                <Select name="domainSelectBox" options={emailOptions} onChange={onDomainSelectBoxChange} value={emailInputValue.domainSelectBox} style={{ width: "25%" }} />
            </Modal>
            <InviteResultModal open={resultModalOpen} setOpen={setResultModalOpen} email={emailAddress} isSuccess={isSuccess} />
        </>
    );
}
export default InviteModal;
