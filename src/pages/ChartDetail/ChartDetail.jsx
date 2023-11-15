import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Table } from "antd";
import Chart from "../../component/Chart/Chart";
import ChartTableContainer from "../../component/ChartDetail/ChartTableContainer";
import { instance } from "../../config";
import { tableColumns } from "../../component/Chart/chartDummyData";

function ChartDetail() {
    const tableCss = useMemo(() => {
        return { height: "25vh", width: "500px" };
    }, []);

    const [tableData, setTableData] = useState([]);

    const fetchTableData = async () => {
        instance.get("/api/chart", { params: { userId: "유정" } }).then(resp => {
            setTableData(resp.data);
        });
    };

    useQuery(["getTableData"], fetchTableData, {
        refetchOnReconnect: true,
    });

    return (
        <Chart>
            <ChartTableContainer>
                <h1>내건강데이터 입력하기</h1>
                <div className="table-wrapper">
                    <Table className="s-table" headerColor="#6F6257" dataSource={tableData} columns={tableColumns} style={tableCss} position="bottomCenter" />
                </div>
            </ChartTableContainer>
        </Chart>
    );
}

export default ChartDetail;
