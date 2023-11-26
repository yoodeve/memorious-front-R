import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { Button, Table } from "antd";
import Chart from "../../component/Chart/Chart";
import ChartTableContainer from "../../component/ChartDetail/ChartTableContainer";
import { instance } from "../../config";
import { dummyTableData, tableColumns } from "../../component/Chart/chartDummyData";
/** @jsxImportSource @emotion/react */

const headerWrapper = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    height: fit-content;
    place-items: center;
    div:nth-of-type(1) {
        grid-column: 1 / 3;
        grid-row: 1 / 1;
    }
    div:nth-of-type(2) {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
        align-items: center;
        margin-top: 20px;
    }
`;

function ChartDetail() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data } = queryClient.getQueryState(["getPrincipal"]);
    const tableCss = useMemo(() => {
        return { height: "25vh", width: "500px" };
    }, []);
    const [tableData, setTableData] = useState([]);

    const toBack = () => {
        navigate("/chart");
    };
    const fetchTableData = async () => {
        instance.get("/api/chart", { params: { userId: data.data.userId } }).then(resp => {
            setTableData(resp.data);
        });
    };

    useQuery(["getTableData"], fetchTableData, {
        refetchOnReconnect: true,
    });

    return (
        <Chart>
            <ChartTableContainer>
                <div css={headerWrapper}>
                    <div>
                        <h1>내건강데이터 입력하기</h1>
                    </div>
                    <div>
                        <Button onClick={toBack} style={{ marginLeft: "20px" }}>
                            뒤로가기
                        </Button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <Table className="s-table" headerColor="#6F6257" dataSource={tableData.length > 0 ? tableData : dummyTableData} columns={tableColumns} style={tableCss} position="bottomCenter" />
                </div>
            </ChartTableContainer>
        </Chart>
    );
}

export default ChartDetail;
