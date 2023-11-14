/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { memoBoard, memoContent, memoWrapper } from "./style";
import { rcMemoPage } from "../../store/atoms/memoAtoms";
import EditModal from "./EditModal";
/** @jsxImportSource @emotion/react */

function MemoContainer({ memoList, totalCount }) {
    const [pageNum, setPageNum] = useRecoilState(rcMemoPage);
    const [ref, inView] = useInView();
    const [open, setOpen] = useState(false);
    const [memoDesc, setMemoDesc] = useState({});

    const onModalOpen = index => {
        const memoElement = memoList.filter(memo => memo.memoId === index)[0];
        setMemoDesc(memoElement);
        setOpen(true);
    };

    useEffect(() => {
        if (inView && totalCount - pageNum * 9 > 0) {
            setPageNum(page => page + 1);
        }
    }, [pageNum, inView]);

    return (
        <>
            <EditModal memoDesc={memoDesc} open={open} setOpen={setOpen} />
            <div css={memoWrapper}>
                <div css={memoBoard}>
                    <div className="memo-scroll-board">
                        {memoList.map((e, i) => {
                            return (
                                <div onClick={() => onModalOpen(e.memoId)} key={e.memoId} css={memoContent(i)}>
                                    <p className="author-label">{e.author}</p>
                                    <div className="content-area">
                                        <pre>{e.memoContent}</pre>
                                    </div>
                                    <p className="date-label">{e.createdDate}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div ref={ref} />
                </div>
            </div>
        </>
    );
}

export default MemoContainer;
