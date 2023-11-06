import React from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import MemoHeader from "../../component/Memo/MemoHeader";
import MemoContainer from "../../component/Memo/MemoContainer";

const memoMainContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function MemoMain() {
    return (
        <div css={memoMainContainer}>
            <MemoHeader />
            <MemoContainer />
        </div>
    );
}

export default MemoMain;
