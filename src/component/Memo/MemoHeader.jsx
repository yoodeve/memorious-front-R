import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { GrRefresh } from "react-icons/gr";
import { memoHeaderContainer } from "./style";
import MemoModal from "./MemoModal";
import { instance } from "../../config";
import { rcMemoList } from "../../store/atoms/memoAtoms";
/** @jsxImportSource @emotion/react */

function MemoHeader() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [searchkey, setSearchkey] = useState("");
    const setMemoList = useSetRecoilState(rcMemoList);

    const onMemoAddClick = async () => {
        setOpen(true);
    };

    const onChange = e => {
        setSearchkey(e.target.value);
    };

    const onKeyDown = async e => {
        if (e.keyCode === 13) {
            try {
                const response = await instance.get("/api/memo/search", { params: { searchkey } });
                setMemoList(response.data);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    };
    const onSearchKeyword = async () => {
        try {
            const response = await instance.get("/api/memo/search", { params: { searchkey } });
            setMemoList(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const refreshMemoList = useMutation(() => {}, {
        onSuccess: () => {
            queryClient.refetchQueries(["getMemo"]);
        },
    });

    const onRefreshClick = () => {
        refreshMemoList.mutate();
    };

    return (
        <>
            <MemoModal setOpen={setOpen} open={open} />
            <div className="all-container" css={memoHeaderContainer}>
                <div onClick={onMemoAddClick} className="memo-add-area">
                    <div className="memo-add-icon-wrapper">
                        <AiOutlinePlus className="memo-add-icon" />
                    </div>
                    <span>메모추가</span>
                </div>
                <div className="memo-add-area input-area">
                    <input value={searchkey} onChange={onChange} onKeyDown={onKeyDown} type="text" />
                </div>
                <button className="search-button" onClick={onSearchKeyword}>
                    검색
                </button>
                <div onClick={onRefreshClick} className="memo-add-area">
                    <GrRefresh />
                </div>
            </div>
        </>
    );
}

export default MemoHeader;
