import React from "react";
import { Table } from "antd";

function BoardList() {
    const columns = [
        {
            title: "No.",
            dataIndex: "pageId",
            key: "pageId",
        },
        {
            title: "제목",
            dataIndex: "title",
            key: "title",
        },
    ];

    const data = [
        {
            key: "1",
            pageId: "1",
            title: "John Brown",
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
}

export default BoardList;
