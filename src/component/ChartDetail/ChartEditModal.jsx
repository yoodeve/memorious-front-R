import { Input, Modal } from "antd";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { instance } from "../../config";

function ChartEditModal({ open, setOpen, record }) {
    const queryClient = useQueryClient();
    const [healthInfo, setHealthInfo] = useState({ chartDataId: parseInt(record.chartDataId, 10), step: record.step, fbs: record.fbs, pulse: record.pulse });

    const mutationEdit = useMutation(data => instance.put("/api/chart", data), {
        onSuccess: () => {
            queryClient.refetchQueries(["getTableData"]);
        },
    });

    const onChange = e => {
        const { name, value } = e.target;
        setHealthInfo({
            ...healthInfo,
            [name]: value,
        });
        console.log();
    };

    const onOk = async () => {
        await mutationEdit.mutate(healthInfo);
        setOpen(false);
    };

    return (
        <Modal
            title="데이터 수정하기"
            open={open}
            onOk={onOk}
            onCancel={() => {
                setOpen(false);
            }}
        >
            <span>공복혈당</span>
            <Input name="fbs" onChange={onChange} value={healthInfo.fbs} />
            <span>걸음수</span>
            <Input name="step" onChange={onChange} value={healthInfo.step} />
            <span>맥박</span>
            <Input name="pulse" onChange={onChange} value={healthInfo.pulse} />
        </Modal>
    );
}

export default ChartEditModal;
