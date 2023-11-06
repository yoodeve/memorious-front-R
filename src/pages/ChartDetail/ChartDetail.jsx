import React, { useMemo } from "react";
import { Table } from "antd";
import Chart from "../../component/Chart/Chart";
import ChartTableContainer from "../../component/ChartDetail/ChartTableContainer";
import { chartTableDummyData, tableColumns } from "../../component/Chart/chartDummyData";

function ChartDetail() {
    const tableCss = useMemo(() => {
        return { width: "400px", borderRadius: "6px" };
    }, []);

    return (
        <Chart>
            <ChartTableContainer>
                <h1>내건강데이터 입력하기</h1>
                <Table headerColor="#6F6257" dataSource={chartTableDummyData} columns={tableColumns} style={tableCss} position="bottomCenter" />
            </ChartTableContainer>
        </Chart>
    );
}

export default ChartDetail;
