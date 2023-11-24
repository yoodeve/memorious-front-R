/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Reset } from "styled-reset";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
/** @jsxImportSource @emotion/react */
import { HiSearch } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { Select } from "antd";
import * as S from "./style";
import { instance } from "../../config";

function BoardList() {
    const navigate = useNavigate();
    const { category, page } = useParams();

    /* option: antd Select 이용 */
    // 검색 필터링
    const options = [
        { value: "전체", label: "전체" },
        { value: "제목", label: "제목" },
        { value: "작성자", label: "작성자" },
    ];

    const [categoryList, setCategoryList] = useState([]);

    // 카테고리 리스트 뽑아오기
    useEffect(() => {
        instance.get("/api/board/categories").then(response => {
            setCategoryList(
                response.data.map(categoryData => {
                    return { id: categoryData.boardCategoryId, value: categoryData.boardCategoryName };
                }),
            );
        });
    }, []);

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const search = {
        optionName: options[0].label,
        searchValue: "",
    };

    const [searchParams, setSearchParams] = useState(search);

    const queryClient = useQueryClient();

    const principalState = queryClient.getQueryState("getPrincipal");

    if (!principalState?.data?.data) {
        alert("로그인 후 이용 바랍니다.");
        window.location.replace("/auth/oauth2/signin");
    }

    const getBoardList = useQuery(
        ["getBoardList", category, page],
        async () => {
            try {
                const option = {
                    params: searchParams,
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                return await instance.get(`api/boards/${category}/${page}`, option);
            } catch (error) {
                throw new Error(error);
            }
        },
        {
            refetchOnWindowFocus: false,
        },
    );

    const getBoardCount = useQuery(
        ["getBoardCount", category, page],
        async () => {
            try {
                const option = {
                    params: searchParams,
                    // headers: {
                    //     Authorization: localStorage.getItem("accessToken"),
                    // },
                };
                return instance.get(`api/boards/${category}/count`, option);
            } catch (error) {
                throw new Error(error);
            }
        },
        {
            refetchOnWindowFocus: false,
        },
    );

    // 검색창 내용 바뀔 때
    const handleSearchInputChange = e => {
        setSearchParams({
            ...searchParams,
            searchValue: e.target.value,
        });
    };

    // 선택 옵션(제목/작성자) 바뀔 때
    const handleSearchOptionSelect = value => {
        setSelectedOption(value);
        setSearchParams({
            ...searchParams,
            optionName: value,
        });
    };

    // 검색 버튼 클릭
    const handleSearchButtonClick = () => {
        navigate(`/board/${category}/1`);
        // navigate(라우팅)만 한다 해서 state들은 날라가지 않고 유지됨-> 재렌더링이 필요함 = refetch
        // 주소창에서 엔터 치는 것(상태가 모두 초기화됨)과 렌더링은 다르다
        getBoardList.refetch();
    };

    const handleOnKeyPress = e => {
        if (e.key === "Enter") {
            handleSearchButtonClick();
        }
    };

    console.log("getBoardList >> ", getBoardList);
    console.log("getBoardList?.data?.data >> ", getBoardList?.data?.data);

    // if (getBoardList.isLoading || getBoardCount.isLoading) {
    //     return <>Loading...</>; // 로딩 스피너 추가
    // }
    console.log(getBoardCount);
    return (
        <>
            <Reset />
            <div css={S.layout}>
                <div css={S.writeAndSearchBox}>
                    <div
                        css={S.writeBoardBox}
                        onClick={() => {
                            navigate("/board/write");
                        }}
                    >
                        <AiOutlinePlus size={20} />
                        <span>글쓰기</span>
                    </div>
                    <div css={S.searchContainer}>
                        <Select style={{ width: 150, height: 40 }} options={options} value={selectedOption} onChange={handleSearchOptionSelect} />
                        <input css={S.searchInput} type="text" onChange={handleSearchInputChange} onKeyDown={handleOnKeyPress} />
                        <div className="icon-box" onClick={handleSearchButtonClick}>
                            <HiSearch size={20} />
                        </div>
                    </div>
                </div>
                <div css={S.categoryBox}>
                    <Link key={0} to="/board/all/1" css={S.category}>
                        <div>전체</div>
                    </Link>

                    {/* 카테고리 목록 가져오기 */}
                    {categoryList.map(categoryData => {
                        return (
                            <Link key={categoryData.id} to={`/board/${categoryData.value}/1`} css={S.category}>
                                <div>{`${categoryData.value}`}</div>
                            </Link>
                        );
                    })}
                </div>
                <table css={S.table}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            {/* <th>조회수</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {!getBoardList?.isLoading &&
                            getBoardList?.data?.data?.map(board => {
                                return (
                                    <tr key={board.boardId} onClick={() => navigate(`/board/${board.boardId}`)}>
                                        <td>{board.boardId}</td>
                                        <td css={S.boardTitle}>{board.title}</td>
                                        <td>{board.nickname}</td>
                                        <td>{board.createDate}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {/* <div css={S.pageNumbers}></div> */}
            </div>
        </>
    );
}

export default BoardList;
