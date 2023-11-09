import { Button } from "antd";
import React, { useState } from "react";
import ChartEditModal from "./ChartEditModal";

function ChartDetailEditBtn({ record }) {
    const [open, setOpen] = useState(false);

    const onClick = async () => {
        setOpen(true);
    };
    return (
        <>
            <ChartEditModal record={record} open={open} setOpen={setOpen} />
            <Button type="primary" onClick={onClick}>
                수정
            </Button>
        </>
    );
}

export default ChartDetailEditBtn;
