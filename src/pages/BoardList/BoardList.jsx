/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Reset } from "styled-reset";
import { useNavigate, useParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { HiSearch } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { Select } from "antd";
import * as S from "./style";
import { instance } from "../../config";
import { useQuery } from "react-query";

function BoardList() {
    const navigate = useNavigate();
    const { category, page } = useParams();

    //검색 필터링
    const options = [
        { value: "전체", label: "전체" },
        { value: "제목", label: "제목" },
        { value: "작성자", label: "작성자" },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const search = {
        optionName: options[0].label, // == 카테고리명
        searchValue: "", // == 검색값
    };

    const [searchParams, setSearchParams] = useState(search);

    const [categoryList, setCategoryList] = useState([]);

    const getBoardList = useQuery(
        ["getBoardList", category, page],
        async () => {
            const option = {
                params: searchParams,
            };
            console.log(option);

            // return await instance.get(`/boards/${category}/${page}`, option);
        },
        {
            refetchOnWindowFocus: false,
        },
    );

    //검색창 내용
    const handleSearchInputChange = e => {
        setSearchParams({
            ...searchParams,
            searchValue: e.target.value,
        });
    };
    //선택 옵션(제목/작성자)
    const handleSearchOptionSelect = option => {
        setSearchParams({
            ...searchParams,
            optionName: option.label,
        });
    };

    const handleCategoryClick = () => {};

    useEffect(() => {
        instance.get("/api/board/categories").then(response => {
            setCategoryList(
                response.data.map(category => {
                    return { id: category.boardCategoryId, value: category.boardCategoryName };
                }),
            );
        });
    }, []);

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
                        <Select style={{ width: 150, height: 40 }} options={options} value={`${selectedOption.value}`} defaultValue={`${selectedOption.value}`} />
                        <input css={S.searchInput} type="text" />
                        <div className="icon-box">
                            <HiSearch size={20} />
                        </div>
                    </div>
                </div>
                <div css={S.categoryBox}>
                    <div key={0} css={S.category} onClick={handleCategoryClick}>
                        전체
                    </div>
                    {/* 카테고리 목록 가져오기 */}
                    {categoryList.map(category => {
                        return <div key={category.id} css={S.category}>{`${category.value}`}</div>;
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
                        {!getBoardList.isLoading &&
                            getBoardList?.data?.data?.map(board => {
                                return (
                                    <tr
                                        key={board.boardId}
                                        onClick={() => {
                                            navigate(`/board/${board.boardId}`);
                                        }}
                                    >
                                        <td>{board.boardId}</td>
                                        <td>{board.boardTitle}</td>
                                        <td>{board.nickname}</td>
                                        <td>{board.createDate}</td>
                                    </tr>
                                );
                            })}
                        {/* <tr>
                            <td>4</td>
                            <td>건의 있어요</td>
                            <td>아들2</td>
                            <td>11/16</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>11/15 가족회의록</td>
                            <td>엄마</td>
                            <td>11/15</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>12월 가족 여행 계획</td>
                            <td>아빠</td>
                            <td>11/13</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>11/13 가족회의록</td>
                            <td>엄마</td>
                            <td>11/13</td>
                        </tr> */}
                    </tbody>
                </table>
                <div css={S.pageNumbers}>{/* {pagination()} */}</div>
            </div>
        </>
    );
}

export default BoardList;
