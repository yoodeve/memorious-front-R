import React from "react";
import StyledModal from "./StyledModal/StyledModal";

function AddScheduleModal({ open, setOpen, date }) {
    console.log("date in addModal", date);

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <StyledModal open={open} onOk={handleOk} onCancel={handleCancel} date={date} />
        </div>
    );
}

export default AddScheduleModal;
