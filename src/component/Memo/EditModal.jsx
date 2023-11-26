import { Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { instance } from "../../config";
import { EditModalContainer } from "./style";

function EditModal({ memoDesc, open, setOpen }) {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"]);
    const { userId, nickname } = principal.data.data;
    const [newMemo, setNewMemo] = useState("");
    const onMemoChange = e => {
        setNewMemo(e.target.value);
    };

    const mutationEdit = useMutation(data => instance.put(`/api/memo/${memoDesc.memoId}`, data), {
        onSuccess: () => {
            queryClient.refetchQueries(["getMemo"]);
        },
    });

    const mutationDelete = useMutation(
        () => {
            return instance.delete(`/api/memo/${memoDesc.memoId}/${userId}`);
        },
        {
            onSuccess: () => {
                queryClient.refetchQueries(["getMemo"]);
            },
        },
    );

    const onClose = () => {
        setNewMemo("");
        setOpen(false);
    };

    const onMemoEditClick = async () => {
        try {
            if (newMemo === "") {
                messageApi.warning("메모를 입력해주세요.");
                return;
            }
            await mutationEdit.mutate({
                author: principal.data.data.userId,
                memoContent: newMemo,
                createdDate: dayjs().format("YY-MM-DD HH:mm"),
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
        <>
            {contextHolder}
            <EditModalContainer
                destroyOnClose
                title="메모 수정"
                centered
                open={open}
                closeIcon
                onCancel={onClose}
                footer={
                    nickname === memoDesc.author
                        ? [
                              <Button key={1} danger onClick={onMemoDeleteClick}>
                                  삭제
                              </Button>,
                              <Button key={2} type="primary" onClick={onMemoEditClick}>
                                  수정
                              </Button>,
                              <Button key={3} onClick={onClose}>
                                  닫기
                              </Button>,
                          ]
                        : [
                              <Button key={3} onClick={onClose}>
                                  닫기
                              </Button>,
                          ]
                }
            >
                <TextArea
                    onChange={onMemoChange}
                    value={newMemo !== "" ? newMemo : memoDesc.memoContent}
                    autoSize={{
                        minRows: 3,
                        maxRows: 3,
                    }}
                />
            </EditModalContainer>
        </>
    );
}

export default EditModal;
