import React, { useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import { EditModalContainer } from "./style";
import { instance } from "../../config";

function EditModal({ memoDesc, open, setOpen }) {
    const queryClient = useQueryClient();
    const [newMemo, setNewMemo] = useState("");
    const onMemoChange = e => {
        setNewMemo(e.target.value);
    };

    const mutationEdit = useMutation(data => instance.put(`/api/memo/${memoDesc.memoId}`, data), {
        onSuccess: () => {
            queryClient.refetchQueries(["getMemo"]);
        },
    });

    const mutationDelete = useMutation(() => instance.delete(`/api/memo/${memoDesc.memoId}`), {
        onSuccess: () => {
            queryClient.refetchQueries(["getMemo"]);
        },
    });

    const onClose = () => {
        setNewMemo("");
        setOpen(false);
    };

    const onMemoEditClick = async () => {
        try {
            await mutationEdit.mutate({
                author: "나",
                memoContent: newMemo,
                createdDate: dayjs().format("YYYY-MM-DD hh:mm"),
            });
            onClose();
        } catch (error) {
            console.error("Error editing memo:", error);
        }
    };

    const onMemoDeleteClick = async () => {
        mutationDelete.mutate();
        onClose();
    };

    return (
        <EditModalContainer
            destroyOnClose
            title="메모 수정"
            centered
            open={open}
            closeIcon
            footer={[
                <Button key={1} danger onClick={onMemoDeleteClick}>
                    삭제
                </Button>,
                <Button key={2} type="primary" onClick={onMemoEditClick}>
                    수정
                </Button>,
                <Button key={3} onClick={onClose}>
                    닫기
                </Button>,
            ]}
        >
            <TextArea
                onChange={onMemoChange}
                placeholder={memoDesc.memoContent}
                value={newMemo}
                autoSize={{
                    minRows: 3,
                    maxRows: 3,
                }}
            />
        </EditModalContainer>
    );
}

export default EditModal;
