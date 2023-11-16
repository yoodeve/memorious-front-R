import { Button } from "antd";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { rcTableData } from "../../store/atoms/chartTableAtoms";
import { instance } from "../../config";

function ChartDetailAddBtn() {
    const queryClient = useQueryClient();
    const { data } = queryClient.getQueryState(["getPrincipal"]);
    const mutationEdit = useMutation(d => instance.post("/api/chart", d), {
        onSuccess: () => {
            queryClient.refetchQueries(["getTableData"]);
        },
    });
    const [tableData, setTableData] = useRecoilState(rcTableData);

    const onClick = async () => {
        await mutationEdit.mutate({ ...tableData, userId: data.data.userId });
        setTableData({ step: 0, fbs: 0, date: dayjs().format("YYYY-MM-DD"), pulse: 0 });
    };
    return <Button onClick={onClick}>추가</Button>;
}

export default ChartDetailAddBtn;
