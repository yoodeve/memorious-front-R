import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrRefresh } from "react-icons/gr";
import { memoHeaderContainer } from "./style";
import MemoModal from "./MemoModal";
/** @jsxImportSource @emotion/react */

function MemoHeader() {
    const [memoType, setMemoType] = useState("");
    const [open, setOpen] = useState(false);
    const onMemoAddClick = () => {
        setMemoType("add");
        setOpen(true);
    };

    return (
        <>
            <MemoModal setOpen={setOpen} open={open} type={memoType} />
            <div className="all-container" css={memoHeaderContainer}>
                <div onClick={onMemoAddClick} className="memo-add-area">
                    <div className="memo-add-icon-wrapper">
                        <AiOutlinePlus className="memo-add-icon" />
                    </div>
                    <span>메모추가</span>
                </div>
                <div className="memo-add-area input-area">
                    <input type="text" />
                </div>
                <button className="search-button">검색</button>
                <div className="memo-add-area">
                    <GrRefresh />
                </div>
            </div>
        </>
    );
}

export default MemoHeader;
