import { Button } from "antd";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { rcTableData } from "../../store/atoms/chartTableAtoms";
import { instance } from "../../config";

function ChartDetailAddBtn() {
    const queryClient = useQueryClient();
    const mutationEdit = useMutation(data => instance.post("/api/chart", data), {
        onSuccess: () => {
            queryClient.refetchQueries(["getTableData"]);
        },
    });
    const [tableData, setTableData] = useRecoilState(rcTableData);

    const onClick = async () => {
        await mutationEdit.mutate({ ...tableData, userId: "유정" });
        setTableData({ step: 0, fbs: 0, date: dayjs().format("YYYY-MM-DD"), pulse: 0 });
    };
    return <Button onClick={onClick}>추가</Button>;
}

export default ChartDetailAddBtn;
