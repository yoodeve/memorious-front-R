import React from "react";
import { memoHeaderContainer } from "./style";
/** @jsxImportSource @emotion/react */

function MemoHeader() {
    return (
        <div css={memoHeaderContainer}>
            <div>메모추가</div>
            <div>검색</div>
            <div>새로고침</div>
        </div>
    );
}

export default MemoHeader;
