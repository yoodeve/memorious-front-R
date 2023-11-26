import React from "react";
import dayjs from "dayjs";
import { boardDetailBox, boardDetailContainer, contentWrapper } from "./style";
/** @jsxImportSource @emotion/react */

function BoardDetail() {
    const dummyObj = {
        boardId: 1,
        boardTitle: "제제목제목목",
        boardContent: (
            <>
                <h1>글 내용 1</h1>
                <p>aaaaaaa</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </>
        ),
        nickname: "비누",
        boardCreatedDate: "2023-11-23 03:33:22",
    };
    return (
        <div css={boardDetailBox}>
            <div css={boardDetailContainer}>
                <div className="detail-header-left">
                    <div className="border-left-box">
                        <span className="board-id">{dummyObj.boardId}</span>
                    </div>
                    <div className="border-left-box">
                        <span className="nickname">{dummyObj.nickname}</span>
                    </div>
                </div>
                <span className="title border-left-box">{dummyObj.boardTitle}</span>
                <span className="date">{dayjs(dummyObj.boardCreatedDate).format("YYYY년 MM월 DD일")}</span>
            </div>
            <div />
            <div css={contentWrapper}>
                <pre>{dummyObj.boardContent}</pre>
            </div>
        </div>
    );
}

export default BoardDetail;
