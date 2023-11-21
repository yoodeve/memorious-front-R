import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import { memoBoard, memoContent, memoWrapper } from "./style";
import { rcMemoPage } from "../../store/atoms/memoAtoms";
import EditModal from "./EditModal";
/** @jsxImportSource @emotion/react */

function MemoContainer({ memoList }) {
    const page = useRef(0);
    const setPageNum = useSetRecoilState(rcMemoPage);
    const [ref, inView] = useInView();
    const [open, setOpen] = useState(false);
    const [memoDesc, setMemoDesc] = useState({});

    const onModalOpen = index => {
        const memoElement = memoList.filter(memo => memo.memoId === index)[0];
        setMemoDesc(memoElement);
        setOpen(true);
    };

    useEffect(() => {
        if (inView) {
            page.current += 1;
            setPageNum(page.current);
        }
    }, [inView]);

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
