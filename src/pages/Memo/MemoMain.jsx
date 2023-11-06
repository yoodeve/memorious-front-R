/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";
import MemoHeader from "../../component/Memo/MemoHeader";
import MemoContainer from "../../component/Memo/MemoContainer";
import { instance } from "../../config";
import { rcMemoPage } from "../../store/atoms/memoAtoms";

const memoMainContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function MemoMain() {
    const [memoList, setMemoList] = useState([]);
    const [pageNum, setPageNum] = useRecoilState(rcMemoPage);
    const [ref, inView] = useInView();
    const memo = useQuery(
        ["getMemo", pageNum, inView],
        async () => {
            const response = await instance.get(`/api/memo/${pageNum}`);
            setMemoList(response.data);

            if (inView) {
                setPageNum(pageNum + 1);
                setMemoList([...memoList, memo?.data]);
            }
        },
        {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
        },
    );

    return (
        <div css={memoMainContainer}>
            <MemoHeader memoList={memoList} ref={ref} />
            <MemoContainer />
        </div>
    );
}

export default MemoMain;
