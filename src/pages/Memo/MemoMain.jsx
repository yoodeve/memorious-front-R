/* eslint-disable no-unused-vars */
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import MemoHeader from "../../component/Memo/MemoHeader";
import MemoContainer from "../../component/Memo/MemoContainer";
import { rcMemoList, rcMemoPage } from "../../store/atoms/memoAtoms";
import { instance } from "../../config";

const memoMainContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function MemoMain() {
    const pageNum = useRecoilValue(rcMemoPage);
    const [memoList, setMemoList] = useRecoilState(rcMemoList);
    const [totalCount, setTotalCount] = useState(0);

    const fetchMemo = async () => {
        const response = await instance.get(`/api/memo/${pageNum}`);
        setMemoList(prevMemoList => {
            return pageNum > 0 ? [...prevMemoList, ...response.data.memoList] : [...response.data.memoList];
        });
        setTotalCount(response.data.totalCount);
    };

    const getMemo = useQuery(["getMemo", pageNum], fetchMemo, {
        retryOnMount: true,
        refetchOnWindowFocus: false,
    });

    return (
        <div css={memoMainContainer}>
            <MemoHeader />
            <MemoContainer totalCount={totalCount} memoList={memoList} />
        </div>
    );
}

export default MemoMain;
