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

function BoardList() {
    const navigate = useNavigate();
    const { category, page } = useParams(); //http://localhost:3000/board/공지사항/1

    const options = [
        { value: "전체", label: "전체" },
        { value: "제목", label: "제목" },
        { value: "작성자", label: "작성자" },
    ];

    const search = {
        optionName: options[0].label, // == 카테고리명
        searchValue: "", // == 검색값
    };

    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(options[0]);

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
                    {/* {categoryList.map(category => {<div css={S.category}>`${category}`</div>})} */}
                    <div css={S.category}>공지</div>
                    <div css={S.category}>회의록</div>
                    <div css={S.category}>식단</div>
                </div>
                <table css={S.table}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td></td>
                            </tr>
                        }
                        <tr>
                            <td>4</td>
                            <td>건의 있어요</td>
                            <td>아들2</td>
                            <td>11/16</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>11/15 가족회의록</td>
                            <td>엄마</td>
                            <td>11/15</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>12월 가족 여행 계획</td>
                            <td>아빠</td>
                            <td>11/13</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>11/13 가족회의록</td>
                            <td>엄마</td>
                            <td>11/13</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
                <div css={S.pageNumbers}>{/* {pagination()} */}</div>
            </div>
        </>
    );
}

export default BoardList;
