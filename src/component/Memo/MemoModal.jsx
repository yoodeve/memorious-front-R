import React, { useState } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { ModalContainer } from "./style";
import { instance } from "../../config";

function MemoModal({ setOpen, open }) {
    const queryClient = useQueryClient();
    const { data } = queryClient.getQueryState(["getPrincipal"]);
    const [messageApi, contextHolder] = message.useMessage();
    const [memoContent, setMemoContent] = useState();
    const mutation = useMutation(d => instance.post("/api/memo", d), {
        onSuccess: () => {
            queryClient.refetchQueries(["getMemo"]);
        },
    });
    const info = () => {
        messageApi.info("메모를 입력해주세요.");
    };
    const setClose = () => {
        setOpen(false);
    };
    const onMemoChange = e => {
        setMemoContent(e.target.value);
    };

    const onOk = async () => {
        console.log(memoContent);
        if (memoContent === "") {
            info();
            return;
        }
        try {
            mutation.mutate({ author: data.data.userId, memoContent, createdDate: dayjs().format("YYYY-MM-DD hh:mm") });
            setMemoContent("");
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {contextHolder}
            <ModalContainer destroyOnClose title="메모 추가하기" centered onOk={onOk} onCancel={setClose} open={open}>
                <TextArea
                    onChange={onMemoChange}
                    value={memoContent}
                    placeholder="메모를 입력해주세요."
                    autoSize={{
                        minRows: 3,
                        maxRows: 3,
                    }}
                />
            </ModalContainer>
        </>
    );
}

export default MemoModal;
