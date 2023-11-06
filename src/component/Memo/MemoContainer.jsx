/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-useless-return */
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { memoBoard, memoContent, memoWrapper } from "./style";
import { rcMemoPage } from "../../store/atoms/memoAtoms";
import { instance } from "../../config";
/** @jsxImportSource @emotion/react */

function MemoContainer() {
    const [memoList, setMemoList] = useState([]);
    const [pageNum, setPageNum] = useRecoilState(rcMemoPage);
    const [ref, inView] = useInView();
    // eslint-disable-next-line no-unused-vars
    const memo = useQuery(
        ["getMemo", pageNum, inView],
        async () => {
            const response = await instance.get(`/api/memo/${pageNum}`);
            if (response.data.length === 0) return;
            setMemoList([...memoList, ...response.data.memoList]);
            if (inView && response.data.totalCount - pageNum * 9 > 0) {
                setPageNum(pageNum + 1);
            }
            return response.data;
        },
        {
            retryOnMount: false,
            refetchOnWindowFocus: false,
        },
    );

    return (
        <div css={memoWrapper}>
            <div css={memoBoard}>
                <div className="memo-scroll-board">
                    {memoList.map((e, i) => {
                        return (
                            <div key={e.memoContent + Math.random()} css={memoContent(i)}>
                                <p className="author-label">{e.author}</p>
                                <div className="content-area">
                                    <pre>{e.memoContent}</pre>
                                </div>
                                <p className="date-label">{e.createdDate}</p>
                            </div>
                        );
                    })}
                    <div style={{ height: "1px" }} ref={ref} />
                </div>
            </div>
        </div>
    );
}

export default MemoContainer;
