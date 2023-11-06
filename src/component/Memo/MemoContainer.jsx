import React from "react";
import { memoBoard, memoContent, memoWrapper } from "./style";
import { memoDummy } from "./memoDummyData";
/** @jsxImportSource @emotion/react */

function MemoContainer() {
    return (
        <div css={memoWrapper}>
            <div css={memoBoard}>
                {memoDummy.map((e, i) => {
                    return (
                        <div css={memoContent(i)}>
                            <p className="author-label">{e.author}</p>
                            <div className="content-area">
                                <pre>{e.content}</pre>
                            </div>
                            <p className="date-label">{e.date}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MemoContainer;
