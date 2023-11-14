/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { ModalContainer } from "./style";
import { instance } from "../../config";

function MemoModal({ setOpen, open }) {
    const queryClient = useQueryClient();

    const [memoContent, setMemoContent] = useState();
    const mutation = useMutation(data => instance.post("/api/memo", data), {
        onSuccess: () => {
            queryClient.refetchQueries(["getMemo"]);
        },
    });

    const setClose = () => {
        setOpen(false);
    };
    const onMemoChange = e => {
        setMemoContent(e.target.value);
    };

    const onOk = async () => {
        try {
            mutation.mutate({ author: "나", memoContent, createdDate: dayjs().format("YYYY-MM-DD hh:mm") });
            setMemoContent("");
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * @todo 유정 : antd modal mask영역 조절
     */
    return (
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
    );
}

export default MemoModal;
